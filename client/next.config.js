// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
// module.exports = (phase, defaultConfig) => {
//   return withBundleAnalyzer(defaultConfig);
// };
module.exports = {
  compiler: {
    styledComponents: true,
  },
  distDir: 'build',
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
      },
    ],
  },
  // images: {
  //   // loader: 'akamai',
  //   path: 'http://localhost:8080',
  //   domains: ['localhost'],
  // },
};
