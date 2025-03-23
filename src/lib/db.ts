// Configuration de la connexion MySQL
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'maison_melina'
};

// Structure SQL des tables (à utiliser dans phpMyAdmin)
/*
CREATE TABLE maisons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  ville VARCHAR(255) NOT NULL,
  adresse TEXT NOT NULL,
  description TEXT NOT NULL,
  description_detaillee TEXT NOT NULL,
  chambres INT NOT NULL,
  surface_totale VARCHAR(50) NOT NULL,
  surface_commune VARCHAR(50) NOT NULL,
  surface_chambre VARCHAR(50) NOT NULL,
  image VARCHAR(255) NOT NULL,
  disponibilite VARCHAR(100) NOT NULL,
  prix VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE images_supplementaires (
  id INT PRIMARY KEY AUTO_INCREMENT,
  maison_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  FOREIGN KEY (maison_id) REFERENCES maisons(id) ON DELETE CASCADE
);

CREATE TABLE caracteristiques (
  id INT PRIMARY KEY AUTO_INCREMENT,
  maison_id INT NOT NULL,
  nom VARCHAR(255) NOT NULL,
  FOREIGN KEY (maison_id) REFERENCES maisons(id) ON DELETE CASCADE
);

CREATE TABLE equipements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  maison_id INT NOT NULL,
  type ENUM('commun', 'chambre') NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (maison_id) REFERENCES maisons(id) ON DELETE CASCADE
);

CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  maison_id INT NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (maison_id) REFERENCES maisons(id) ON DELETE CASCADE
);

CREATE TABLE environnement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  maison_id INT NOT NULL,
  type ENUM('transport', 'commerce', 'sante', 'loisir') NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (maison_id) REFERENCES maisons(id) ON DELETE CASCADE
);

CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/