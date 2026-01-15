import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';

const CertificationCard = ({ cert }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-surface border border-gray-800 rounded-lg p-6 hover:border-tech-neonGreen transition-all group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award size={64} />
            </div>

            <div className="relative z-10">
                <h3 className="font-mono text-xl font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{cert.issuer} • {cert.date}</p>

                <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-tech-neonGreen hover:text-white transition-colors text-sm font-mono border border-tech-neonGreen hover:bg-tech-neonGreen hover:bg-opacity-10 px-3 py-1 rounded"
                >
                    <ExternalLink size={14} />
                    Ver Credencial
                </a>
            </div>
        </motion.div>
    );
};

export default CertificationCard;
