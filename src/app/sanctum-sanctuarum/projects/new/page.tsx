// src/app/sanctum-sanctuarum/projects/new/page.tsx
import ProjectForm from '@/components/sanctum-sanctuarum/ProjectForm';

export default function NewProjectPage() {
    return (
        <div>
            <h1 className="font-display text-4xl text-amber-300 mb-8">Add New Project</h1>
            <ProjectForm />
        </div>
    );
}