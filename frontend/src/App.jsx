import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import JsonViewer from './components/JsonViewer';
import TechBadge from './components/TechBadge';
import ExperienceTimeline from './components/ExperienceTimeline';
import CertificationCard from './components/CertificationCard';
import useFetchData from './hooks/useFetchData';
import { ToggleLeft, ToggleRight, Loader } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isJsonMode, setIsJsonMode] = useState(false);

  const { data, loading, error } = useFetchData(`/api/v1/${activeSection}`);

  const renderContent = () => {
    if (loading) return (
      <div className="flex h-full items-center justify-center">
        <Loader className="animate-spin text-tech-cyan" size={48} />
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
    switch (activeSection) {
      case 'profile':
        return (
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              {data.name}
            </h1>
            <h2 className="text-2xl text-tech-cyan font-mono mb-8">{data.role}</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8 border-l-4 border-tech-cyan pl-6">
              {data.summary || "Building the cloud, one container at a time."}
            </p>
            <div className="grid grid-cols-2 gap-4 font-mono text-sm">
              <div className="bg-surface p-4 rounded border border-gray-800">
                <span className="text-gray-500 block mb-1">Location</span>
                {data.location}
              </div>
              <div className="bg-surface p-4 rounded border border-gray-800">
                <span className="text-gray-500 block mb-1">Availability</span>
                <span className="text-tech-neonGreen">● {data.availability}</span>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            {Object.entries(data).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-xl font-mono text-gray-400 mb-4 capitalize border-b border-gray-800 pb-2">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map(skill => (
                    <TechBadge key={skill} name={skill} category={category} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'timeline':
        return <ExperienceTimeline items={data} />;

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

  return (
    <div className="min-h-screen bg-background text-white flex font-sans">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 ml-64 p-12">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Section: <span className="text-tech-cyan">{activeSection}</span>
            </h2>
          </div>

          <button
            onClick={() => setIsJsonMode(!isJsonMode)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-gray-700 hover:border-tech-cyan transition-colors"
          >
            <span className={`text-xs font-mono ${!isJsonMode ? 'text-white' : 'text-gray-500'}`}>UI VIEW</span>
            {isJsonMode ? <ToggleRight className="text-tech-cyan" size={24} /> : <ToggleLeft className="text-gray-500" size={24} />}
            <span className={`text-xs font-mono ${isJsonMode ? 'text-white' : 'text-gray-500'}`}>JSON VIEW</span>
          </button>
        </header>

        <div className="min-h-[500px]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
