const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'c:\\PROJECTS\\DIGITAL MARKEYING\\public\\assets\\premium\\Overlapping Cards';
const files = fs.readdirSync(dir);

async function compress() {
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const filePath = path.join(dir, file);
      const tempPath = filePath + '.tmp';
      
      console.log('Compressing:', file);
      await sharp(filePath)
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 70, progressive: true })
        .toFile(tempPath);
        
      fs.renameSync(tempPath, filePath);
    }
  }
  
  // also compress philosophy-hero-v2
  const heroPath = 'c:\\PROJECTS\\DIGITAL MARKEYING\\public\\images\\philosophy-hero-v2.jpg';
  if (fs.existsSync(heroPath)) {
    console.log('Compressing hero');
    await sharp(heroPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true })
        .toFile(heroPath + '.tmp');
    fs.renameSync(heroPath + '.tmp', heroPath);
  }
  console.log('Done!');
}

compress().catch(console.error);
