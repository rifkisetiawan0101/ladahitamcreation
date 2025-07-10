// src/app/admin/achievements/new/page.tsx
import AchievementForm from '@/components/admin/AchievementForm';

export default function NewAchievementPage() {
    return (
        <div>
            <h1 className="font-display text-4xl text-amber-300 mb-8">Add New Achievement</h1>
            <AchievementForm />
        </div>
    );
}