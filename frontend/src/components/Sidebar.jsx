import React, { useState, useEffect } from 'react';
import { User, Code, Calendar, Award, Terminal, Folder, Zap } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Sidebar = ({ activeSection, setActiveSection }) => {
    const [apiStatus, setApiStatus] = useState('offline');

    useEffect(() => {
        // Simple health check
        fetch('http://localhost:5000/api/v1/profile')
            .then(() => setApiStatus('online'))
            .catch(() => setApiStatus('offline'));
    }, []);

    const navItems = [
        { id: 'profile', label: 'Sobre Mí', icon: User },
        { id: 'strengths', label: 'Fortalezas', icon: Zap },
        { id: 'projects', label: 'Proyectos', icon: Folder },
        { id: 'skills', label: 'Stack', icon: Code },
        { id: 'timeline', label: 'Trayectoria', icon: Calendar },
        { id: 'certifications', label: 'Certificaciones', icon: Award },
    ];

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-slate-700 flex flex-col p-6 z-50"
        >
            <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-slate-600 shadow-lg shadow-tech-cyan/20">
                    <Terminal className="text-tech-cyan" size={24} />
                </div>
                <div>
                    <h1 className="font-mono text-lg font-bold text-white tracking-tight">DevOps.PF</h1>
                    <p className="text-xs text-slate-500 font-mono">v1.2.0</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={clsx(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all font-mono text-sm",
                            activeSection === item.id
                                ? "bg-slate-800 text-tech-cyan border-l-2 border-tech-cyan shadow-md"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                        )}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-auto border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <div className={clsx("w-2 h-2 rounded-full", apiStatus === 'online' ? "bg-tech-neonGreen animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.5)]" : "bg-red-500")} />
                    API Status: {apiStatus.toUpperCase()}
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
