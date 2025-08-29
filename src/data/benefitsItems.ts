import { FaCrosshairs, FaChartLine, FaShieldAlt, FaBolt, FaClock, FaHeart } from 'react-icons/fa'; // Changed to Font Awesome icons
import { BenefitItem } from '../types/global';

export const benefitsItemsData: BenefitItem[] = [
  { key: 'appetite', icon: FaCrosshairs, gradient: 'from-warm-accent to-red-500' }, // Updated gradient
  { key: 'weight', icon: FaChartLine, gradient: 'from-blue-500 to-cyan-500' },
  { key: 'immunity', icon: FaShieldAlt, gradient: 'from-primary-green to-secondary-green' }, // Updated gradient
  { key: 'energy', icon: FaBolt, gradient: 'from-yellow-500 to-warm-accent' }, // Updated gradient
  { key: 'metabolism', icon: FaClock, gradient: 'from-purple-500 to-indigo-500' },
  { key: 'mood', icon: FaHeart, gradient: 'from-pink-500 to-rose-500' }
];