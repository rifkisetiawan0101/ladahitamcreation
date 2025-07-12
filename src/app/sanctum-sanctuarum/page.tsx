// src/app/sanctum-sanctuarum/page.tsx
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
    // Langsung alihkan ke halaman dashboard
    redirect('/sanctum-sanctuarum/dashboard');
}