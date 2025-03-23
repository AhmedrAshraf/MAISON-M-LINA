import pkg from 'sanitize-html';
import { rateLimit } from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
const sanitizeHtml = pkg.sanitizeHtml;

// Validation des entrées
export function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  }).trim();
}

// Validation de l'email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Validation du téléphone
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
}

// Génération du token CSRF
export function generateCSRFToken(): string {
  return uuidv4();
}

// Configuration du rate limiting
export const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requêtes par fenêtre
  message: 'Trop de tentatives, veuillez réessayer plus tard.'
});

// Honeypot
export function checkHoneypot(value: string): boolean {
  return value === '';
}

// Validation du formulaire
export interface ContactFormData {
  name: string;
  email: string;
  telephone: string;
  subject: string;
  message: string;
  maisons?: string[];
  _honeypot?: string;
  _csrf?: string;
}

export function validateContactForm(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Vérification des champs requis
  if (!data.name || data.name.length < 2) {
    errors.push('Le nom est requis et doit contenir au moins 2 caractères');
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push('L\'adresse email n\'est pas valide');
  }

  if (!data.telephone || !validatePhone(data.telephone)) {
    errors.push('Le numéro de téléphone n\'est pas valide');
  }

  if (!data.subject) {
    errors.push('Le sujet est requis');
  }

  if (!data.message || data.message.length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }

  // Vérification des maisons si le sujet est "visite"
  if (data.subject === 'visite' && (!data.maisons || data.maisons.length === 0)) {
    errors.push('Veuillez sélectionner au moins une maison pour votre demande de visite');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}