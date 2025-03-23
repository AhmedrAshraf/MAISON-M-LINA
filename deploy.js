import * as ftp from 'basic-ftp';
import { config } from 'dotenv';
import { readdir, statSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const readdirAsync = promisify(readdir);

// Charger les variables d'environnement
config();

async function uploadDirectory(client, localDir, remoteDir) {
  try {
    const files = await readdirAsync(localDir);
    
    for (const file of files) {
      const localPath = join(localDir, file);
      const remotePath = join(remoteDir, file).replace(/\\/g, '/');
      
      const stats = statSync(localPath);
      
      if (stats.isDirectory()) {
        await client.ensureDir(remotePath);
        await uploadDirectory(client, localPath, remotePath);
      } else {
        console.log(`Uploading: ${localPath} -> ${remotePath}`);
        await client.uploadFrom(localPath, remotePath);
      }
    }
  } catch (err) {
    console.error(`Error uploading directory: ${err.message}`);
    throw err;
  }
}

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: parseInt(process.env.FTP_PORT) || 21,
      secure: false
    });

    console.log('Connected to FTP server');

    // Aller au répertoire distant
    await client.ensureDir(process.env.FTP_REMOTE_DIR);
    await client.clearWorkingDir();

    // Upload du contenu du dossier dist
    console.log('Starting upload...');
    await uploadDirectory(client, './dist', process.env.FTP_REMOTE_DIR);

    console.log('Upload completed successfully!');
  } catch (err) {
    console.error(`Error during deployment: ${err.message}`);
  } finally {
    client.close();
  }
}

deploy();