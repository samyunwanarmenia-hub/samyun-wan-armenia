export const getOptimizedImagePath = (originalSrc: string, format: 'jpg' | 'webp' | 'avif' = 'jpg'): string => {
  const lastSlashIndex = originalSrc.lastIndexOf('/');
  const lastDotIndex = originalSrc.lastIndexOf('.');
  const baseName = originalSrc.substring(lastSlashIndex + 1, lastDotIndex);
  return `/optimized/${baseName}.${format}`;
};