import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const techColors = {
    Python: "bg-blue-900/50 text-blue-200 border-blue-700",
    Terraform: "bg-purple-900/50 text-purple-200 border-purple-700",
    AWS: "bg-yellow-900/50 text-yellow-200 border-yellow-700",
    React: "bg-cyan-900/50 text-cyan-200 border-cyan-700",
    Flask: "bg-gray-700 text-gray-200 border-gray-600",
    Docker: "bg-blue-600/20 text-blue-300 border-blue-500",
    SQL: "bg-orange-900/50 text-orange-200 border-orange-700",
    Pandas: "bg-indigo-900/50 text-indigo-200 border-indigo-700",
    "CI/CD": "bg-green-900/50 text-green-200 border-green-700"
};

const TechBadge = ({ tech }) => (
    <span className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded border ${techColors[tech] || "bg-gray-700 border-gray-600 text-gray-300"}`}>
        {tech}
    </span>
);

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="shadow-lg"
        >
            <div className="bg-surface p-6 rounded-lg border border-slate-700 hover:border-tech-cyan transition-all h-full flex flex-col group">
                {project.image && (
                    <div className="mb-4 overflow-hidden rounded-md border border-slate-800 relative h-48">
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                )}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-tech-cyan transition-colors">{project.title}</h3>
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <Github size={20} />
                        </a>
                    )}
                </div>

                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech_stack.map(tech => (
                        <TechBadge key={tech} tech={tech} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
