// src/app/api/projects/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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

        return NextResponse.json(newProject, { status: 201 });
    } catch (_error) {
        console.error("API Route Error:", error); 
        return NextResponse.json(
            { message: "Failed to create projects." },
            { status: 500 }
        );
    }
}