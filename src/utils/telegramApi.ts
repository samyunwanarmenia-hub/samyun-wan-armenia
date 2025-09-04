import { NotifyVisitBody, NotifyVisitQueryParams, TelegramPhotoData } from '@/types/global';

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

export const notifyVisit = async (bodyData: NotifyVisitBody, queryParams: NotifyVisitQueryParams, isQrScan: boolean = false) => {
  const url = new URL("/api/notifyVisit", window.location.origin);
  if (queryParams.utm_source) url.searchParams.set('utm_source', queryParams.utm_source);
  if (queryParams.utm_medium) url.searchParams.set('utm_medium', queryParams.utm_medium);
  if (queryParams.utm_campaign) url.searchParams.set('utm_campaign', queryParams.utm_campaign);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...bodyData, isQrScan }) // Теперь isQrScan передается в теле
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