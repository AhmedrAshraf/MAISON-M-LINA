// Types pour les maisons
export interface Maison {
  id: number;
  nom: string;
  ville: string;
  adresse: string;
  description: string;
  description_detaillee: string;
  chambres: number;
  surface_totale: string;
  surface_commune: string;
  surface_chambre: string;
  image: string;
  images_supplementaires: string[];
  disponibilite: string;
  prix: string;
  caracteristiques: string[];
  equipements: {
    communs: string[];
    chambres: string[];
  };
  services: string[];
  environnement: {
    transports: string[];
    commerces: string[];
    sante: string[];
    loisirs: string[];
  };
}

// Types pour le formulaire de contact
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}