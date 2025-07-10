import './globals.css';
import { Cinzel_Decorative, Lato, Poppins } from 'next/font/google';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import prisma from '@/lib/prisma';

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-poppins',
});

export const metadata = {
  title: 'LadaHitam Creation',
  description: 'Fantasy-Driven Game Studio',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ambil data teamInfo di sini
  const teamInfo = await prisma.teamInfo.findUnique({
    where: { id: 'ladahitam_info' },
  });
  const logoUrl = teamInfo?.logoUrl || null;

  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${lato.variable} ${poppins.variable} font-poppins bg-neutral-950 text-neutral-300`}>
        <LayoutWrapper logoUrl={logoUrl}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}