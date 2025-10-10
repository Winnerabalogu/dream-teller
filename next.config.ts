/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add these for better error handling
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs'],
  },
  // Handle auth errors gracefully
  async redirects() {
    return []
  },
}

export default nextConfig