"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Member } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import Lightbox from './Lightbox';
import MemberSocialLinks from './SocialLinks';
import Masonry from 'react-masonry-css';

type MemberDetailClientProps = {
    member: Member;
};

export default function MemberDetailClient({ member }: MemberDetailClientProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const screenshotsArray = Array.isArray(member.screenshots) ? member.screenshots : [];
    const socials = member.socials as { [key: string]: string } | null;
    const breakpointColumnsObj = {
        default: 4, // Default 3 kolom
        1024: 3,  // 3 kolom di layar besar
        768: 2,   // 2 kolom di layar sedang
        500: 1    // 1 kolom di layar kecil
    };
    
    return (
        <>
            <div className="container max-w-4xl mx-auto px-4 pt-12 md:pt-20">
                <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    <div 
                        className="relative h-40 w-40 flex-shrink-0 rounded-full overflow-hidden ring-4 ring-amber-300/50 cursor-pointer"
                        onClick={() => setLightboxImage(member.pictureUrl || '/default-avatar.png')}
                    >
                        <Image src={member.pictureUrl || '/default-avatar.png'} alt={`Photo of ${member.name}`} fill className="object-cover"/>
                    </div>
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-amber-300 text-center md:text-left">{member.name}</h1>
                        <p className="my-2 text-xl text-neutral-300 text-center md:text-left">{member.role}</p>
                        <MemberSocialLinks socials={socials} />
                    </div>
                </header>

                <article className="prose prose-invert prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: member.content || '' }} />
                </article>
            </div>

            {screenshotsArray.length > 0 && (
                <div className="container max-w-8xl mx-auto px-0 py-16">
                    <h2 className="font-display text-3xl text-center text-amber-300 mb-8">Showcase</h2>
                    
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {screenshotsArray.map((screenshot, index) => (
                            <div 
                                key={index}
                                onClick={() => setLightboxImage(screenshot)}
                            >
                                <div className="relative rounded-lg overflow-hidden cursor-pointer group bg-neutral-900">
                                    <Image 
                                        src={screenshot} 
                                        alt={`Showcase ${index + 1}`} 
                                        width={800}
                                        height={800}
                                        className="w-full h-auto object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 group-hover:bg-amber-300/10 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </div>
            )}

            {lightboxImage && (
                <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
            )}
        </>
    );
}