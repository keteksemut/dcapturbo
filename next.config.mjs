/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              memo: true,   // React.memo for performance
            },
          },
        ],
        as: '*.js', // output as JS module
      },
    },
  },
};
export default nextConfig;
