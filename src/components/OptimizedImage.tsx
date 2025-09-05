"use client";

import { useState } from 'react';
import { ImageOff } from 'lucide-react'; // Import ImageOff icon
import { IMAGE_OPTIMIZED_WIDTHS } from '@/config/imageConfig'; // Import centralized widths
import { motion } from 'framer-motion'; // Import motion

interface OptimizedImageProps {
  src: string; // Expected format: /images/my-image.jpg
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string; // e.g., "(max-width: 600px) 100vw, 50vw"
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, loading = 'lazy', sizes }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // New state for image load status

  // Extract base name from the src prop
  const lastSlashIndex = src.lastIndexOf('/');
  const lastDotIndex = src.lastIndexOf('.');
  const baseName = src.substring(lastSlashIndex + 1, lastDotIndex);

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image: ${src}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg ${className}`}>
        <ImageOff className="w-1/2 h-1/2" /> {/* Adjust size as needed */}
      </div>
    );
  }

  // Generate srcset for different formats and sizes
  const generateSrcset = (format: 'jpg' | 'webp' | 'avif') => {
    const widths = IMAGE_OPTIMIZED_WIDTHS; // Use centralized widths
    return widths.map((width: number) => `/optimized/${baseName}-${width}w.${format} ${width}w`).join(', ');
  };

  // Determine the default src for the <img> tag (smallest optimized JPG)
  const defaultJpgSrc = `/optimized/${baseName}-150w.jpg`;

  return (
    <motion.picture
      initial={{ opacity: 0 }}
      animate={{ opacity: imageLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Try AVIF first */}
      <source type="image/avif" srcSet={generateSrcset('avif')} sizes={sizes} />
      {/* Then WebP */}
      <source type="image/webp" srcSet={generateSrcset('webp')} sizes={sizes} />
      {/* Fallback to smallest optimized JPG if AVIF/WebP fail or are not supported */}
      <motion.img
        src={defaultJpgSrc} // Default fallback to the smallest optimized JPG
        srcSet={generateSrcset('jpg')}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        onError={handleImageError}
        onLoad={handleImageLoad} // Call handleImageLoad on successful load
        whileHover={{ scale: 1.02 }} // Subtle scale on hover
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      />
    </motion.picture>
  );
};

export default OptimizedImage;