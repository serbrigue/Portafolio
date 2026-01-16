import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Server, Cpu, Shuffle, Cloud, ShieldCheck } from 'lucide-react';

const ProjectDetail = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden relative"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-slate-800 p-6 border-b border-slate-700 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white font-mono mb-2">{project.title}</h2>
                            <div className="flex gap-4">
                                {project.repo_url && (
                                    <a href={project.repo_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-tech-cyan text-sm hover:underline">
                                        <Github size={16} /> Repository
                                    </a>
                                )}
                                {project.demo_url && (
                                    <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-tech-green text-sm hover:underline">
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-700 p-2 rounded-full">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8 max-h-[70vh] overflow-y-auto">

                        {project.image && (
                            <div className="mb-8 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
                                <img src={project.image} alt={project.title} className="w-full h-64 object-cover object-center" />
                            </div>
                        )}

                        {/* Context/Mission */}
                        <div className="mb-8">
                            <h3 className="text-tech-purple font-mono uppercase tracking-widest text-sm mb-4">Case Study</h3>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {project.details?.mission || project.details?.challenge || project.details?.objective || project.details?.problem}
                            </p>
                            {project.details?.solution && (
                                <p className="text-slate-300 leading-relaxed text-lg mt-4 border-l-4 border-tech-green pl-4">
                                    {project.details.solution}
                                </p>
                            )}
                        </div>

                        {/* Architecture/Solution */}
                        {project.details?.architecture && (
                            <div className="mb-8 bg-surface p-6 rounded-lg border border-slate-700">
                                <h3 className="flex items-center gap-2 text-white font-bold mb-2">
                                    <Server size={20} className="text-tech-cyan" /> Architecture
                                </h3>
                                <p className="text-slate-400">{project.details.architecture || project.details.pipeline}</p>
                            </div>
                        )}

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {project.details?.highlights?.map((highlight, idx) => (
                                <div key={idx} className="bg-slate-800/50 p-5 rounded border border-slate-700/50 hover:border-slate-500 transition-colors">
                                    <h4 className="text-tech-yellow font-mono font-bold text-sm mb-2">{highlight.title}</h4>
                                    <p className="text-sm text-slate-400">{highlight.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-slate-500 font-mono text-xs uppercase mb-3">Technology Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.map(tech => (
                                    <span key={tech} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs border border-slate-600 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectDetail;
