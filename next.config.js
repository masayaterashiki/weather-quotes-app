/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['openweathermap.org'],
  },
}

module.exports = nextConfig 