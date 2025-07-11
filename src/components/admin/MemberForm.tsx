// src/components/admin/MemberForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Member } from '@prisma/client';

// Update props untuk menerima data member (opsional)
type MemberFormProps = {
    member?: Member;
};

export default function MemberForm({ member }: MemberFormProps) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [role, setRole] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Jika ada data 'member', isi form dengan data tersebut
    useEffect(() => {
        if (member) {
            setName(member.name);
            setSlug(member.slug);
            setRole(member.role);
        }
    }, [member]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiEndpoint = member ? `/api/members/${member.slug}` : '/api/members';
        const httpMethod = member ? 'PUT' : 'POST';

        try {
            const response = await fetch(apiEndpoint, {
                method: httpMethod,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, slug, role }),
            });

            if (!response.ok) throw new Error('Failed to save member');
            alert('Member updated successfully!');
            router.push('/admin/members');
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
            <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Member name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50"
                required
            />
        </div>
        <div>
            <label htmlFor="slug" className="block text-sm font-medium text-neutral-300">URL Slug</label>
            <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50"
                placeholder="contoh: rifki-setiawan"
                required
            />
        </div>
        <div>
            <label htmlFor="role" className="block text-sm font-medium text-neutral-300">Role</label>
            <input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
                {isSubmitting ? 'Saving...' : (member ? 'Update Member' : 'Create Member')}
            </button>
        </div>
        </form>
    );
}