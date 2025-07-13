// src/components/public/ProjectCard.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@prisma/client'; // Import tipe data Project dari Prisma
import Tilt from 'react-parallax-tilt';
import { ArrowRight } from 'lucide-react';

// Mendefinisikan props yang akan diterima oleh komponen ini
type ProjectCardProps = {
    project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    const screenshotsArray = project.screenshots || [];
    const thumbnailUrl = screenshotsArray[0] || '/placeholder-image.png'; // Sediakan 
    // gambar placeholder
    const tagsArray = project.tags || [];

    return (
        <Tilt
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#fcd34d"
            glarePosition="all"
            scale={1.005}
            className="h-full"
        >

        <Link
            href={`/projects/${project.slug}`}
            className="group flex h-full flex-col rounded-lg border border-amber-300/20 bg-neutral-800/50 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20"
        >
            {/* Gambar Thumbnail */}
            <div className="relative h-64 sm:h-48 md:h-64 lg:h-80 w-full overflow-hidden rounded-md">
                <Image
                src={thumbnailUrl}
                alt={`Thumbnail for ${project.title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="mt-4">
                <h3 className="font-display text-xl font-bold text-amber-300">
                    {project.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-300 line-clamp-3">
                    {project.shortDescription}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {tagsArray.map((tag, index) => (
                    <span 
                        key={index} 
                        className="rounded-full bg-amber-400/10 px-2 py-1 text-xs font-semibold text-amber-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex-grow" />

            <div className="mt-4 flex items-center gap-2 text-amber-400">
                <span className="font-semibold">See Details</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
        </Link>

        </Tilt>
    );
};

export default ProjectCard;