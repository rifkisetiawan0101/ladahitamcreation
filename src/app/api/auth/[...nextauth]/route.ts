import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const SESSION_MAX_AGE = 1800; // 30 menit

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username }
                });
                if (!user) return null;

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (isPasswordCorrect) {
                    return { id: user.id, username: user.username };
                }
                return null;
            }
        })
    ],
    
    session: {
        strategy: 'jwt',
        maxAge: SESSION_MAX_AGE,
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id; // Error akan hilang di sini
            }
            return session;
        },
    },

    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
