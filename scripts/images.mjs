// Генерує AVIF + WebP + JPEG (fallback) у кількох ширинах за src/data/images.json
import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';

const manifest = JSON.parse(readFileSync('src/data/images.json', 'utf8'));
const out = 'public/img';
mkdirSync(out, { recursive: true });

const formats = {
  avif: (s) => s.avif({ quality: 55, effort: 4 }),
  webp: (s) => s.webp({ quality: 78 }),
  jpg: (s) => s.jpeg({ quality: 80, mozjpeg: true }),
};

for (const [name, { widths }] of Object.entries(manifest)) {
  for (const width of widths) {
    for (const [ext, encode] of Object.entries(formats)) {
      const file = `${out}/${name}-${width}.${ext}`;
      if (existsSync(file)) continue;
      await encode(sharp(`src/assets/img-src/${name}.png`).resize({ width })).toFile(file);
    }
  }
  console.log('✓', name);
}
