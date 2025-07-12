// src/components/sanctum-sanctuarum/MemberForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Member } from '@prisma/client';
import RichTextEditor from './RichTextEditor'; 
import ImageUpload from './ImageUpload';

// Update props untuk menerima data member (opsional)
type MemberFormProps = {
    member?: Member;
};

type Socials = {
    linkedin?: string;
    behance?: string;
    github?: string;
    instagram?: string;
    itch?: string;
    youtube?: string;
    portfolio?: string;
    cv?: string;
};

export default function MemberForm({ member }: MemberFormProps) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [role, setRole] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [socials, setSocials] = useState<Socials>({});
    const [content, setContent] = useState('');
    const [screenshots, setScreenshots] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Jika ada data 'member', isi form dengan data tersebut
    useEffect(() => {
        if (member) {
            setName(member.name);
            setSlug(member.slug);
            setRole(member.role);
            setContent(member.content || '');
            setPictureUrl(member.pictureUrl || '');
            setScreenshots(Array.isArray(member.screenshots) ? member.screenshots.join(', ') : '');
        }
    }, [member]);
    
    const handleSocialChange = (platform: keyof Socials, value: string) => {
        setSocials(prev => ({ ...prev, [platform]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiEndpoint = member ? `/api/members/${member.slug}` : '/api/members';
        const httpMethod = member ? 'PUT' : 'POST';

        try {
            const response = await fetch(apiEndpoint, {
                method: httpMethod,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, slug, role, content, pictureUrl, screenshots, socials, }),
            });

            if (!response.ok) throw new Error('Failed to save member');
            alert('Member updated successfully!');
            router.push('/sanctum-sanctuarum/members');
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
            <label htmlFor="pictureUrl" className="block text-sm font-medium text-neutral-300">Profile Picture URL</label>
            <input
                type="text"
                id="pictureUrl"
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
                className="mt-1 block w-full rounded-md ..."
                placeholder="Atau upload file di bawah ini"
            />
            <div className="mt-2">
                <ImageUpload 
                    multiple={false}
                    uploadPath={`members/${member?.slug || 'new-member'}`}
                    onUploadComplete={(urls) => {
                        if (urls.length > 0) {
                            setPictureUrl(urls[0]);
                        }
                    }} 
                />
            </div>
        </div>
        <fieldset className="space-y-4 rounded-lg border border-neutral-700 p-4">
            <legend className="text-sm font-medium text-neutral-300 px-2">Social Links</legend>
            <input type="text" placeholder="LinkedIn URL" value={socials.linkedin || ''} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="Behance URL" value={socials.behance || ''} onChange={(e) => handleSocialChange('behance', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="Github URL" value={socials.github || ''} onChange={(e) => handleSocialChange('github', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="Instagram URL" value={socials.instagram || ''} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="Itch.io URL" value={socials.itch || ''} onChange={(e) => handleSocialChange('itch', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="Youtube URL" value={socials.youtube || ''} onChange={(e) => handleSocialChange('youtube', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="Portfolio URL" value={socials.portfolio || ''} onChange={(e) => handleSocialChange('portfolio', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="CV URL" value={socials.cv || ''} onChange={(e) => handleSocialChange('cv', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
        </fieldset>
        <div>
            <label className="block text-sm font-medium text-neutral-300">Content/Bio Kalian</label>
            <RichTextEditor
                content={content}
                onChange={(newContent) => setContent(newContent)}
            />
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
                    uploadPath={`members/${member?.slug || 'new-member'}`}
                    onUploadComplete={(urls) => {
                        const newScreenshots = screenshots ? `${screenshots}, ${urls.join(', ')}` : urls.join(', ');
                        setScreenshots(newScreenshots);
                    }} 
                />
            </div>
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