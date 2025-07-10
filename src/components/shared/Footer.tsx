// src/components/shared/Footer.tsx

import Link from 'next/link';

// Anda bisa membuat komponen Ikon SVG terpisah nanti untuk ini
const SocialLinks = () => (
    <div className="flex space-x-4">
        <Link href="#" className="text-neutral-400 hover:text-amber-300">
        {/* Ganti dengan Ikon Itch.io */}
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="..."/></svg>
        </Link>
        <Link href="#" className="text-neutral-400 hover:text-amber-300">
        {/* Ganti dengan Ikon Instagram */}
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="..."/></svg>
        </Link>
        <Link href="#" className="text-neutral-400 hover:text-amber-300">
        {/* Ganti dengan Ikon LinkedIn */}
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="..."/></svg>
        </Link>
    </div>
);


const Footer = () => {
    return (
        <footer className="border-t border-amber-300/10 bg-neutral-900">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
            <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} LadaHitam Creation. All Rights Reserved.
            </p>
            
            {/* Untuk saat ini kita beri placeholder, nanti kita bisa ambil dari database */}
            {/* <SocialLinks /> */}
        </div>
        </footer>
    );
};

export default Footer;