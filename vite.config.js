import { defineConfig } from 'vite';
import pug from 'pug';
import { readFileSync } from 'node:fs';

const base = process.env.BASE_PATH ?? '/';
const json = (p) => JSON.parse(readFileSync(p, 'utf8'));

// Pug -> HTML: index.html лише заглушка, реальна розмітка збирається з src/pug
const pugPlugin = () => ({
  name: 'pug-index',
  transformIndexHtml: {
    order: 'pre',
    handler: () =>
      pug.renderFile('src/pug/index.pug', {
        basedir: 'src/pug',
        base,
        page: json('src/data/page.json'),
        images: json('src/data/images.json'),
      }),
  },
  configureServer(server) {
    server.watcher.add(['src/pug', 'src/data']);
  },
  handleHotUpdate({ file, server }) {
    if (/\.(pug|json)$/.test(file)) {
      server.ws.send({ type: 'full-reload' });
      return [];
    }
  },
});

export default defineConfig({
  base,
  plugins: [pugPlugin()],
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
  build: { cssMinify: true },
});
