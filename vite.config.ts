import { defineConfig } from 'vite';  // このインポートを確認
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // 'src'ディレクトリを@にマッピング
    },
  },
});
