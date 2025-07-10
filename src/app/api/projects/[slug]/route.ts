// src/app/api/projects/[slug]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

type RouteParams = {
    params: {
        slug: string;
    };
};

// Fungsi untuk UPDATE (PUT)
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
                tags: data.tags,
                trailerUrl: data.trailerUrl,
                screenshots: data.screenshots,
            },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error("API PUT Error:", error);
        return NextResponse.json({ message: "Failed to update project" }, { status: 500 });
    }
}

// Fungsi untuk DELETE
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { slug } = params;

        await prisma.project.delete({
        where: { slug },
        });

        return new NextResponse(null, { status: 204 }); // 204 No Content
    } catch (error) {
        console.error("API DELETE Error:", error);
        return NextResponse.json({ message: "Failed to delete project" }, { status: 500 });
    }
}