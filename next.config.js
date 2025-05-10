/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['openweathermap.org', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig 