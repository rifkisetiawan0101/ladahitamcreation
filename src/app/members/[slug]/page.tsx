import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type MemberDetailPageProps = {
    params: {
        slug: string;
    };
};

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
    const { slug } = params;
    const member = await prisma.member.findUnique({
        where: { slug },
    });

    if (!member) {
        notFound();
    }

    const screenshotsArray = Array.isArray(member.screenshots) ? member.screenshots : [];

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                {/* Header Profil */}
                <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    <div className="relative h-40 w-40 flex-shrink-0 rounded-full overflow-hidden ring-4 ring-amber-300/50">
                        <Image
                            src={member.pictureUrl || '/default-avatar.png'}
                            alt={`Photo of ${member.name}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-amber-300 text-center md:text-left">
                            {member.name}
                        </h1>
                        <p className="mt-2 text-xl text-neutral-300 text-center md:text-left">
                            {member.role}
                        </p>
                    </div>
                </header>

                {/* Konten Utama (Portofolio) */}
                <article className="prose prose-invert prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: member.content || '' }} />
                </article>

                {/* Galeri Screenshot */}
                {screenshotsArray.length > 0 && (
                    <div className="mt-16">
                        <h2 className="font-display text-3xl text-center text-amber-300 mb-8">
                            Showcase
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {screenshotsArray.map((screenshot, index) => (
                                <div key={index} className="relative w-full aspect-video rounded-md overflow-hidden">
                                    <Image
                                        src={screenshot}
                                        alt={`Showcase ${index + 1} for ${member.name}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}