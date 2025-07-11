// src/components/public/SocialLinks.tsx
import Link from 'next/link';
import { Linkedin, Github, Instagram, Gamepad2, Youtube } from 'lucide-react';

type Socials = {
    linkedin?: string;
    github?: string;
    itch?: string;
    behance?: string;
    instagram?: string;
    youtube?: string;
};

// SVG Ikon bisa disimpan di sini atau di file terpisah
const iconMap: { [key in keyof Socials]: React.ElementType } = {
    linkedin: Linkedin,
    github: Github,
    itch: Gamepad2,
    // behance: Behance, ini ga ada icon nya
    instagram: Instagram,
    youtube: Youtube
};

export default function SocialLinks({ socials }: { socials: Socials | null }) {
    if (!socials) return null;
    const socialEntries = Object.entries(socials) as [keyof Socials, string][];

    return (
        <div className="flex items-center gap-4">
            {socialEntries.map(([platform, url]) => {
                if (!url) return null;
                const Icon = iconMap[platform];
                if (!Icon) return null;

                return (
                    <Link 
                        key={platform} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-neutral-400 transition-colors hover:text-amber-300"
                    >
                        <span className="sr-only">{platform}</span>
                        <Icon className="h-6 w-6" />
                    </Link>
                );
            })}
        </div>
    );
}