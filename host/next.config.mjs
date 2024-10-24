import NextFederationPlugin from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        remotes: {
          remote: `remote@http://localhost:3001/mf-manifest.json`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        shared: {
        },
      }),
    );

    return config;
  }
};

export default nextConfig;
