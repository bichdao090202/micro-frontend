import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: {
    port: 3002,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remote2',
      
      exposes: {
        './store': './src/store.ts',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});