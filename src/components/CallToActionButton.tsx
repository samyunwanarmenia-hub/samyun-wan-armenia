import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../types/global';

interface CallToActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: Icon;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
  type?: 'button' | 'submit' | 'reset';
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
}) => {
  const baseClasses = "flex items-center justify-center font-semibold transition-all duration-300 rounded-full";
  
  const sizeClasses = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-glow-red",
    secondary: "bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-400 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-xl",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white",
    ghost: "border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 hover:text-green-700 dark:hover:text-green-200",
    subtle: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm border border-gray-300 dark:border-gray-600",
    success: "bg-green-600 hover:bg-green-700 text-white hover:shadow-glow-green",
  };

  const iconSizeClasses = {
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

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        {...motionProps}
      >
        {IconComponent && <IconComponent className={`${iconSizeClasses[size]} mr-2 ${iconClassName || ''}`} />}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      type={type}
      {...motionProps}
    >
      {IconComponent && <IconComponent className={`${iconSizeClasses[size]} mr-2 ${iconClassName || ''}`} />}
      {children}
    </motion.button>
  );
};

export default CallToActionButton;