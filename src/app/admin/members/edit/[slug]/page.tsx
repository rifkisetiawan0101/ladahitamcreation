// src/app/admin/members/edit/[slug]/page.tsx

import prisma from '@/lib/prisma';
import MemberForm from '@/components/admin/MemberForm';

// Props untuk menerima parameter dari URL
interface EditMemberPageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EditMemberPage({ 
    params, 
    searchParams 
}: EditMemberPageProps) {
    const { slug } = params;

    // Ambil data proyek spesifik berdasarkan slug
    const member = await prisma.member.findUnique({
        where: { slug },
    });

    if (!member) {
        return <div>Member not found.</div>;
    }

    return (
        <div>
            <h1 className="font-display text-4xl text-amber-300 mb-8">Edit Member</h1>
            {/* Berikan data proyek ke form untuk diisi otomatis */}
            <MemberForm member={member} />
        </div>
    );
}