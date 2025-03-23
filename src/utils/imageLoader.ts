import { join } from 'path';

export function getImagePath(src: string): string {
  // Ensure path starts with /img/
  if (!src.startsWith('/img/')) {
    return `/img/${src.replace(/^\/+/, '')}`;
  }
  return src;
}

export function getImageType(src: string): string {
  const ext = src.toLowerCase().split('.').pop();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg';
  }
}

export function getWebPPath(src: string): string {
  const ext = src.substring(src.lastIndexOf('.'));
  return src.replace(ext, '.webp');
}

export function generateSrcSet(src: string, sizes: number[] = [400, 800, 1200]): string {
  const ext = src.substring(src.lastIndexOf('.'));
  const basePath = src.substring(0, src.lastIndexOf('.'));
  
  return sizes
    .map(size => `${basePath}-${size}w${ext} ${size}w`)
    .join(',\n    ');
}