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
    
    // Konfigurasi Webpack untuk menangani SVG sebagai komponen React
    webpack(config) {
        // Ambil aturan default untuk SVG
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        );

        config.module.rules.push(
            // Aturan baru untuk SVG yang diimpor dari dalam file .tsx atau .jsx
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        icon: true, // Optimasi untuk ikon
                    },
                }],
            }
        );

        // Modifikasi aturan default agar tidak menangani SVG yang sudah kita proses
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/i;
        }

        return config;
    },
};

module.exports = nextConfig;
