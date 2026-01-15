import React from 'react';
import { motion } from 'framer-motion';

const TechBadge = ({ name, category }) => {
    const getBorderColor = (cat) => {
        switch (cat) {
            case 'frontend': return 'border-tech-yellow';
            case 'backend': return 'border-tech-cyan';
            case 'devops': return 'border-tech-neonGreen';
            default: return 'border-gray-700';
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 bg-surface rounded border ${getBorderColor(category)} bg-opacity-50 flex items-center justify-center`}
        >
            <span className="font-mono text-sm font-medium text-gray-200">{name}</span>
        </motion.div>
    );
};

export default TechBadge;
