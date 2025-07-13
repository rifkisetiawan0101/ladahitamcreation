// src/app/arcanum/page.tsx
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
    // Langsung alihkan ke halaman dashboard
    redirect('/arcanum/dashboard');
}