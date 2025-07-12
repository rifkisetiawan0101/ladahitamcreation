// src/components/sanctum-sanctuarum/ProjectActionButtons.tsx
"use client"; // Menandakan ini adalah Client Component

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    projectSlug: string;
};

export default function ProjectActionButtons({ projectSlug }: Props) {
    const router = useRouter();

    const handleDelete = async () => {
        // Tampilkan dialog konfirmasi sebelum menghapus
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                const response = await fetch(`/api/projects/${projectSlug}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error("Failed to delete project");
                }

                // Muat ulang data di halaman setelah berhasil menghapus
                router.refresh();
            } catch (_error) {
                console.error(_error);
                alert("Error deleting project.");
            }
        }
    };

    return (
        <div>
            <Link href={`/sanctum-sanctuarum/projects/edit/${projectSlug}`} className="text-amber-400 hover:underline mr-4">
                Edit
            </Link>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
                Delete
            </button>
        </div>
    );
}