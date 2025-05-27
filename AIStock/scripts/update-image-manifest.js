// Auto-generate manifest.json for images in public/images
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const manifestPath = path.join(imagesDir, 'manifest.json');

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

fs.readdir(imagesDir, (err, files) => {
  if (err) throw err;
  const images = files.filter(
    (file) =>
      allowedExtensions.includes(path.extname(file).toLowerCase()) &&
      file !== 'manifest.json'
  );
  fs.writeFileSync(manifestPath, JSON.stringify(images, null, 2));
  console.log(`Updated manifest.json with ${images.length} images.`);
});
