// src/components/public/MemberCard.tsx
import Image from 'next/image';
import { Member } from '@prisma/client';

type MemberCardProps = {
    member: Member;
};

export default function MemberCard({ member }: MemberCardProps) {
    // Sediakan gambar placeholder jika tidak ada foto
    const imageUrl = member.pictureUrl || '/default-avatar.png';

    return (
        <div className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
            <div className="relative h-32 w-32 mb-4 rounded-full overflow-hidden ring-2 ring-amber-100/50">
                <Image
                    src={imageUrl}
                    alt={`Photo of ${member.name}`}
                    fill
                    className="object-cover"
                />
            </div>
            <h3 className="font-bold text-lg text-white">{member.name}</h3>
            <p className="text-amber-300 text-sm">{member.role}</p>
        </div>
    );
}