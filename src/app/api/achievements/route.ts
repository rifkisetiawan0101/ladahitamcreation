// src/app/api/achievements/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newAchievement = await prisma.achievement.create({
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
            },
        });
        revalidatePath('/admin/achievements');
        revalidatePath('/');
        return NextResponse.json(newAchievement, { status: 201 });
    } catch (_error) {
        console.error("API POST Error:", _error);
        return NextResponse.json({ message: "Failed to create achievement" }, { status: 500 });
    }
}