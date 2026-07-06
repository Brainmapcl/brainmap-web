// One-off conversion: every raster image actually rendered on the site
// (PNG/JPEG) gets a sibling .webp file. Run with: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const pub = (p) => path.join(ROOT, 'public', p);

const FILES = [
  pub('assets/logo-brainmap-clean.png'),
  pub('assets/hero-editorial.png'),
  pub('assets/team-rodrigo.jpeg'),
  pub('assets/team-ivan.png'),
  pub('_ds/brainmap-design-system-0cc9e534-a309-4ac6-9b2d-9d9325c207d7/assets/imagery/texture-arch-lattice.jpg'),
  pub('_ds/brainmap-design-system-0cc9e534-a309-4ac6-9b2d-9d9325c207d7/assets/imagery/portrait-2.jpg'),
  pub('_ds/brainmap-design-system-0cc9e534-a309-4ac6-9b2d-9d9325c207d7/assets/imagery/portrait-1.jpg'),
  pub('_ds/brainmap-design-system-0cc9e534-a309-4ac6-9b2d-9d9325c207d7/assets/imagery/texture-structural.jpg'),
  pub('_ds/brainmap-design-system-0cc9e534-a309-4ac6-9b2d-9d9325c207d7/assets/imagery/texture-arch-warm.jpg'),
];

const manifest = {};

for (const file of FILES) {
  const ext = path.extname(file);
  const webpFile = file.slice(0, -ext.length) + '.webp';
  const img = sharp(file);
  const meta = await img.metadata();
  await img.webp({ quality: 82 }).toFile(webpFile);
  const webpStat = await sharp(webpFile).metadata();
  const key = '/' + path.relative(path.join(ROOT, 'public'), file).split(path.sep).join('/');
  manifest[key] = {
    webp: '/' + path.relative(path.join(ROOT, 'public'), webpFile).split(path.sep).join('/'),
    width: meta.width,
    height: meta.height,
  };
  console.log(`${key}  ${meta.width}x${meta.height}  ->  ${manifest[key].webp}`);
}

await writeFile(path.join(ROOT, 'scripts', 'image-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('\nManifest written to scripts/image-manifest.json');
