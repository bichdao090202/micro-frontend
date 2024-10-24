import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remote',
      
      exposes: {
        './button': './src/button.tsx',
        './text': './src/text.tsx',
        './store': './src/store.ts',
        './printNumber': './src/printNumber.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});