"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Member } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import Lightbox from './Lightbox';
import MemberSocialLinks from './SocialLinks';

type MemberDetailClientProps = {
    member: Member;
};

export default function MemberDetailClient({ member }: MemberDetailClientProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const screenshotsArray = Array.isArray(member.screenshots) ? member.screenshots : [];

    const socials = member.socials as { [key: string]: string } | null;

    return (
        <>
            <div className="max-w-4xl mx-auto">
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

                {screenshotsArray.length > 0 && (
                    <div className="mt-16">
                        <h2 className="font-display text-3xl text-center text-amber-300 mb-8">Showcase</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {screenshotsArray.map((screenshot, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-full aspect-video rounded-md overflow-hidden cursor-pointer"
                                    onClick={() => setLightboxImage(screenshot)}
                                >
                                    <Image src={screenshot} alt={`Showcase ${index + 1}`} fill className="object-cover"/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {lightboxImage && (
                <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
            )}
        </>
    );
}