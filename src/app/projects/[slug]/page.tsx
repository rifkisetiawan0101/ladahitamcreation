// src/app/projects/[slug]/page.tsx

import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/public/VideoPlayer'; // <-- IMPORT komponen baru

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

    const screenshotsArray = (project.screenshots as string[]) || [];

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12">
                {/* KOLOM KIRI (Konten Utama) */}
                <div className="lg:col-span-2">
                    <article>
                        <header className="mb-12">
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-amber-300">
                                {project.title}
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-neutral-300">
                                {project.shortDescription}
                            </p>
                        </header>
                        <div 
                            className="prose prose-invert prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: project.content || '' }}
                        />
                    </article>
                </div>

                {/* KOLOM KANAN (Trailer & Screenshot) */}
                <div className="lg:col-span-1 space-y-8 mt-12 lg:mt-0">
                    {project.trailerUrl && <VideoPlayer videoUrl={project.trailerUrl} />}
                    {screenshotsArray.length > 0 && (
                        <div className="space-y-4">
                            {/* Gunakan screenshotsArray untuk di-map */}
                            {screenshotsArray.map((screenshot, index) => (
                                <div key={index} className="relative w-full aspect-video rounded-md overflow-hidden">
                                    <Image src={screenshot} alt={`Screenshot ${index + 1}`} fill className="object-cover"/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}