// src/app/admin/layout.tsx
"use client";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
        {/* Sidebar Navigasi Admin */}
        <aside className="w-64 bg-neutral-900 p-6">
            <h2 className="font-display text-2xl text-amber-300 mb-8">Admin Panel</h2>
            <nav>
            <ul className="space-y-4">
                <li><Link href="/admin/dashboard" className="text-neutral-300 hover:text-amber-300">Dashboard</Link></li>
                <li><Link href="/admin/team-info" className="text-neutral-300 hover:text-amber-300">Team Info</Link></li>
                <li><Link href="/admin/projects" className="text-neutral-300 hover:text-amber-300">Projects</Link></li>
                <li><Link href="/admin/members" className="text-neutral-300 hover:text-amber-300">Members</Link></li>
                <li><Link href="/admin/achievements" className="text-neutral-300 hover:text-amber-300">Achievements</Link></li>
            </ul>
            </nav>
        </aside>

        {/* Konten Utama Halaman Admin */}
        <main className="flex-1 p-8">
            {children}
        </main>
        </div>
    );
}