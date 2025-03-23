import type { APIRoute } from 'astro';
import { validateContactForm, sanitizeInput, checkHoneypot } from '../../middleware/contact';
import { sendContactEmail } from '../../utils/mailer';

export const post: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = {
      name: sanitizeInput(formData.get('name')?.toString() || ''),
      email: sanitizeInput(formData.get('email')?.toString() || ''),
      telephone: sanitizeInput(formData.get('telephone')?.toString() || ''),
      subject: sanitizeInput(formData.get('subject')?.toString() || ''),
      message: sanitizeInput(formData.get('message')?.toString() || ''),
      maisons: formData.getAll('maisons').map(m => m.toString()),
      _honeypot: formData.get('_honeypot')?.toString(),
      _csrf: formData.get('_csrf')?.toString()
    };

    // Vérification du honeypot
    if (!checkHoneypot(data._honeypot || '')) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Une erreur est survenue'
      }), { status: 400 });
    }

    // Validation du formulaire
    const validation = validateContactForm(data);
    if (!validation.valid) {
      return new Response(JSON.stringify({
        success: false,
        errors: validation.errors
      }), { status: 400 });
    }

    // Envoi de l'email
    await sendContactEmail(data);

    // Envoi de l'email de confirmation
    await sendContactEmail({
      name: data.name,
      email: data.email,
      subject: 'Confirmation de votre message',
      message: `
        Bonjour ${data.name},
        
        Nous avons bien reçu votre message concernant "${data.subject}".
        Nous vous répondrons dans les plus brefs délais.
        
        Cordialement,
        L'équipe MAISON MÉLINA
      `
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Votre message a été envoyé avec succès'
    }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors du traitement du formulaire:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du message'
    }), { status: 500 });
  }
}