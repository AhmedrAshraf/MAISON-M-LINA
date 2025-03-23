import type { APIRoute } from 'astro';
import { sendCSPViolationAlert } from '../../utils/mailer';

export const post: APIRoute = async ({ request }) => {
  try {
    const report = await request.json();
    
    // Log the CSP violation report
    console.error('CSP Violation:', {
      'blocked-uri': report['blocked-uri'],
      'document-uri': report['document-uri'],
      'violated-directive': report['violated-directive'],
      'original-policy': report['original-policy'],
      timestamp: new Date().toISOString()
    });

    // Envoyer l'alerte par email
    await sendCSPViolationAlert(report);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};