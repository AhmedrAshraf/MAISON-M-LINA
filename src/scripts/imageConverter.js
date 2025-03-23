import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join, extname, basename } from 'path';

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
}

async function processDirectory(directory) {
  try {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const inputPath = join(directory, file);
      const stat = await fs.stat(inputPath);
      
      if (stat.isDirectory()) {
        await processDirectory(inputPath);
      } else {
        const ext = extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const outputPath = join(
            directory,
            `${basename(file, ext)}.webp`
          );
          await convertToWebP(inputPath, outputPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

// Convertir toutes les images du dossier public
processDirectory('./public/img');