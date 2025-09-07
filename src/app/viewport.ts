import { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#86b486', // Using primary-500 for theme color
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // You can add other viewport-related meta tags here
  // For example, for Apple Web App:
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: 'default',
  //   title: 'Samyun Wan Armenia', // This would come from translations
  // },
};