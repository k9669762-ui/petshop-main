/** @type {import('next').NextConfig} */
const isProductionBuild = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: isProductionBuild ? 'export' : undefined,
  trailingSlash: isProductionBuild,
  reactStrictMode: false, // strict mode causes double renders in dev — slows navigation
  compiler: {
    removeConsole: isProductionBuild ? { exclude: ['error'] } : false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
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
      '@radix-ui/react-toast',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-slider',
      'swiper',
      'firebase',
    ],
  },
}

module.exports = nextConfig
