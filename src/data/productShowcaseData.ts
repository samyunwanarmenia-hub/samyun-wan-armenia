import { ProductShowcaseItem } from '../types/global';

export const productShowcaseData: ProductShowcaseItem[] = [
  {
    src: '/images/samyun-wan-weight-gain-qr.jpg', // This was updated in the previous step
    alt: 'Samyun Wan Weight Gain Capsules with QR Code for Authenticity',
    labelKey: 'weightGainLabel',
    descKey: 'weightGainDesc',
    buttonTextKey: 'orderWeightGain',
    price: 14000,
  },
  {
    src: '/images/samyun-wan-slim-weight-loss-vitamin-original-whay-arm.png', // Updated to the new image
    alt: 'Samyun Wan Slim Weight Loss Vitamin Original', // Updated alt text
    labelKey: 'weightLossLabel',
    descKey: 'weightLossDesc',
    buttonTextKey: 'orderWeightLoss',
    price: 23000,
  },
];