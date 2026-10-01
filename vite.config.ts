import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = env.VITE_SITE_URL || process.env.URL;
  const base = process.env.GITHUB_PAGES === 'true' ? '/digital-wedding-invitation/' : '/';
  return {
  base,
  plugins: [react(), {
    name: 'wedding-sharing-metadata',
    transformIndexHtml(html) {
      if (!siteUrl) return html;
      const origin = new URL(siteUrl).href.replace(/\/?$/, '/');
      const image = new URL('wedding-preview.png', origin).href;
      const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
      return html.replaceAll('./wedding-preview.png', escape(image));
    },
  }],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
};
});
