import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) {
                    return null;
                }

                // Cari user di database
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username }
                });

                if (!user) {
                    return null;
                }

                // Bandingkan password yang diinput dengan hash di database
                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (isPasswordCorrect) {
                    // Jika benar, kembalikan data user (tanpa password)
                    return { id: user.id, name: user.username };
                }

                return null;
            }
        })
    ],
    // Tentukan halaman login kustom Anda
    pages: {
        signIn: '/login',
    },
    // Secret untuk mengamankan session
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
