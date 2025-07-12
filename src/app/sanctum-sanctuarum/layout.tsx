"use client";
import Link from "next/link";
import { signOut } from "next-auth/react"; // <-- Import signOut
import AuthProvider from "@/components/sanctum-sanctuarum/AuthProvider"; // <-- Import AuthProvider
import { LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider> 
            <div className="flex min-h-screen">
                <aside className="w-64 bg-neutral-900 p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="font-display text-2xl text-amber-300 mb-8">Admin Panel</h2>
                        <nav>
                            <ul className="space-y-4">
                                <li><Link href="/sanctum-sanctuarum/dashboard" className="text-neutral-300 hover:text-amber-300">Dashboard</Link></li>
                                <li><Link href="/sanctum-sanctuarum/team-info" className="text-neutral-300 hover:text-amber-300">Team Info</Link></li>
                                <li><Link href="/sanctum-sanctuarum/projects" className="text-neutral-300 hover:text-amber-300">Projects</Link></li>
                                <li><Link href="/sanctum-sanctuarum/members" className="text-neutral-300 hover:text-amber-300">Members</Link></li>
                                <li><Link href="/sanctum-sanctuarum/achievements" className="text-neutral-300 hover:text-amber-300">Achievements</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <button 
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="flex items-center gap-2 w-full text-left text-neutral-400 hover:text-red-500 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </AuthProvider>
    );
}