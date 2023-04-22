// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
// module.exports = (phase, defaultConfig) => {
//   return withBundleAnalyzer(defaultConfig);
// };
module.exports = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  distDir: 'build',
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
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
        protocol: 'https',
        hostname: 'api.rororo-marshmallow.store',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'personality-test-images.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
      },
    ],
  },
};
