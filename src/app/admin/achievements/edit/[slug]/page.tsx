// src/app/admin/achievements/edit/[slug]/page.tsx

import prisma from '@/lib/prisma';
import AchievementForm from '@/components/admin/AchievementForm';

// Props (error) untuk menerima parameter dari URL
type Props = {
    params: { slug: string };
    // searchParams: { [key: string]: string | string[] | undefined };
};

// @ts-ignore Server Component type issue dengan Prisma-Postgres
export default async function EditAchievementPage({ 
    params, 
    // searchParams 
}: Props) {
    const { slug } = params;

    // Ambil data proyek spesifik berdasarkan slug
    const achievement = await prisma.achievement.findUnique({
        where: { slug },
    });

    if (!achievement) {
        return <div>Achievement not found.</div>;
    }

    return (
        <div>
            <h1 className="font-display text-4xl text-amber-300 mb-8">Edit Achievement</h1>
            {/* Berikan data proyek ke form untuk diisi otomatis */}
            <AchievementForm achievement={achievement} />
        </div>
    );
}