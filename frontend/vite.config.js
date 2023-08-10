import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  
  base: './',
  plugins: [react()],
  assetsInclude: ['/*.jpg', '/*.png'],
  server: {
    proxy: {
      '/api': {
        target: 'https://i9e202.p.ssafy.io',
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Origin': '*', // 또는 특정 도메인 설정
        },
      },
    },
  },
});
