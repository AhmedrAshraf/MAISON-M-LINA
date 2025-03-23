export function setCacheHeaders(response: Response) {
  const cacheControl = [
    'public',
    'max-age=3600',
    'must-revalidate',
    's-maxage=3600',
    'stale-while-revalidate=86400'
  ];

  response.headers.set('Cache-Control', cacheControl.join(', '));
  response.headers.set('Vary', 'Accept-Encoding');
}

export function setSecurityHeaders(response: Response) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
}