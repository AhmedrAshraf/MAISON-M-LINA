import nodemailer from 'nodemailer';

// Configuration du transporteur SMTP
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      // Configuration spécifique pour IONOS
      rejectUnauthorized: process.env.NODE_ENV === 'production',
      ciphers: 'SSLv3'
    }
  };

  return nodemailer.createTransport(config);
};

// Fonction pour envoyer un email
export async function sendEmail(options: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"MAISON MÉLINA" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
}

// Fonction pour envoyer un email de contact
export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const html = `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom :</strong> ${data.name}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    <p><strong>Sujet :</strong> ${data.subject}</p>
    <p><strong>Message :</strong></p>
    <p>${data.message}</p>
  `;

  return sendEmail({
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `Contact MAISON MÉLINA - ${data.subject}`,
    html
  });
}

// Fonction pour envoyer une alerte de violation CSP
export async function sendCSPViolationAlert(violation: any) {
  const html = `
    <h2>Alerte de violation CSP</h2>
    <p><strong>Date :</strong> ${new Date().toLocaleString()}</p>
    <p><strong>URI bloquée :</strong> ${violation['blocked-uri']}</p>
    <p><strong>Document source :</strong> ${violation['document-uri']}</p>
    <p><strong>Directive violée :</strong> ${violation['violated-directive']}</p>
    <p><strong>Politique originale :</strong> ${violation['original-policy']}</p>
  `;

  return sendEmail({
    to: process.env.ALERT_EMAIL || process.env.SMTP_USER,
    subject: '🚨 Alerte de violation CSP - MAISON MÉLINA',
    html
  });
}