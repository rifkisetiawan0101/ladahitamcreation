// src/components/public/MemberCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Member } from '@prisma/client';
import MemberSocialLinks from './SocialLinks';

type MemberCardProps = {
    member: Member;
};

export default function MemberCard({ member }: MemberCardProps) {
    const imageUrl = member.pictureUrl || '/default-avatar.png';
    const socials = member.socials as { [key: string]: string } | null;

    return (
        <Link 
            href={`/members/${member.slug}`} 
            className="group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
        >
            <div className="relative h-32 w-32 mb-4 rounded-full overflow-hidden ring-2 ring-amber-300/50 transition-all duration-300 group-hover:ring-4 group-hover:ring-amber-300">
                <Image
                    src={imageUrl}
                    alt={`Photo of ${member.name}`}
                    fill
                    className="object-cover"
                />
            </div>
            <h3 className="font-bold text-xl text-white">{member.name}</h3>
            <p className="mb-2 text-amber-300">{member.role}</p>
            <MemberSocialLinks socials={socials} />
        </Link>
    );
}