// src/components/admin/MemberActionButtons.tsx
"use client"; // Menandakan ini adalah Client Component

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    memberSlug: string;
};

export default function MemberActionButtons({ memberSlug }: Props) {
    const router = useRouter();

    const handleDelete = async () => {
        // Tampilkan dialog konfirmasi sebelum menghapus
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                const response = await fetch(`/api/members/${memberSlug}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error("Failed to delete member");
                }

                // Muat ulang data di halaman setelah berhasil menghapus
                router.refresh();
            } catch (_error) {
                console.error(error);
                alert("Error deleting member.");
            }
        }
    };

    return (
        <div>
            <Link href={`/admin/members/edit/${memberSlug}`} className="text-amber-400 hover:underline mr-4">
                Edit
            </Link>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
                Delete
            </button>
        </div>
    );
}