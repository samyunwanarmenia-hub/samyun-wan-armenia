import React from 'react';

interface OptimizedImageProps {
  src: string; // Expected format: /images/my-image.jpg
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, loading = 'lazy' }) => {
  // Extract base name from the src prop
  const lastSlashIndex = src.lastIndexOf('/');
  const lastDotIndex = src.lastIndexOf('.');
  const baseName = src.substring(lastSlashIndex + 1, lastDotIndex);

  // Construct paths for optimized and original images
  const optimizedAvif = `/optimized/${baseName}.avif`;
  const optimizedWebp = `/optimized/${baseName}.webp`;
  // The optimized JPG will now be handled by the <img> tag's src if other sources fail.
  const originalPath = src; // This is the original image path, e.g., /images/my-image.jpg

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
        onError={(e) => {
          // Optional: Log if even the original image fails to load
          console.error(`Failed to load image: ${e.currentTarget.src}`);
        }}
      />
    </picture>
  );
};

export default OptimizedImage;