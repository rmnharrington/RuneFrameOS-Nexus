/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14 no longer needs appDir experimental flag
  // Ensure server binds to all interfaces
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig
