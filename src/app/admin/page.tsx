// src/app/admin/page.tsx
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
    // Langsung alihkan ke halaman dashboard
    redirect('/admin/dashboard');
}