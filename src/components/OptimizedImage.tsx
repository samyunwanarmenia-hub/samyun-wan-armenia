import React, { useState } from 'react';
import { ImageOff } from 'lucide-react'; // Import ImageOff icon

interface OptimizedImageProps {
  src: string; // Expected format: /images/my-image.jpg
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, loading = 'lazy' }) => {
  const [imageError, setImageError] = useState(false);

  // Extract base name from the src prop
  const lastSlashIndex = src.lastIndexOf('/');
  const lastDotIndex = src.lastIndexOf('.');
  const baseName = src.substring(lastSlashIndex + 1, lastDotIndex);

  // Construct paths for optimized and original images
  const optimizedAvif = `/optimized/${baseName}.avif`;
  const optimizedWebp = `/optimized/${baseName}.webp`;
  const originalPath = src; // This is the original image path, e.g., /images/my-image.jpg

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image: ${originalPath}`);
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg ${className}`}>
        <ImageOff className="w-1/2 h-1/2" /> {/* Adjust size as needed */}
      </div>
    );
  }

  return (
    <picture>
      {/* Try AVIF first */}
      <source srcSet={optimizedAvif} type="image/avif" />
      {/* Then WebP */}
      <source srcSet={optimizedWebp} type="image/webp" />
      {/* Fallback to original image if all optimized versions fail or are not supported */}
      <img
        src={originalPath} // Fallback to the original image path
        alt={alt}
        className={className}
        loading={loading}
        onError={handleImageError}
      />
    </picture>
  );
};

export default OptimizedImage;