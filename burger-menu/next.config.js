/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'preodemo.gumlet.io',
      'media.istockphoto.com',
      'poaparrilla.com.br',
      'images.unsplash.com',
      'plus.unsplash.com',
      'encrypted-tbn0.gstatic.com',
    ],
  },
}

module.exports = nextConfig