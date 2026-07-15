import { Target, TrendingUp, Shield, Zap, Clock, Heart } from 'lucide-react';
import { BenefitItem } from '../types/global';

export const benefitsItemsData: BenefitItem[] = [
  { key: 'appetite', icon: Target, gradient: 'linear-gradient(135deg, var(--accent), var(--accent-strong))' },
  { key: 'weight', icon: TrendingUp, gradient: 'linear-gradient(135deg, var(--accent), var(--gold))' },
  { key: 'immunity', icon: Shield, gradient: 'linear-gradient(135deg, var(--cta), var(--cta-strong))' },
  { key: 'energy', icon: Zap, gradient: 'linear-gradient(135deg, var(--gold), var(--gold-strong))' },
  { key: 'metabolism', icon: Clock, gradient: 'linear-gradient(135deg, var(--sage), var(--accent))' },
  { key: 'mood', icon: Heart, gradient: 'linear-gradient(135deg, var(--deep-evergreen), var(--sage))' },
];
