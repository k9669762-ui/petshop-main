/** @type {import('next').NextConfig} */
const isProductionBuild = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: isProductionBuild ? 'export' : undefined,
  trailingSlash: isProductionBuild,
  reactStrictMode: true,
  compiler: {
    removeConsole: isProductionBuild ? { exclude: ['error'] } : false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'swiper',
    ],
  },
}

module.exports = nextConfig
