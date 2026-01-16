import React, { useState } from 'react';
import JsonViewer from './JsonViewer';
import ExperienceTimeline from './ExperienceTimeline';
import CertificationCard from './CertificationCard';
import ProjectCard from './ProjectCard';
import SkeletonCard from './SkeletonCard';
import HeroTerminal from './HeroTerminal';
import ProjectDetail from './ProjectDetail';
import useFetchData from '../hooks/useFetchData';
import { Loader, BrainCircuit, SearchCheck, Bot, ShieldAlert, ShieldCheck, Infinity, Network, FileDown, Rocket, Book, Code, Terminal, Cloud, Server, Cpu, Zap } from 'lucide-react';

const ContentSection = ({ section, isJsonMode, setIsJsonMode }) => {
    const { data, loading, error } = useFetchData(`/api/v1/${section}`);
    const [selectedProject, setSelectedProject] = useState(null);

    // Special case for Profile (Home) - Show HeroTerminal
    const isProfile = section === 'profile';

    // Icon map for Strengths
    const iconMap = {
        "BrainCircuit": BrainCircuit,
        "SearchCheck": SearchCheck,
        "Bot": Bot,
        "ShieldAlert": ShieldAlert,
        "ShieldCheck": ShieldCheck,
        "Infinity": Infinity,
        "Network": Network,
        "Server": Server,
        "Cpu": Cpu,
        "Zap": Zap
    };

    if (loading) return (
        <div className="min-h-[400px]">
            {isProfile && <div className="h-64 mb-12 bg-slate-800/50 animate-pulse rounded-lg border border-slate-700"></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 font-mono border border-red-900 p-4 rounded bg-red-900/20">
            Error loading data: {error.message}. Is Backend running?
        </div>
    );

    if (isJsonMode) {
        return <JsonViewer data={data} isVisible={true} />;
    }

    // UI Mode Rendering
    switch (section) {
        case 'profile':
            return (
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <HeroTerminal />

                    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 mb-12 w-full">
                        <div className="flex-1 text-center md:text-right">
                            <h1 className="text-5xl font-bold mb-3 text-white tracking-tight">
                                {data.name}
                            </h1>
                            <h2 className="text-2xl text-tech-cyan font-mono">{data.title}</h2>
                        </div>

                        {data.image && (
                            <div className="shrink-0 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-tech-cyan to-tech-purple rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <img src={data.image} alt={data.name} className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-slate-800 object-cover shadow-2xl" />
                            </div>
                        )}
                    </div>

                    <div className="bg-surface p-8 rounded-2xl border border-slate-700 shadow-xl mb-12 w-full max-w-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-tech-purple/10 rounded-bl-full -mr-4 -mt-4"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-tech-cyan/10 rounded-tr-full -ml-4 -mb-4"></div>
                        <p className="text-lg text-slate-300 leading-relaxed font-light relative z-10">
                            {data.summary}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm mb-12 w-full max-w-2xl">
                        <div className="bg-surface p-4 rounded-lg border border-slate-700 text-center hover:border-tech-cyan transition-colors">
                            <span className="text-slate-500 block mb-1 uppercase text-xs tracking-wider">Location</span>
                            <span className="text-white font-medium">{data.location}</span>
                        </div>
                        <div className="bg-surface p-4 rounded-lg border border-slate-700 text-center hover:border-tech-green transition-colors">
                            <span className="text-slate-500 block mb-1 uppercase text-xs tracking-wider">Availability</span>
                            <span className="text-tech-neonGreen font-bold flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-tech-neonGreen animate-pulse"></span>
                                {data.availability}
                            </span>
                        </div>
                    </div>

                    {data.cv_url && (
                        <div className="mb-8">
                            <a
                                href={data.cv_url}
                                download="CV_Sergio_Briones.pdf"
                                className="group relative inline-flex items-center gap-3 px-8 py-3 bg-surface border border-tech-cyan text-tech-cyan font-mono text-sm tracking-wide rounded hover:bg-tech-cyan hover:text-surface transition-all duration-300 shadow-[0_0_15px_rgba(6,_182,_212,_0.2)] hover:shadow-[0_0_25px_rgba(6,_182,_212,_0.5)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2 font-bold">
                                    <FileDown className="w-5 h-5 group-hover:animate-bounce" />
                                    DESCARGAR CV
                                </span>
                                <div className="absolute inset-0 bg-tech-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
                            </a>
                        </div>
                    )}

                    {data.social_links && (
                        <div className="flex gap-6">
                            {Object.entries(data.social_links).map(([platform, url]) => (
                                <a
                                    key={platform}
                                    href={url.startsWith('http') ? url : `https://${url}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-400 hover:text-white transition-all transform hover:-translate-y-1 capitalize px-4 py-2 rounded-full border border-slate-700 hover:border-tech-cyan hover:bg-slate-800"
                                >
                                    {platform}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            );

        case 'strengths':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.map(strength => {
                        const IconComponent = iconMap[strength.icon] || Bot;
                        return (
                            <div key={strength.id} className="bg-surface p-6 rounded-lg border border-slate-700 hover:border-tech-purple transition-all group">
                                <div className="mb-4 text-tech-cyan group-hover:text-tech-purple transition-colors">
                                    <IconComponent size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{strength.title}</h3>
                                <p className="text-slate-400">{strength.description}</p>
                            </div>
                        );
                    })}
                </div>
            );

        case 'skills':
            // Progress bar component helper
            const getProgressWidth = (level) => {
                if (level.includes("Avanzado")) return 'w-[90%]';
                if (level.includes("Intermedio")) return 'w-[60%]';
                if (level.includes("Competente")) return 'w-[50%]';
                if (level.includes("Básico")) return 'w-[30%]';
                return 'w-[40%]';
            };

            const getColorClass = (color) => {
                const map = {
                    blue: 'bg-blue-500',
                    green: 'bg-green-500',
                    indigo: 'bg-indigo-500',
                    gray: 'bg-gray-500',
                    purple: 'bg-purple-500',
                    yellow: 'bg-yellow-500',
                    red: 'bg-red-500',
                    orange: 'bg-orange-500',
                    cyan: 'bg-cyan-500',
                    teal: 'bg-teal-500',
                    pink: 'bg-pink-500',
                    black: 'bg-slate-900 border border-slate-600'
                };
                return map[color] || 'bg-slate-500';
            };

            return (
                <div className="space-y-12">
                    {Object.entries(data).map(([category, skills]) => (
                        <div key={category}>
                            <h3 className="text-xl font-mono text-slate-400 mb-6 capitalize border-b border-slate-800 pb-2">{category.replace('_', ' ')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="bg-surface p-4 rounded border border-slate-700">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-white">{skill.name}</span>
                                            <span className="text-xs text-slate-400 font-mono">{skill.level}</span>
                                        </div>
                                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                                            <div className={`h-full ${getColorClass(skill.color)} ${getProgressWidth(skill.level)} rounded-full`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );

        case 'projects':
            return (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.map(project => (
                            <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                    {selectedProject && (
                        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
                    )}
                </>
            );

        case 'timeline':
            return (
                <div className="max-w-4xl mx-auto space-y-12 pl-4 md:pl-0 border-l-2 border-slate-800 ml-4 md:ml-auto md:border-l-0 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800 md:left-1/2 md:-ml-[1px]"></div>
                    {data.map((item, index) => {
                        const timelineIconMap = {
                            "Rocket": Rocket,
                            "Book": Book,
                            "Code": Code,
                            "Terminal": Terminal,
                            "Cloud": Cloud
                        };
                        const IconComponent = timelineIconMap[item.icon] || Rocket;
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className={`relative pl-8 md:pl-0 flex flex-col md:flex-row md:items-center justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                {/* Center Line Marker */}
                                <div className="absolute left-[9px] top-0 p-2 bg-background border-2 border-slate-700 rounded-full text-tech-cyan z-10 md:left-1/2 md:-ml-[21px] md:-mt-2 shadow-xl">
                                    <IconComponent size={20} />
                                </div>

                                {/* Spacer for the other side */}
                                <div className="hidden md:block w-5/12"></div>

                                {/* Content Card */}
                                <div className="w-full md:w-5/12 bg-surface border border-slate-800 p-6 rounded-xl hover:border-tech-cyan transition-all group shadow-lg relative">
                                    {/* Connector Line (Desktop) */}
                                    <div className={`hidden md:block absolute top-6 h-0.5 w-6 bg-slate-700 ${isEven ? '-left-6' : '-right-6'}`}></div>

                                    <div className="flex flex-col mb-2 gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-tech-cyan font-mono text-sm font-bold bg-tech-cyan/10 px-3 py-1 rounded-full w-fit">
                                                {item.year}
                                            </span>
                                            <span className={`text-xs font-mono px-2 py-1 rounded border uppercase w-fit ${item.type === 'autodidact'
                                                ? 'bg-purple-900/30 text-purple-400 border-purple-800'
                                                : 'bg-emerald-900/30 text-emerald-400 border-emerald-800'
                                                }`}>
                                                {item.type === 'autodidact' ? 'Autodidacta' : 'Formal'}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-tech-cyan transition-colors">{item.title}</h3>
                                    <h4 className="text-md text-slate-400 mb-4 font-medium flex items-center gap-2">
                                        {item.institution}
                                    </h4>

                                    <p className="text-slate-300 leading-relaxed font-light text-sm mb-6 border-l-2 border-slate-700 pl-4 italic">
                                        "{item.description}"
                                    </p>

                                    {item.tech_tags && (
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                                            {item.tech_tags.map(tag => (
                                                <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-slate-900 text-slate-500 border border-slate-800 hover:text-white hover:border-slate-600 transition-colors cursor-default">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );

        case 'certifications':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.map(cert => (
                        <CertificationCard key={cert.id} cert={cert} />
                    ))}
                </div>
            );

        default:
            return <div>Select a section</div>;
    }
};

export default ContentSection;
