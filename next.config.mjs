/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Unsplash (seed images)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Generic HTTPS — allows pasted image URLs in admin
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
