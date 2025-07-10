/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'glmqkytupyqvzybtjltf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  eslint: {
      // Warning: Ini akan menonaktifkan pengecekan ESLint saat build.
      // Sebaiknya hanya digunakan jika Anda yakin kode Anda benar.
      ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;