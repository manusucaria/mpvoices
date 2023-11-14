/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'scontent.cdninstagram.com',
        protocol: 'https'
      }
    ]
  }
}

module.exports = nextConfig
