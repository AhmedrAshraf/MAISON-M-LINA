// Schéma pour une maison partagée
export const getMaisonSchema = (maison) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": maison.nom,
  "description": maison.description,
  "image": maison.images_supplementaires[0],
  "offers": {
    "@type": "Offer",
    "price": maison.prix.replace(/[^0-9]/g, ''),
    "priceCurrency": "EUR",
    "availability": maison.disponibilite === "Immédiate" ? 
      "https://schema.org/InStock" : 
      "https://schema.org/PreOrder"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": maison.adresse,
    "addressLocality": maison.ville,
    "addressCountry": "FR"
  }
});

// Schéma pour l'organisation
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MAISON MÉLINA",
  "url": "https://www.maison-melina.fr",
  "logo": "https://www.maison-melina.fr/img/divers/logo.jpg",
  "sameAs": [
    "https://www.facebook.com/maison.melina/",
    "https://www.instagram.com/maisons.melina"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1 Allée Régis Auguste",
    "addressLocality": "ST GENEST LERPT",
    "postalCode": "42530",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33451262959",
    "contactType": "customer service",
    "email": "contact@maison-melina.fr"
  }
});