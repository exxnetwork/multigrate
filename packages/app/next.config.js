/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com"], //Domain of image host
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/migrator",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
