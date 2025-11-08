import path from 'path'; // Import the path module

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Ensure 'punycode' resolves to the npm package for both client and server
    // This is a common fix for the DeprecationWarning.
    // Using path.join and process.cwd() for ES module compatibility.
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: path.join(process.cwd(), 'node_modules', 'punycode'),
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/samyun-wan-armenia.html',
        destination: '/hy',
        permanent: true,
      },
    ];
  },
  // Add other configurations as needed
};

export default nextConfig;
