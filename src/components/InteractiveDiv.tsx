"use client";

import { motion, MotionProps } from 'framer-motion'; // Changed HTMLMotionProps to MotionProps
import React from 'react';

// 1. Define custom props that InteractiveDiv adds
interface InteractiveDivCustomProps {
  children?: React.ReactNode;
  className?: string;
  whileHoverScale?: number;
  whileTapScale?: number;
  hoverShadow?: string;
  hoverY?: number;
}

// 2. Define the polymorphic props type
// This type represents all props that can be passed to InteractiveDiv.
// It combines our custom props with the props of the underlying element C,
// and also includes all general MotionProps from framer-motion.
type InteractiveDivProps<C extends React.ElementType> =
  InteractiveDivCustomProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof InteractiveDivCustomProps> & // Props of the actual component, omitting our custom ones
  MotionProps & // All general motion properties
  { as?: C }; // The 'as' prop itself

// 3. Implement the component using React.forwardRef
const InteractiveDiv = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      as: Component = 'div' as C, // Cast 'div' to C to satisfy TypeScript for default value
      children,
      className,
      whileHoverScale = 1.05,
      whileTapScale = 0.98,
      hoverShadow = "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)",
      hoverY = -5,
      ...rest // All other props specific to C (e.g., href for 'a', onClick for 'button', custom props for MyComponent)
    }: InteractiveDivProps<C>, // Use the new combined props type
    ref?: React.ForwardedRef<React.ElementRef<C>> // Correct ref type for polymorphic components
  ) => {
    const MotionComponent = motion(Component);

    return (
      <MotionComponent
        ref={ref} // This ref should now be correctly typed and compatible
        className={className}
        whileHover={{
          scale: whileHoverScale,
          y: hoverY,
          boxShadow: hoverShadow,
        }}
        whileTap={{ scale: whileTapScale }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...rest} // Pass all remaining props to the MotionComponent
      >
        {children}
      </MotionComponent>
    );
  }
) as (<C extends React.ElementType = 'div'>(props: InteractiveDivProps<C> & React.RefAttributes<React.ElementRef<C>>) => React.ReactElement | null);

export default InteractiveDiv;