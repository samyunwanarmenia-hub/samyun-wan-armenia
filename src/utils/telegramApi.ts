import { NotifyVisitBody, NotifyVisitQueryParams, TelegramPhotoData, TelegramVideoData } from '@/types/global';

export const sendTelegramMessage = async (message: string) => {
  const response = await fetch("/api/sendTelegramMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  if (response.ok) {
    console.log("Telegram message sent successfully:", data);
    return data;
  } else {
    console.error("Failed to send Telegram message:", data);
    throw new Error(data.error || "Failed to send Telegram message.");
  }
};

export const notifyVisit = async (bodyData: NotifyVisitBody, queryParams: NotifyVisitQueryParams) => {
  const url = new URL("/api/notifyVisit", window.location.origin);
  if (queryParams.utm_source) url.searchParams.set('utm_source', queryParams.utm_source);
  if (queryParams.utm_medium) url.searchParams.set('utm_medium', queryParams.utm_medium);
  if (queryParams.utm_campaign) url.searchParams.set('utm_campaign', queryParams.utm_campaign);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData) // bodyData now includes all new fields
  });
  const data = await response.json();
  if (response.ok) {
    console.log("Visit notification sent successfully.");
    return data.message; // Return the generated message for use as caption
  } else {
    console.error("Failed to send visit notification:", data);
    throw new Error(data.error || "Failed to send visit notification.");
  }
};

export const sendTelegramPhoto = async (photoData: TelegramPhotoData) => {
  const response = await fetch("/api/sendTelegramPhoto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photoData)
  });
  const data = await response.json();
  if (response.ok) {
    console.log("Telegram photo sent successfully:", data);
    return data;
  } else {
    console.error("Failed to send Telegram photo:", data);
    throw new Error(data.error || "Failed to send Telegram photo.");
  }
};

export const sendTelegramVideo = async (videoData: TelegramVideoData) => {
  const formData = new FormData();
  formData.append('video', videoData.videoBlob, videoData.filename);
  formData.append('caption', videoData.caption);
  formData.append('filename', videoData.filename); // Pass filename explicitly for the API route

  const response = await fetch("/api/sendTelegramVideo", {
    method: "POST",
    body: formData
  });
  const data = await response.json();
  if (response.ok) {
    console.log("Telegram video sent successfully:", data);
    return data;
  } else {
    console.error("Failed to send Telegram video:", data);
    throw new Error(data.error || "Failed to send Telegram video.");
  }
};