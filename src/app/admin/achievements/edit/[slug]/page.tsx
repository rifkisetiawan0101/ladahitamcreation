// src/app/admin/achievements/edit/[slug]/page.tsx

import prisma from '@/lib/prisma';
import AchievementForm from '@/components/admin/AchievementForm';

// Props untuk menerima parameter dari URL
type EditAchievementPageProps = {
    params: {
        slug: string;
    };
};

export default async function EditAchievementPage({ params }: EditAchievementPageProps) {
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