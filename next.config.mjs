/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // Vercel Blob storage
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      // Unsplash (seed images)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Any other https image (for pasted URLs in admin)
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
