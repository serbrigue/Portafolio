import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="border border-slate-700 p-6 rounded-md shadow bg-slate-800 animate-pulse">
            <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div> {/* Title */}
            <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded"></div> {/* Text line */}
                <div className="h-4 bg-slate-700 rounded w-5/6"></div> {/* Text line */}
            </div>
        </div>
    );
};

export default SkeletonCard;
