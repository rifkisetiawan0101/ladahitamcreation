// src/app/projects/[slug]/page.tsx

import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/public/ProjectDetailClient'; // <-- IMPORT komponen baru

type ProjectDetailPageProps = {
    params: {
        slug: string;
    };
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { slug } = params;

    const project = await prisma.project.findUnique({
        where: { slug },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <ProjectDetailClient project={project} />
        </div>
    );
}