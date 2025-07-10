// src/components/public/AchievementItem.tsx
import Image from 'next/image';
import { Award } from 'lucide-react'; // Kita tetap butuh Award untuk fallback
import { Achievement } from '@prisma/client';

type AchievementItemProps = {
    achievement: Achievement;
};

export default function AchievementItem({ achievement }: AchievementItemProps) {
    return (
        <div className="flex flex-col items-center text-center rounded-lg border border-neutral-800 p-6 bg-neutral-900/50 h-full">
            <div className="relative h-40 w-40 flex-shrink-0 mb-4">
                {achievement.logoUrl ? (
                    // Jika ada logoUrl, tampilkan gambar
                    <Image
                        src={achievement.logoUrl}
                        alt={`Logo for ${achievement.title}`}
                        fill
                        className="object-contain"
                    />
                ) : (
                    // Jika tidak ada, tampilkan ikon Award sebagai pengganti
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-neutral-800">
                        <Award className="h-6 w-6 text-amber-400" />
                    </div>
                )}
            </div>

            <div>
                <h3 className="font-display text-lg font-bold text-white">{achievement.title}</h3>
                <p className="mt-1 text-sm text-neutral-300">{achievement.description}</p>
            </div>
        </div>
    );
}