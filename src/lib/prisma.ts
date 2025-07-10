import { PrismaClient } from '@prisma/client';

// variabel global untuk menyimpan instance Prisma
declare global {
    var prisma: PrismaClient | undefined;
}

// instance PrismaClient
const client = globalThis.prisma || new PrismaClient();

// Di env selain production, simpan instance ke variabel global
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

export default client;