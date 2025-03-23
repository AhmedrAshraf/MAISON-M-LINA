import type { Maison } from './types';

export class API {
  private static baseUrl = import.meta.env.PUBLIC_API_URL || '/api';

  // Récupérer toutes les maisons
  static async getMaisons(): Promise<Maison[]> {
    try {
      const response = await fetch(`${this.baseUrl}/maisons.php`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des maisons');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      // En cas d'erreur, on retourne les données statiques
      const { maisons } = await import('../data/maisons');
      return maisons;
    }
  }

  // Récupérer une maison par son ID
  static async getMaisonById(id: number): Promise<Maison | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/maison.php?id=${id}`);
      if (!response.ok) throw new Error('Erreur lors de la récupération de la maison');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      const maisons = await this.getMaisons();
      return maisons.find(maison => maison.id === id);
    }
  }

  // Envoyer un formulaire de contact
  static async sendContactForm(formData: FormData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/contact.php`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Erreur lors de l\'envoi du message');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      return { 
        success: false, 
        message: 'Une erreur est survenue lors de l\'envoi du message' 
      };
    }
  }
}