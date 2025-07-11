// src/app/api/achievements/[slug]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

type RouteParams = { params: { slug: string } };

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
        revalidatePath('/admin/achievements');
        revalidatePath(`/members/${updatedAchievement.slug}`);
        revalidatePath('/');
        return NextResponse.json(updatedAchievement);
    } catch (_error) {
        return NextResponse.json({ message: "Failed to update achievement" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { slug } = params;
        await prisma.achievement.delete({ where: { slug } });
        revalidatePath('/admin/achievements');
        revalidatePath('/');
        return new NextResponse(null, { status: 204 });
    } catch (_error) {
        return NextResponse.json({ message: "Failed to delete achievement" }, { status: 500 });
    }
}