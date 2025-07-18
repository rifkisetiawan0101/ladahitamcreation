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
        unoptimized: true,
    },
    
    eslint: {
        ignoreDuringBuilds: true,
    },

    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
