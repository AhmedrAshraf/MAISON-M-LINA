import { promises as fs } from 'fs';
import { join } from 'path';

async function checkVideo(path) {
  try {
    const stats = await fs.stat(path);
    console.log(`\nChecking video: ${path}`);
    console.log(`File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
    
    // Vérifier que le fichier n'est pas vide
    if (stats.size === 0) {
      console.error('❌ Error: File is empty');
      return false;
    }

    // Lire les premiers octets pour vérifier la signature du fichier
    const buffer = Buffer.alloc(16);
    const file = await fs.open(path, 'r');
    await file.read(buffer, 0, 16, 0);
    await file.close();

    // Vérifier les signatures des fichiers
    const isMP4 = buffer.toString('hex', 4, 8) === '66747970'; // ftyp
    const isWebM = buffer.toString('hex', 0, 4) === '1a45dfa3'; // EBML

    if (path.endsWith('.mp4') && !isMP4) {
      console.error('❌ Error: Invalid MP4 file signature');
      return false;
    }

    if (path.endsWith('.webm') && !isWebM) {
      console.error('❌ Error: Invalid WebM file signature');
      return false;
    }

    // Vérifier les permissions du fichier
    try {
      await fs.access(path, fs.constants.R_OK);
    } catch (error) {
      console.error('❌ Error: File is not readable');
      return false;
    }

    console.log('✅ File integrity check passed');
    return true;
  } catch (error) {
    console.error(`❌ Error checking file: ${error.message}`);
    return false;
  }
}

async function main() {
  const videos = [
    './public/img/videos/concept_melina.mp4',
    './public/img/videos/concept_melina.webm',
    './public/img/videos/tl7-melina.mp4'
  ];

  console.log('🔍 Checking video files...');
  
  let allValid = true;
  for (const video of videos) {
    const isValid = await checkVideo(video);
    if (!isValid) {
      allValid = false;
      console.error(`❌ Video check failed for: ${video}`);
    }
  }

  if (!allValid) {
    process.exit(1);
  }
}

main().catch(console.error);