"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplosionEffect from './ExplosionEffect';
import PixelExplosion from './PixelExplosion';
import { Icon, AnalyticsEvent } from '../types/global';

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
    
    if (gaEvent && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', gaEvent.action, {
        event_category: gaEvent.category,
        event_label: gaEvent.label || (typeof children === 'string' ? children : undefined),
        value: gaEvent.value,
      });
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

  const handleEffectComplete = () => {
    setActiveEffect(null);
  };

  const baseClasses = "flex items-center justify-center font-semibold transition-all duration-300 rounded-full relative overflow-hidden";
  
  const sizeClasses: Record<NonNullable<CallToActionButtonProps['size']>, string> = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3 text-lg",
  };

  const variantClasses: Record<NonNullable<CallToActionButtonProps['variant']>, string> = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-glow-green", // Ensure this uses glow-green
    secondary: "bg-gray-200 dark:bg-gray-700 text-brandRed-600 dark:text-brandRed-400 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-xl",
    outline: "border-2 border-brandRed-600 text-brandRed-600 hover:bg-brandRed-600 hover:text-white dark:border-brandRed-400 dark:text-brandRed-400 dark:hover:bg-brandRed-600 dark:hover:text-white",
    ghost: "border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200",
    subtle: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm border border-gray-300 dark:border-gray-600",
  };

  const iconSizeClasses: Record<NonNullable<CallToActionButtonProps['size']>, string> = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const motionProps = {
    whileHover: { scale: 1.08 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const content = (
    <>
      {IconComponent && <IconComponent className={`${iconSizeClasses[size]} mr-2 ${iconClassName || ''} relative z-10`} />}
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {activeEffect === 'burst' && <ExplosionEffect x={effectCoords.x} y={effectCoords.y} onComplete={handleEffectComplete} />}
        {activeEffect === 'pixels' && <PixelExplosion x={effectCoords.x} y={effectCoords.y} onComplete={handleEffectComplete} />}
      </AnimatePresence>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        onClick={handleInteraction}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={handleInteraction}
      className={combinedClasses}
      disabled={disabled}
      type={type}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};

export default CallToActionButton;