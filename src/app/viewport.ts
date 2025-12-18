import { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#86b486' },
    { media: '(prefers-color-scheme: dark)', color: '#86b486' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  interactiveWidget: 'resizes-visual',
  viewportFit: 'cover',
};
