// src/app/arcanum/dashboard/page.tsx

import prisma from '@/lib/prisma';
import { Package, Users, Award, FileText } from 'lucide-react';
import Link from 'next/link';

// Komponen untuk setiap kartu statistik
function StatCard({ title, value, icon: Icon, href }: { title: string, value: number, icon: React.ElementType, href: string }) {
    return (
        <Link href={href} className="block p-6 rounded-lg border border-neutral-700 bg-neutral-900 transition-colors hover:border-amber-400">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-400/10">
                    <Icon className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                    <p className="text-sm font-medium text-neutral-400">{title}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
            </div>
        </Link>
    );
}

export default async function DashboardPage() {
    // Ambil jumlah data dari setiap model secara paralel
    const [projectCount, memberCount, achievementCount, teamInfo] = await Promise.all([
        prisma.project.count(),
        prisma.member.count(),
        prisma.achievement.count(),
        prisma.teamInfo.findUnique({ where: { id: 'ladahitam_info' }})
    ]);

    return (
        <div>
            <h1 className="font-display text-4xl text-amber-300 mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Projects" 
                    value={projectCount} 
                    icon={Package} 
                    href="/arcanum/projects"
                />
                <StatCard 
                    title="Total Members" 
                    value={memberCount} 
                    icon={Users}
                    href="/arcanum/members"
                />
                <StatCard 
                    title="Total Achievements" 
                    value={achievementCount} 
                    icon={Award}
                    href="/arcanum/achievements"
                />
                <StatCard 
                    title="Team Info" 
                    value={teamInfo ? 1 : 0} 
                    icon={FileText}
                    href="/arcanum/team-info"
                />
            </div>
            
            {/* Anda bisa menambahkan elemen lain di sini nanti */}
        </div>
    );
}