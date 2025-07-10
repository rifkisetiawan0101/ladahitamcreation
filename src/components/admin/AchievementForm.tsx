// src/components/admin/AchievementForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Achievement } from '@prisma/client';

// Update props untuk menerima data achievement (opsional)
type AchievementProps = {
    achievement?: Achievement;
};

export default function AchievementForm({ achievement }: AchievementProps) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Jika ada data 'achievement', isi form dengan data tersebut
    useEffect(() => {
        if (achievement) {
            setTitle(achievement.title);
            setSlug(achievement.slug);
            setDescription(achievement.description);
        }
    }, [achievement]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiEndpoint = achievement ? `/api/achievements/${achievement.slug}` : '/api/achievements';
        const httpMethod = achievement ? 'PUT' : 'POST';

        try {
            const response = await fetch(apiEndpoint, {
                method: httpMethod,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, slug, description }),
            });

            if (!response.ok) throw new Error('Failed to save achievement');

            router.push('/admin/achievements');
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
            <label htmlFor="title" className="block text-sm font-medium text-neutral-300">Achievement title</label>
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
            <label htmlFor="description" className="block text-sm font-medium text-neutral-300">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50"
                required
            />
        </div>
        <div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-300 text-neutral-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400 disabled:bg-neutral-500 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Saving...' : (achievement ? 'Update Achievement' : 'Create Achievement')}
            </button>
        </div>
        </form>
    );
}