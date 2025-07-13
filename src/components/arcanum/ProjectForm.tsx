// src/components/arcanum/ProjectForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@prisma/client';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';

// Update props untuk menerima data proyek (opsional)
type ProjectFormProps = {
    project?: Project;
};

export default function ProjectForm({ project }: ProjectFormProps) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [content, setContent] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const [tags, setTags] = useState('');
    const [screenshots, setScreenshots] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Jika ada data 'project', isi form dengan data tersebut
    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setSlug(project.slug);
            setShortDescription(project.shortDescription);
            setContent(project.content || '');
            setTrailerUrl(project.trailerUrl || '');
            setTags(Array.isArray(project.tags) ? project.tags.join(', ') : '');
            setScreenshots(Array.isArray(project.screenshots) ? project.screenshots.join(', ') : '');
        }
    }, [project]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const apiEndpoint = project ? `/api/projects/${project.slug}` : '/api/projects';
        const httpMethod = project ? 'PUT' : 'POST';

        try {
            const response = await fetch(apiEndpoint, {
                method: httpMethod,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title, slug, shortDescription, content, trailerUrl, tags, screenshots 
                }),
            });

            if (!response.ok) throw new Error('Failed to save project');
            alert('Project updated successfully!');
            router.push('/arcanum/projects');
            router.refresh();
        } catch (_error) {
            console.error(_error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-300">Project Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50"
                required
            />
        </div>
        <div>
            <label htmlFor="slug" className="block text-sm font-medium text-neutral-300">URL Slug</label>
            <input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" placeholder="contoh: mystic-market-tycoon" required
            />
        </div>
        <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-neutral-300">Short Description</label>
            <textarea id="shortDescription" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-neutral-300">Content (Deskripsi Lengkap)</label>
            <RichTextEditor
                content={content}
                onChange={(newContent) => setContent(newContent)}
            />
        </div>
            <div>
            <label htmlFor="trailerUrl" className="block text-sm font-medium text-neutral-300">YouTube Trailer URL</label>
            <input type="text" id="trailerUrl" value={trailerUrl} onChange={(e) => setTrailerUrl(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white"/>
        </div>
        <div>
            <label htmlFor="tags" className="block text-sm font-medium text-neutral-300">Tags (pisahkan dengan koma)</label>
            <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white"/>
        </div>
        <div>
            <label htmlFor="screenshots" className="block text-sm font-medium text-neutral-300">Showcase Screenshot URLs (pisahkan dengan koma)</label>
            <textarea
                id="screenshots"
                value={screenshots}
                onChange={(e) => setScreenshots(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md ..."
                placeholder="URL akan ditambahkan setelah upload..."
            />
            <div className="mt-2">
                <ImageUpload 
                    multiple={true}
                    uploadPath={`projects/${project?.slug || 'new-project'}`}
                    onUploadComplete={(urls) => {
                        const newScreenshots = screenshots ? `${screenshots}, ${urls.join(', ')}` : urls.join(', ');
                        setScreenshots(newScreenshots);
                    }} 
                />
            </div>
        </div>
        <div>
            <button type="submit" disabled={isSubmitting} className="bg-amber-300 text-neutral-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400 disabled:bg-neutral-500 disabled:cursor-not-allowed">
                {isSubmitting ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </button>
        </div>
        </form>
    );
}