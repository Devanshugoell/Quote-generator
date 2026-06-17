import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react'
 import tailwindcss from '@tailwindcss/vite'
 
 export default defineConfig({
   plugins: [react(), tailwindcss()],
   server: {
     port: 5174,
     proxy: {
       // 1. Handles token refresh flows
       '/oauth-provider': {
         target: 'https://accounts.zoho.in',
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/oauth-provider/, ''),
       },
       // 2. Handles CRM Data requests (COQL, Products, Quotes)
       '/crm-api': {
         target: 'https://www.zohoapis.in',
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/crm-api/, ''),
         configure: (proxy, _options) => {
           proxy.on('proxyReq', (proxyReq, req, _res) => {
             // Remove headers that cause Zoho's CORS/Security validation to fail
             proxyReq.removeHeader('origin');
             proxyReq.removeHeader('referer');
             proxyReq.removeHeader('cookie');
 
             // Also remove these if they exist (added by some browsers)
             proxyReq.removeHeader('sec-fetch-dest');
             proxyReq.removeHeader('sec-fetch-mode');
             proxyReq.removeHeader('sec-fetch-site');
           });
         },
       }
     }
   }
 })