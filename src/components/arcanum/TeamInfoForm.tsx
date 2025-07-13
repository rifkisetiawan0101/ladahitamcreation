// src/components/arcanum/TeamInfoForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TeamInfo } from '@prisma/client';
import ImageUpload from './ImageUpload';

type Socials = {
    itch?: string;
    behance?: string;
    linkedin?: string;
    instagram?: string;
};

export default function TeamInfoForm({ teamInfo }: { teamInfo: TeamInfo }) {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [socials, setSocials] = useState<Socials>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (teamInfo) {
            setName(teamInfo.name);
            setBio(teamInfo.bio);
            setEmail(teamInfo.email);
            setLogoUrl(teamInfo.logoUrl || '');
            setSocials(teamInfo.socials as Socials);
        }
    }, [teamInfo]);

    const handleSocialChange = (platform: keyof Socials, value: string) => {
        setSocials(prev => ({ ...prev, [platform]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/team-info', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, bio, email, logoUrl, socials }),
            });
            
            if (!response.ok) throw new Error('Failed to save team info');
            alert('Team info updated successfully!');
            router.refresh();
        } catch (_error) {
            console.error(_error);
            alert('Error updating team info.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Studio Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" required />
        </div>
        <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-neutral-300">Logo URL</label>
            <input 
                type="text" 
                id="logoUrl" 
                value={logoUrl} 
                onChange={(e) => setLogoUrl(e.target.value)} 
                className="mt-1 block w-full rounded-md text-neutral-500 ..."
                placeholder="Or upload the file below"
            />
            <div className="mt-2">
                <ImageUpload 
                    multiple={false}
                    uploadPath={`team-info/'}`}
                    onUploadComplete={(urls) => {
                        if (urls.length > 0) {
                            setLogoUrl(urls[0]);
                        }
                    }} 
                />
            </div>
        </div>
        <div>
            <label htmlFor="bio" className="block text-sm font-medium text-neutral-300">Bio</label>
            <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" required />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" required />
        </div>
        <fieldset className="space-y-4 rounded-lg border border-neutral-700 p-4">
            <legend className="text-sm font-medium text-neutral-300 px-2">Social Links</legend>
            <input type="text" placeholder="Itch.io URL" value={socials.itch || ''} onChange={(e) => handleSocialChange('itch', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="Behance URL" value={socials.behance || ''} onChange={(e) => handleSocialChange('behance', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="LinkedIn URL" value={socials.linkedin || ''} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
            <input type="text" placeholder="Instagram URL" value={socials.instagram || ''} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="mt-1 block w-full rounded-md border-neutral-600 bg-neutral-800 text-white shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-300 focus:ring-opacity-50" />
        </fieldset>
        <div>
            <button type="submit" disabled={isSubmitting} className="bg-amber-300 text-neutral-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400 disabled:bg-neutral-500 disabled:cursor-not-allowed">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
        </form>
    );
}