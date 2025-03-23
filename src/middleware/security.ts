import type { AstroGlobal } from 'astro';

export async function handleSecurity({ request, cookies }: AstroGlobal) {
  // Anti-CSRF Token
  const csrfToken = crypto.randomUUID();
  cookies.set('XSRF-TOKEN', csrfToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  // Rate Limiting
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
  if (clientIP) {
    const requests = await getRateLimit(clientIP);
    if (requests > 100) { // 100 requêtes par minute max
      return new Response('Too Many Requests', { status: 429 });
    }
    await incrementRateLimit(clientIP);
  }

  return null;
}

// Validation des entrées
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Supprime les balises HTML
    .trim();
}

// Validation des fichiers
export function validateFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return allowedTypes.includes(file.type) && file.size <= maxSize;
}