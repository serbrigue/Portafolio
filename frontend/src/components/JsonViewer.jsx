import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JsonViewer = ({ data, isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full bg-[#1e1e1e] p-6 rounded-lg border border-gray-800 font-mono text-sm overflow-x-auto shadow-2xl"
                >
                    <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
                        <span className="text-gray-500">// Response from Flask API</span>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                    </div>
                    <pre className="text-tech-cyan">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default JsonViewer;
