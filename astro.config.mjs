import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.maison-melina.fr',
  output: 'static',
  server: {
    port: 3000,
    host: true
  },
  vite: {
    build: {
      assetsInlineLimit: 4096,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [/node_modules/],
          }
        }
      }
    },
    ssr: {
      noExternal: ['sharp']
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [{ protocol: "https" }],
    domains: ['www.maison-melina.fr']
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://www.maison-melina.fr/nos-maisons/1',
        'https://www.maison-melina.fr/nos-maisons/2',
        'https://www.maison-melina.fr/nos-maisons/3',
        'https://www.maison-melina.fr/nos-maisons/4'
      ],
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR'
        }
      },
      filter: (page) => !page.includes('404')
    })
  ]
});