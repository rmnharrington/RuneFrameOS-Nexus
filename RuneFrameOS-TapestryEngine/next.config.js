/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove deprecated appDir option
  // Add hostname binding for Kubernetes
  env: {
    HOSTNAME: '0.0.0.0',
  },
}

module.exports = nextConfig
