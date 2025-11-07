import { AnalyticsEvent } from '@/types/global';

const ensureDataLayer = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
};

export const trackGAEvent = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', event.action, payload);
    return;
  }

  ensureDataLayer();
  window.dataLayer.push({
    event: event.action,
    ...payload,
  });
};
