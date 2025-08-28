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
  type?: 'button' | 'submit' | 'reset'; // Added 'type' property
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
  type = 'button', // Default to 'button' if not specified
}) => {
  const baseClasses = "flex items-center justify-center font-semibold transition-all duration-300 rounded-full";
  
  const sizeClasses = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-2xl hover:scale-105",
    secondary: "bg-gray-200 text-red-600 hover:bg-gray-300 hover:scale-105 shadow-xl",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:scale-105",
    ghost: "border-2 border-green-600 text-green-600 hover:bg-green-100 hover:text-green-700 hover:scale-105",
    subtle: "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 shadow-sm border border-gray-300",
    success: "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:scale-105",
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
      type={type} // Added type to the button element
      {...motionProps}
    >
      {IconComponent && <IconComponent className={`${iconSizeClasses[size]} mr-2 ${iconClassName || ''}`} />}
      {children}
    </motion.button>
  );
};

export default CallToActionButton;