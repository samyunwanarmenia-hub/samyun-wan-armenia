import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../types/global'; // Corrected import path for Icon type

interface CallToActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: Icon;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
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
}) => {
  const baseClasses = "flex items-center justify-center font-semibold transition-all duration-300 rounded-full";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-2xl hover:scale-105",
    secondary: "bg-gray-700 text-red-400 hover:bg-gray-600 hover:scale-105 shadow-xl", // Changed to use dark gray background and red text
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:scale-105",
    ghost: "border-2 border-lightGreen-500 text-lightGreen-500 hover:bg-lightGreen-900/20 hover:text-lightGreen-400 hover:scale-105", // Changed to use lightGreen-500 border/text and subtle dark green hover
  };

  const iconSizeClasses = {
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
      {...motionProps}
    >
      {IconComponent && <IconComponent className={`${iconSizeClasses[size]} mr-2 ${iconClassName || ''}`} />}
      {children}
    </motion.button>
  );
};

export default CallToActionButton;