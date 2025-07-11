// src/components/public/SocialLinks.tsx
import Link from 'next/link';
import { Linkedin, Github, Instagram, Youtube, FileUser, Files } from 'lucide-react';
import { ItchIoIcon, BehanceIcon } from '@/assets/CustomIcons';

type Socials = {
    linkedin?: string;
    github?: string;
    itch?: string;
    behance?: string;
    instagram?: string;
    youtube?: string;
    portfolio?: string;
    cv?: string;
};

// SVG Ikon bisa disimpan di sini atau di file terpisah
const iconMap: { [key in keyof Socials]: React.ElementType } = {
    linkedin: Linkedin,
    github: Github,
    itch: ItchIoIcon,
    behance: BehanceIcon,
    instagram: Instagram,
    youtube: Youtube,
    portfolio: FileUser,
    cv: Files
};

export default function SocialLinks({ socials }: { socials: Socials | null }) {
    if (!socials) return null;
    const socialEntries = Object.entries(socials) as [keyof Socials, string][];

    return (
        <div className="flex items-center gap-3">
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
                        <Icon className="h-5 w-5" />
                    </Link>
                );
            })}
        </div>
    );
}