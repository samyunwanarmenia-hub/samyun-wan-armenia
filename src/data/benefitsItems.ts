import { Target, TrendingUp, Shield, Zap, Clock, Heart } from 'lucide-react';
import { BenefitItem } from '../types/global';

export const benefitsItemsData: BenefitItem[] = [
  { key: 'appetite', icon: Target, gradient: 'from-red-500 to-pink-500' },
  { key: 'weight', icon: TrendingUp, gradient: 'from-blue-500 to-cyan-500' },
  { key: 'immunity', icon: Shield, gradient: 'from-green-500 to-emerald-500' },
  { key: 'energy', icon: Zap, gradient: 'from-yellow-500 to-orange-500' },
  { key: 'metabolism', icon: Clock, gradient: 'from-purple-500 to-indigo-500' },
  { key: 'mood', icon: Heart, gradient: 'from-pink-500 to-rose-500' }
];