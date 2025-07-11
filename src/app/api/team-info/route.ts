// src/app/api/team-info/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const TEAM_INFO_ID = 'ladahitam_info';

export async function GET() {
    try {
        const teamInfo = await prisma.teamInfo.findUnique({
            where: { id: TEAM_INFO_ID },
        });
        return NextResponse.json(teamInfo);
    } catch (_error) {
        return NextResponse.json({ message: "Failed to fetch team info" }, { status: 500 });
    }
}

// Fungsi untuk memperbarui data TeamInfo
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const updatedTeamInfo = await prisma.teamInfo.update({
            where: { id: TEAM_INFO_ID },
            data: {
                name: data.name,
                bio: data.bio,
                email: data.email,
                logoUrl: data.logoUrl,
                socials: data.socials,
            },
        });
        revalidatePath('/admin/team-info');
        revalidatePath('/');
        return NextResponse.json(updatedTeamInfo);
    } catch (_error) {
        console.error("API PUT Error:", _error);
        return NextResponse.json({ message: "Failed to update team info" }, { status: 500 });
    }
}