// src/app/sanctum-sanctuarum/projects/edit/[slug]/page.tsx

import prisma from '@/lib/prisma';
import ProjectForm from '@/components/sanctum-sanctuarum/ProjectForm';
import type { NextPage } from 'next';

type Props = {
    params: { slug: string };
};

const EditProjectPage: NextPage<Props> = async ({ params }) => {
    const { slug } = params;

    // Ambil data proyek spesifik berdasarkan slug
    const project = await prisma.project.findUnique({
        where: { slug },
    });

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (
        <div>
            <h1 className="font-display text-4xl text-amber-300 mb-8">Edit Project</h1>
            {/* Berikan data proyek ke form untuk diisi otomatis */}
            <ProjectForm project={project} />
        </div>
    );
}

export default EditProjectPage;