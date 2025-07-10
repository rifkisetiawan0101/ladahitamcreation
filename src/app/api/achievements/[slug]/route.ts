// src/app/api/achievements/[slug]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

type RouteParams = { params: { slug: string } };

// Fungsi untuk UPDATE (PUT)
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { slug: currentSlug } = params;
        const data = await request.json();
        const updatedAchievement = await prisma.achievement.update({
            where: { slug: currentSlug },
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
        },
    });
        return NextResponse.json(updatedAchievement);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update achievement" }, { status: 500 });
    }
}

// Fungsi untuk DELETE
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { slug } = params;
        await prisma.achievement.delete({ where: { slug } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete achievement" }, { status: 500 });
    }
}