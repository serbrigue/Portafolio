import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Code, Terminal, Cloud, Shield, Users, SearchCheck } from 'lucide-react';

const CertificationCard = ({ cert }) => {
    const iconMap = {
        "Code": Code,
        "Terminal": Terminal,
        "Cloud": Cloud,
        "Shield": Shield,
        "Users": Users,
        "Award": Award,
        "Google": SearchCheck, // Using SearchCheck for Google
        "Python": Terminal,    // Reuse Terminal for Python
        "AWS": Cloud           // Reuse Cloud for AWS
    };

    const IconComponent = iconMap[cert.icon] || Award;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-surface border border-slate-700 rounded-lg p-6 hover:border-tech-neonGreen transition-all group relative overflow-hidden flex flex-col h-full shadow-lg"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <IconComponent size={64} />
            </div>

            <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-mono text-lg font-bold text-white group-hover:text-tech-cyan transition-colors">{cert.title}</h3>
                    <IconComponent size={24} className="text-slate-500 group-hover:text-tech-neonGreen transition-colors shrink-0 ml-2" />
                </div>

                <p className="text-tech-cyan text-sm mb-4 font-mono">{cert.issuer}</p>
                {/* Removed description rendering as it was removed from backend payload to keep cards cleaner */}
            </div>

            <div className="relative z-10 mt-auto pt-4 border-t border-slate-800 flex justify-between items-center bg-slate-900/30 -mx-6 -mb-6 p-4">
                <span className="text-xs text-slate-500 font-mono">{cert.date}</span>

                <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-tech-neonGreen text-black font-bold text-xs px-4 py-2 rounded hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                >
                    <ExternalLink size={14} />
                    VERIFICAR
                </a>
            </div>
        </motion.div>
    );
};

export default CertificationCard;
