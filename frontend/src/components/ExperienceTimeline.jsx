import React from 'react';
import { motion } from 'framer-motion';

const ExperienceTimeline = ({ items }) => {
    return (
        <div className="max-w-3xl mx-auto space-y-8 pl-4 border-l-2 border-gray-800">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8"
                >
                    {/* Dot */}
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-surface border-2 border-tech-cyan" />

                    <div className="bg-surface border border-gray-800 p-6 rounded-lg hover:border-tech-cyan transition-colors">
                        <span className="text-tech-cyan font-mono text-sm block mb-1">{item.year}</span>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed font-light">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ExperienceTimeline;
