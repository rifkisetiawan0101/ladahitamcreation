// src/app/sanctum-sanctuarum/members/new/page.tsx
import MemberForm from '@/components/sanctum-sanctuarum/MemberForm';

export default function NewMemberPage() {
    return (
        <div>
            <h1 className="font-display text-4xl text-amber-300 mb-8">Add New Member</h1>
            <MemberForm />
        </div>
    );
}