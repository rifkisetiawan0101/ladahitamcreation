// src/app/api/members/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newMember = await prisma.member.create({
            data: {
                name: data.name,
                slug: data.slug,
                role: data.role,
                content: "",
                screenshots: "",
            },
        });
        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json({ message: "Failed to create member" }, { status: 500 });
    }
}