import { ProductShowcaseItem } from '../types/global';

export const productShowcaseData: ProductShowcaseItem[] = [
  {
    src: '/images/samyun-wan-weight-gain-qr.jpg', // Updated to new image with QR code
    alt: 'Samyun Wan Weight Gain Capsules with QR Code for Authenticity', // Updated alt text
    labelKey: 'weightGainLabel',
    descKey: 'weightGainDesc', // Corrected from 'weightLossDesc'
    buttonTextKey: 'orderWeightGain', // Added button text key
    price: 14000, // Price for weight gain product
  },
  {
    src: '/images/samyun-wan-slim-weight-loss-vitamin-original-whay-arm.png',
    alt: 'Samyun Wan Slim Weight Loss Capsules',
    labelKey: 'weightLossLabel',
    descKey: 'weightLossDesc', // Corrected from 'weightGainDesc'
    buttonTextKey: 'orderWeightLoss', // Added button text key
    price: 23000, // Price for weight loss product
  },
];