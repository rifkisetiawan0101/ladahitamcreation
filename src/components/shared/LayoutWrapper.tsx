// src/components/shared/LayoutWrapper.tsx
"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import React from 'react';
import SparkleTrail from '@/components/public/SparkleTrail';
import ParticleBackground from '@/components/public/ParticleBackground';

// Terima props logoUrl
export default function LayoutWrapper({ children, logoUrl }: { 
    children: React.ReactNode;
    logoUrl: string | null;
}) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/admin');

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            {/* Bungkus komponen partikel dengan div ini */}
            <div className="hidden md:block">
                <ParticleBackground />
                <SparkleTrail />
            </div>
            <div className="relative z-10 flex min-h-screen flex-col">
                <Navbar logoUrl={logoUrl} />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </>
    );
}