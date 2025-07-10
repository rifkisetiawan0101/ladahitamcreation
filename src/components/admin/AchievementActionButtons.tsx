// src/components/admin/AchievementActionButtons.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    achievementSlug: string;
};

export default function AchievementActionButtons({ achievementSlug }: Props) {
    const router = useRouter();

    const handleDelete = async () => {
        // Tampilkan dialog konfirmasi sebelum menghapus
        if (window.confirm("Are you sure you want to delete this achievement?")) {
            try {
                const response = await fetch(`/api/achievements/${achievementSlug}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error("Failed to delete achievement");
                }

                // Muat ulang data di halaman setelah berhasil menghapus
                router.refresh();
            } catch (error) {
                console.error(error);
                alert("Error deleting achievement.");
            }
        }
    };

    return (
        <div>
            <Link href={`/admin/achievements/edit/${achievementSlug}`} className="text-amber-400 hover:underline mr-4">
                Edit
            </Link>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
                Delete
            </button>
        </div>
    );
}