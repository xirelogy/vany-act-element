import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VanyActElementLibrary',
      fileName: 'vany-act-element',
    },
    rollupOptions: {
      external: [
        'vue',
        '@xirelogy/xwts',
        '@xirelogy/vany',
        'element-plus',
        'element-plus/es',
        '@element-plus/icons-vue',
        '@vueuse/core',
      ],
      output: {
        globals: {
          vue: 'Vue',
          '@xirelogy/xwts': 'Xwts',
          '@xirelogy/vany': 'VanyComponentLibrary',
          'element-plus': 'ElementPlus',
          'element-plus/es': 'ElementPlusEs',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          '@vueuse/core': 'VueUseCore',
        },
      },
    },
  },
});
