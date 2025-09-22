"use client";

import { motion } from 'framer-motion';
import React from 'react';

// Define the props interface with any to avoid complex typing issues
interface InteractiveDivProps {
  children?: React.ReactNode;
  className?: string;
  whileHoverScale?: number;
  whileTapScale?: number;
  hoverShadow?: string;
  hoverY?: number;
  as?: React.ElementType;
  [key: string]: any; // Allow any additional props
}

// Create the component
const InteractiveDiv = React.forwardRef<HTMLElement, InteractiveDivProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      whileHoverScale = 1.05,
      whileTapScale = 0.98,
      hoverShadow = "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)",
      hoverY = -5,
      ...rest
    },
    ref
  ) => {
    const MotionComponent = motion(Component as any);

    return (
      <MotionComponent
        ref={ref}
        className={className}
        whileHover={{
          scale: whileHoverScale,
          y: hoverY,
          boxShadow: hoverShadow,
        }}
        whileTap={{ scale: whileTapScale }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...(rest as any)}
      >
        {children}
      </MotionComponent>
    );
  }
);

InteractiveDiv.displayName = 'InteractiveDiv';

export default InteractiveDiv;