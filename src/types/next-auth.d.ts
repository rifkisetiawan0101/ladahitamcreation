import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Perluas tipe data JWT
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
    }
}

// Perluas tipe data Session
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
    }
}