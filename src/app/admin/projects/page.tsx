// src/app/admin/projects/new/page.tsx

import prisma from '@/lib/prisma';
import Link from 'next/link';
import ProjectActionButtons from '@/components/admin/ProjectActionButtons';

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { id: 'desc' },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-4xl text-amber-300">Manage Projects</h1>
                <Link 
                    href="/admin/projects/new" 
                    className="bg-amber-300 text-neutral-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400"
                >
                    + Add New Project
                </Link>
            </div>

            {/* Project list */}
            <div className="rounded-lg border border-neutral-700 bg-neutral-900">
                <ul>
                    {projects.map((project, index) => (
                        <li key={project.id} className={`flex items-center justify-between p-4 ${index < projects.length - 1 ? 'border-b border-neutral-700' : ''}`}>
                            <span className="text-lg">{project.title}</span>
                            <ProjectActionButtons projectSlug={project.slug} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}