import prisma from '@/lib/prisma';
import ProjectCard from '@/components/public/ProjectCard';
import CopyEmailButton from '@/components/public/CopyEmailButton';
import SocialLinks from '@/components/public/SocialLinks';
import { ArrowDownCircle } from 'lucide-react';
import MemberCard from '@/components/public/MemberCard';
import AchievementItem from '@/components/public/AchievementItem';

export default async function HomePage() {
    const teamInfo = await prisma.teamInfo.findUnique({ where: { id: 'ladahitam_info' } });
    const projects = await prisma.project.findMany({ take: 3, orderBy: { id: 'desc' } });
    const members = await prisma.member.findMany({ orderBy: { id: 'asc' } });
    const achievements = await prisma.achievement.findMany({ take: 4, orderBy: { id: 'desc' } });

    if (!teamInfo) {
        return <div>Informasi tim tidak ditemukan</div>;
    }
    
    const socials = teamInfo.socials as { linkedin?: string; itch?: string; instagram?: string };

    return (
        <div className="container relative mx-auto px-4">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="font-display text-3xl md:text-6xl font-bold text-amber-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {teamInfo.name}
            </h1>
            <p className="mt-6 max-w-2xl text-sm md:text-lg text-neutral-300">
                {teamInfo.bio}
            </p>
            
            <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center text-neutral-300">
                    <span>{teamInfo.email}</span>
                    <CopyEmailButton email={teamInfo.email} />
                </div>
                <SocialLinks socials={socials} />
            </div>
            
            <div className="mt-8">
                <a
                    href="#projects"
                    className="inline-flex items-center gap-2 bg-amber-400 text-sm text-neutral-800 font-bold py-3 px-5 rounded-md hover:bg-amber-500 transition-colors duration-300 shadow-lg shadow-amber-500/20 animate-pulse-glow"
                >
                    See Our Works
                    <ArrowDownCircle className="h-5 animate-bounce" />
                </a>
            </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="py-20">
            <h2 className="font-display text-4xl text-center text-amber-300 mb-12">
                Featured Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>

        {/* Members Section */}
        <section id="members" className="py-20 border-t border-neutral-800">
            <h2 className="font-display text-4xl text-center text-amber-300 mb-12">
            The Guild
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
                {members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </section>
        
        {/* Achievements Section */}
        <section id="achievements" className="py-20 border-t border-neutral-800">
            <h2 className="font-display text-4xl text-center text-amber-300 mb-12">
            Hall of Fame
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                {achievements.map((achievement) => (
                    <AchievementItem key={achievement.id} achievement={achievement} />
                ))}
            </div>
        </section>
        </div>
    );
}