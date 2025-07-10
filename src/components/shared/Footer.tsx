// src/components/shared/Footer.tsx

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="border-t border-amber-300/10 bg-neutral-900">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
            <p className="text-xs text-neutral-400">
                &copy; {new Date().getFullYear()} LadaHitam Creation. All Rights Reserved.
            </p>
        </div>
        </footer>
    );
};

export default Footer;