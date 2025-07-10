// src/components/public/SocialLinks.tsx
import Link from 'next/link';
import { Linkedin, Instagram, Gamepad2, Github } from 'lucide-react';

type Socials = {
    linkedin?: string;
    itch?: string;
    instagram?: string;
};

// SVG Ikon bisa disimpan di sini atau di file terpisah
const iconMap: { [key in keyof Socials]: React.ElementType } = {
    linkedin: Linkedin,
    itch: Gamepad2,
    instagram: Instagram,
};

export default function SocialLinks({ socials }: { socials: Socials }) {
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