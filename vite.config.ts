import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        postcssNested(),
        postcssPresetEnv({
          stage: 3,
        }),
      ],
    },
  },
});
