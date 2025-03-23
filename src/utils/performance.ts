// Optimisation des images
export async function optimizeImage(file: File): Promise<Blob> {
  const sharp = require('sharp');
  const buffer = await file.arrayBuffer();
  
  return sharp(buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

// Lazy loading des images
export function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Préchargement des ressources critiques
export function preloadCriticalResources() {
  const resources = [
    { href: '/fonts/lato.woff2', as: 'font', type: 'font/woff2' },
    { href: '/css/critical.css', as: 'style' },
    { href: '/js/main.js', as: 'script' }
  ];

  resources.forEach(({ href, as, type }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  });
}