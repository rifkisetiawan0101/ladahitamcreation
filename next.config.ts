import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
        ignoreDuringBuilds: true,
    },

    typescript: {
        ignoreBuildErrors: true,
    },

    webpack(config) {
        // Menambahkan pemeriksaan keamanan untuk 'rules'
        if (!config.module.rules) {
            return config;
        }

        // Cari aturan default untuk SVG
        // @ts-ignore - Kita mengabaikan tipe 'rule' yang rumit
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

        config.module.rules.push(
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            }
        );
        
        // Ubah aturan default jika ditemukan
        if (fileLoaderRule) {
            // @ts-ignore - Kita memodifikasi properti yang ada
            fileLoaderRule.exclude = /\.svg$/i;
        }

        return config;
    },
};

export default nextConfig;