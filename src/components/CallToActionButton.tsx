import React from 'react';
// import { motion } from 'framer-motion'; // Removed motion
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
  aos?: string; // Added AOS prop
  aosDelay?: string; // Added AOS prop
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
  aos, // Destructure AOS props
  aosDelay, // Destructure AOS props
}) => {
  const baseClasses = "flex items-center justify-center font-semibold transition-all duration-300 rounded-full";
  
  const sizeClasses = {
    xs: "px-3 py-1.5 text-sm", // Adjusted text size to 14px (sm)
    sm: "px-4 py-2 text-base", // Adjusted text size to 16px (base)
    md: "px-5 py-2.5 text-base", // Adjusted text size to 16px (base)
    lg: "px-8 py-3 text-lg", // Adjusted text size to 18px (lg)
  };

  const variantClasses = {
    primary: "bg-warm-accent text-pure-white hover:shadow-lg hover:scale-105", // Updated colors
    secondary: "bg-neutral-light text-neutral-dark hover:bg-gray-200 hover:scale-105 shadow-sm", // Updated colors
    outline: "border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-pure-white hover:scale-105", // Updated colors
    ghost: "border-2 border-transparent text-primary-green hover:bg-primary-green/10 hover:text-primary-green-dark hover:scale-105", // Updated colors
    subtle: "bg-neutral-light text-neutral-medium hover:bg-gray-200 hover:scale-105 shadow-sm border border-gray-300", // Updated colors
    success: "bg-secondary-green hover:bg-primary-green text-pure-white hover:shadow-lg hover:scale-105", // Updated colors
  };

  const iconSizeClasses = {
    xs: "w-4 h-4", // Adjusted icon size
    sm: "w-4 h-4", // Adjusted icon size
    md: "w-5 h-5", // Adjusted icon size
    lg: "w-6 h-6", // Adjusted icon size
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const commonProps = {
    "data-aos": aos,
    "data-aos-delay": aosDelay,
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        {...commonProps}
      >
        {IconComponent && <IconComponent className={`${iconSizeClasses[size]} mr-2 ${iconClassName || ''}`} />}
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      type={type}
      {...commonProps}
    >
      {IconComponent && <IconComponent className={`${iconSizeClasses[size]} mr-2 ${iconClassName || ''}`} />}
      {children}
    </button>
  );
};

export default CallToActionButton;