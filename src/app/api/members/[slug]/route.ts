// src/app/api/members/[slug]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

type RouteParams = { params: { slug: string } };

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { slug } = params;
        const data = await request.json();
        const updatedMember = await prisma.member.update({
            where: { slug },
            data: {
                name: data.name,
                slug: data.slug,
                role: data.role,
                content: data.content,
                pictureUrl: data.pictureUrl,
                screenshots: data.screenshots ? data.screenshots.split(',').map((ss: string) => ss.trim()) : [],
                socials: data.socials,
            },
        });
        revalidatePath('/admin/members');
        revalidatePath(`/members/${updatedMember.slug}`);
        revalidatePath('/');
        return NextResponse.json(updatedMember);
    } catch (_error) {
        console.error("API PUT Error:", _error);
        return NextResponse.json({ message: "Failed to update member" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { slug } = params;
        await prisma.member.delete({ where: { slug } });
        revalidatePath('/admin/members');
        revalidatePath('/');
        return new NextResponse(null, { status: 204 });
    } catch (_error) {
        console.error("API DELETE Error:", _error);
        return NextResponse.json({ message: "Failed to delete member" }, { status: 500 });
    }
}