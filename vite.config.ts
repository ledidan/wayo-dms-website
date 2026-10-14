import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { renderSeoHead, seoPages } from './src/config/seo';

const start = '<!-- wayo:seo:start -->';
const end = '<!-- wayo:seo:end -->';
const seoBlock = new RegExp(`${start}[\\s\\S]*?${end}`);

function pageMetadata(): Plugin {
  return {
    name: 'wayo-page-metadata',
    enforce: 'post',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const pathname = (context.originalUrl || context.path).split('?')[0].replace(/\/$/, '');
        const page = pathname === seoPages.downloads.path ? seoPages.downloads : seoPages.home;
        return html.replace(seoBlock, `${start}\n    ${renderSeoHead(page)}\n    ${end}`);
      },
    },
    configurePreviewServer(server) {
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url || '/', 'http://localhost');
        if (url.pathname.replace(/\/$/, '') === seoPages.downloads.path) {
          request.url = `/tai-ung-dung/index.html${url.search}`;
        }
        next();
      });
    },
    generateBundle(_options, bundle) {
      const entry = bundle['index.html'];
      if (!entry || entry.type !== 'asset') throw new Error('Wayo SEO: built index.html is missing');
      const html = typeof entry.source === 'string' ? entry.source : new TextDecoder().decode(entry.source);
      if (!seoBlock.test(html)) throw new Error('Wayo SEO: metadata markers are missing');
      this.emitFile({
        type: 'asset',
        fileName: 'tai-ung-dung/index.html',
        source: html.replace(seoBlock, `${start}\n    ${renderSeoHead(seoPages.downloads)}\n    ${end}`),
      });
    },
  };
}

export default defineConfig({ plugins: [react(), pageMetadata()] });
