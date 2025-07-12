// Tanpa "use client"
import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/login',
    },
});

// Konfigurasi untuk melindungi semua halaman di bawah /admin
export const config = {
    matcher: ['/sanctum-sanctuarum/:path*'],
};
