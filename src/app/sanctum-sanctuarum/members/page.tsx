// src/app/sanctum-sanctuarum/members/page.tsx

import prisma from '@/lib/prisma';
import Link from 'next/link';
import MemberActionButtons from '@/components/sanctum-sanctuarum/MemberActionButtons';

export default async function AdminMembersPage() {
    const members = await prisma.member.findMany({
        orderBy: { id: 'desc' },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-4xl text-amber-300">Manage Members</h1>
                <Link 
                    href="/sanctum-sanctuarum/members/new" 
                    className="bg-amber-300 text-neutral-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400"
                >
                    + Add New Member
                </Link>
            </div>

            {/* member list */}
            <div className="rounded-lg border border-neutral-700 bg-neutral-900">
                <ul>
                    {members.map((member, index) => (
                        <li key={member.id} className={`flex items-center justify-between p-4 ${index < members.length - 1 ? 'border-b border-neutral-700' : ''}`}>
                            <span className="text-lg">{member.name} - <em className="text-neutral-400">{member.role}</em></span>
                            <MemberActionButtons memberSlug={member.slug} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}