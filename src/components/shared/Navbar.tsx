// src/components/shared/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
    { name: 'Projects', href: '/#projects' },
    { name: 'Members', href: '/#members' },
    { name: 'Achievements', href: '/#achievements' },
];

type NavbarProps = {
    logoUrl: string | null;
};

const Navbar = ({ logoUrl }: NavbarProps) => {
    return (
        <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center">
                {logoUrl ? (
                    // Jika ada logo, tampilkan gambar
                    <Image
                        src={logoUrl}
                        alt="LadaHitam Creation Logo"
                        height={110}
                        width={50} // Sesuaikan ukurannya
                        className="object-contain"
                        priority
                    />
                ) : (
                    // Jika tidak ada, tampilkan teks
                    <span className="font-display text-2xl font-bold text-amber-300">
                        LadaHitam Creation
                    </span>
                )}
                </Link>

                <nav>
                    <ul className="flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                href={link.href}
                                className="font-semibold text-sm text-neutral-300 transition-colors hover:text-amber-300"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;