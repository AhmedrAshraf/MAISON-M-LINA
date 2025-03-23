import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const get: APIRoute = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    debug: true,
    logger: true
  });

  try {
    console.log('Tentative d\'envoi d\'email test...');
    
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ALERT_EMAIL,
      subject: 'Test email - MAISON MÉLINA',
      html: `
        <h1>Test de configuration email</h1>
        <p>Ceci est un email de test pour vérifier la configuration SMTP.</p>
        <p>Date d'envoi : ${new Date().toLocaleString()}</p>
      `
    });

    console.log('Email test envoyé avec succès:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Email test envoyé avec succès',
      details: info
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email test:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
      command: error.command
    });

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};