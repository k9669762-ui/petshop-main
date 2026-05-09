/** @type {import('next').NextConfig} */
const isProductionBuild = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: isProductionBuild ? 'export' : undefined,
  trailingSlash: isProductionBuild,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig

