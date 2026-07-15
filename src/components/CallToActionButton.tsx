"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplosionEffect from './ExplosionEffect';
import PixelExplosion from './PixelExplosion';
import { Icon, AnalyticsEvent } from '../types/global';
import { trackGAEvent, trackGoogleAdsConversion } from '@/utils/analytics';

interface CallToActionButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: Icon;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
  type?: 'button' | 'submit' | 'reset';
  interactionEffect?: 'burst' | 'pixels';
  gaEvent?: AnalyticsEvent;
  ymEvent?: AnalyticsEvent;
}

const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  children,
  onClick,
  href,
  target,
  rel,
  icon: IconComponent,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  iconClassName,
  type = 'button',
  interactionEffect,
  gaEvent,
  ymEvent,
}) => {
  const [activeEffect, setActiveEffect] = useState<'burst' | 'pixels' | null>(null);
  const [effectCoords, setEffectCoords] = useState({ x: 0, y: 0 });

  const handleInteraction = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (interactionEffect && !disabled) {
      setActiveEffect(interactionEffect);
      setEffectCoords({ x: e.clientX, y: e.clientY });
    }

    if (gaEvent) {
      const label = gaEvent.label || (typeof children === 'string' ? children : undefined);
      trackGAEvent({ ...gaEvent, label });
      trackGoogleAdsConversion({ label: gaEvent.action });
    }

    if (ymEvent && typeof window !== 'undefined' && window.ym) {
      window.ym(103962073, 'reachGoal', ymEvent.action, {
        category: ymEvent.category,
        label: ymEvent.label || (typeof children === 'string' ? children : undefined),
        value: ymEvent.value,
      });
    }

    onClick?.(e);
  };

  const handleEffectComplete = () => setActiveEffect(null);

  const baseClasses =
    'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg text-center font-semibold leading-tight transition-all duration-200 relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--cta)]';

  const sizeClasses: Record<NonNullable<CallToActionButtonProps['size']>, string> = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const variantClasses: Record<NonNullable<CallToActionButtonProps['variant']>, string> = {
    primary:
      'bg-[linear-gradient(135deg,var(--cta),var(--cta-strong))] text-white shadow-[0_6px_20px_rgba(3,105,161,0.24)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(3,105,161,0.34)] active:scale-[0.98]',
    secondary:
      'bg-[var(--surface-card)] text-[var(--accent-strong)] border border-[var(--border-premium)] shadow-sm hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] hover:shadow-[0_6px_18px_rgba(21,128,61,0.14)]',
    outline:
      'border border-[var(--border-premium)] text-[var(--accent-strong)] bg-transparent hover:bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] hover:text-white hover:border-transparent',
    ghost:
      'border border-[var(--border-soft)] text-[var(--text-primary)] bg-transparent hover:border-[var(--border-premium)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]',
    subtle:
      'bg-[var(--muted-surface)] text-[var(--text-primary)] border border-[var(--border-soft)] hover:bg-[var(--surface-card)] hover:shadow-sm',
  };

  const iconSizeClasses: Record<NonNullable<CallToActionButtonProps['size']>, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className ?? ''} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`;

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.01 },
    whileTap:   disabled ? {} : { scale: 0.97 },
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  };

  const content = (
    <>
      {disabled ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
      ) : (
        <>
          {IconComponent && (
            <IconComponent
              className={`${iconSizeClasses[size]} shrink-0 ${iconClassName ?? ''} relative z-10`}
              aria-hidden
            />
          )}
          <span className="relative z-10">{children}</span>
        </>
      )}
      <AnimatePresence>
        {activeEffect === 'burst'  && <ExplosionEffect  x={effectCoords.x} y={effectCoords.y} onComplete={handleEffectComplete} />}
        {activeEffect === 'pixels' && <PixelExplosion   x={effectCoords.x} y={effectCoords.y} onComplete={handleEffectComplete} />}
      </AnimatePresence>
    </>
  );

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} className={combinedClasses} onClick={handleInteraction} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={handleInteraction} className={combinedClasses} disabled={disabled} type={type} {...motionProps}>
      {content}
    </motion.button>
  );
};

export default CallToActionButton;
