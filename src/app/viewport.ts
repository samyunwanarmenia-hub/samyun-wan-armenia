import { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#86b486' },
    { media: '(prefers-color-scheme: dark)', color: '#86b486' },
  ],
  width: 'device-width',
  initialScale: 1,
  // You can add other viewport-related meta tags here
  // For example, for Apple Web App:
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: 'default',
  //   title: 'Samyun Wan Armenia', // This would come from translations
  // },
};
