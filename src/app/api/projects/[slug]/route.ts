// src/app/api/projects/[slug]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

type RouteParams = { params: { slug: string; }; };

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { slug } = params;
        const data = await request.json();
        const updatedProject = await prisma.project.update({
            where: { slug },
            data: {
                title: data.title,
                slug: data.slug,
                shortDescription: data.shortDescription,
                content: data.content,
                tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
                trailerUrl: data.trailerUrl,
                screenshots: data.screenshots ? data.screenshots.split(',').map((ss: string) => ss.trim()) : [],
            },
        });
        revalidatePath('/sanctum-sanctuarum/projects');
        revalidatePath(`/projects/${updatedProject.slug}`);
        revalidatePath('/');
        return NextResponse.json(updatedProject);
    } catch (_error) {
        console.error("API PUT Error:", _error);
        return NextResponse.json({ message: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { slug } = params;
        await prisma.project.delete({ where: { slug } });
        revalidatePath('/sanctum-sanctuarum/projects');
        revalidatePath('/');
        return new NextResponse(null, { status: 204 }); 
    } catch (_error) {
        console.error("API DELETE Error:", _error);
        return NextResponse.json({ message: "Failed to delete project" }, { status: 500 });
    }
}