// src/app/admin/achievements/page.tsx

import prisma from '@/lib/prisma';
import Link from 'next/link';
import AchievementActionButtons from '@/components/admin/AchievementActionButtons';

export default async function AdminAchievementsPage() {
    const achievements = await prisma.achievement.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-4xl text-amber-300">Manage Achievements</h1>
                <Link 
                    href="/admin/achievements/new" 
                    className="bg-amber-300 text-neutral-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400"
                >
                    + Add New Achievement
                </Link>
            </div>

            {/* achievement list */}
            <div className="rounded-lg border border-neutral-700 bg-neutral-900">
                <ul>
                    {achievements.map((achievement, index) => (
                        <li key={achievement.id} className={`flex items-center justify-between p-4 ${index < achievements.length - 1 ? 'border-b border-neutral-700' : ''}`}>
                            <span className="text-lg">{achievement.title} - <em className="text-neutral-400">{achievement.description}</em></span>
                            <AchievementActionButtons achievementSlug={achievement.slug} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}