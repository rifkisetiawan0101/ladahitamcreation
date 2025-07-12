// src/app/sanctum-sanctuarum/team-info/page.tsx
import prisma from '@/lib/prisma';
import TeamInfoForm from '@/components/sanctum-sanctuarum/TeamInfoForm';
import { notFound } from 'next/navigation';

export default async function AdminTeamInfoPage() {
    const teamInfo = await prisma.teamInfo.findUnique({
        where: { id: 'ladahitam_info' },
    });

    if (!teamInfo) {
        notFound();
    }
    
    return (
        <div>
            <h1 className="font-display text-4xl text-amber-300 mb-8">Manage Team Info</h1>
        <TeamInfoForm teamInfo={teamInfo} />
        </div>
    );
}