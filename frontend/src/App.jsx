import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContentSection from './components/ContentSection';
import { ToggleLeft, ToggleRight } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isJsonMode, setIsJsonMode] = useState(false);

  return (
    <div className="min-h-screen bg-background text-white flex font-sans">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 ml-64 p-12">
        <header className="flex justify-between items-center mb-16 sticky top-0 bg-background/95 backdrop-blur-sm z-50 py-4 border-b border-gray-800/50 -mx-12 px-12 top-0 transition-all duration-300 shadow-md">
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

        <div className="min-h-[500px] pt-8">
          {/* Key prop ensures component remounts when section changes, clearing old state */}
          <ContentSection
            key={activeSection}
            section={activeSection}
            isJsonMode={isJsonMode}
            setIsJsonMode={setIsJsonMode}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
