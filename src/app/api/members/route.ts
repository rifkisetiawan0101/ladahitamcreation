// src/app/api/members/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        if (!data.name || !data.slug || !data.role) {
            return NextResponse.json({ message: "Name, slug, and role are required." }, { status: 400 });
        }

        const newMember = await prisma.member.create({
            data: {
                name: data.name,
                slug: data.slug,
                role: data.role,
                content: data.content || "",
                pictureUrl: data.pictureUrl || null,
                screenshots: data.screenshots ? data.screenshots.split(',').map((ss: string) => ss.trim()) : [],
            },
        });
        revalidatePath('/admin/members');
        revalidatePath('/');
        return NextResponse.json(newMember, { status: 201 });
    } catch (_error) {
        console.error("API POST Error:", _error);
        return NextResponse.json({ message: "Failed to create member" }, { status: 500 });
    }
}