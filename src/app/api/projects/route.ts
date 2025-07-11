// src/app/api/projects/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newProject = await prisma.project.create({
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
        revalidatePath('/admin/projects');
        revalidatePath('/');
        return NextResponse.json(newProject, { status: 201 });
    } catch (_error) {
        console.error("API POST Error:", _error); 
        return NextResponse.json( { message: "Failed to create projects." }, { status: 500 } );
    }
}