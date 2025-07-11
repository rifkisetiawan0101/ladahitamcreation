// src/components/public/ProjectDetailClient.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@prisma/client';
import Lightbox from './Lightbox';
import VideoPlayer from './VideoPlayer';

type ProjectDetailClientProps = {
    project: Project;
};

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Pastikan screenshots adalah array, bahkan jika kosong
    const screenshotsArray = Array.isArray(project.screenshots) ? project.screenshots : [];

    return (
        <>
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
                            {screenshotsArray.map((screenshot, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-full aspect-video rounded-md overflow-hidden cursor-pointer group"
                                    onClick={() => setLightboxImage(screenshot)}
                                >
                                    <Image 
                                        src={screenshot} 
                                        alt={`Screenshot ${index + 1}`} 
                                        fill 
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox akan muncul di sini jika ada gambar yang dipilih */}
            {lightboxImage && (
                <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
            )}
        </>
    );
}