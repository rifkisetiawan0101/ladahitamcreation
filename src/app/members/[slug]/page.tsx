// src/app/members/[slug]/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import MemberDetailClient from '@/components/public/MemberDetailClient';

type MemberDetailPageProps = {
    params: { slug: string };
};

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
    const { slug } = params;
    const member = await prisma.member.findUnique({
        where: { slug },
    });

    if (!member) {
        notFound();
    }

    return (
        <MemberDetailClient member={member} />
    );
}