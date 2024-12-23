import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  base: '/qz-shop/',  // Базовый путь для деплоя
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Устанавливаем алиас для пути 'src'
    },
  },
  server: {
    port: 7754, // Устанавливаем порт для сервера
    host: 'localhost', // Устанавливаем хост для локального запуска
  },
});
