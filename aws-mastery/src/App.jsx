import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopicContent from './components/TopicContent';
import { courseData } from './data';
import confetti from 'canvas-confetti';
import { Menu } from 'lucide-react'; // Importamos el icono de menú

function App() {
  // --- STATE MANAGEMENT ---
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('awsMasteryProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const [unlockedTopics, setUnlockedTopics] = useState(() => {
    const saved = localStorage.getItem('awsMasteryUnlockedTopics');
    return saved ? JSON.parse(saved) : ["1-1"];
  });

  const [unlockedModules, setUnlockedModules] = useState(() => {
    const saved = localStorage.getItem('awsMasteryUnlockedModules');
    return saved ? JSON.parse(saved) : [1];
  });

  const [activeTopic, setActiveTopic] = useState(courseData[0].topics[0]);
  
  // Nuevo estado para controlar el menú en celular
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('awsMasteryProgress', JSON.stringify(progress));
    localStorage.setItem('awsMasteryUnlockedTopics', JSON.stringify(unlockedTopics));
    localStorage.setItem('awsMasteryUnlockedModules', JSON.stringify(unlockedModules));
  }, [progress, unlockedTopics, unlockedModules]);

  // --- CORE LOGIC ---
  const handleQuizComplete = (scorePercentage) => {
    const newProgress = { ...progress, [activeTopic.id]: scorePercentage };
    setProgress(newProgress);

    if (scorePercentage === 100) {
      unlockNextContent(activeTopic.id);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  const unlockNextContent = (currentTopicId) => {
    let currentModuleIndex = -1;
    let currentTopicIndex = -1;

    courseData.forEach((mod, mIdx) => {
      mod.topics.forEach((top, tIdx) => {
        if (top.id === currentTopicId) {
          currentModuleIndex = mIdx;
          currentTopicIndex = tIdx;
        }
      });
    });

    if (currentModuleIndex === -1) return;

    const currentModule = courseData[currentModuleIndex];
    
    if (currentTopicIndex < currentModule.topics.length - 1) {
      const nextTopicId = currentModule.topics[currentTopicIndex + 1].id;
      if (!unlockedTopics.includes(nextTopicId)) {
        setUnlockedTopics(prev => [...prev, nextTopicId]);
      }
    } 
    else if (currentModuleIndex < courseData.length - 1) {
      const nextModuleId = courseData[currentModuleIndex + 1].id;
      const nextModuleFirstTopicId = courseData[currentModuleIndex + 1].topics[0].id;
      
      if (!unlockedModules.includes(nextModuleId)) {
        setUnlockedModules(prev => [...prev, nextModuleId]);
      }
      if (!unlockedTopics.includes(nextModuleFirstTopicId)) {
        setUnlockedTopics(prev => [...prev, nextModuleFirstTopicId]);
      }
    }
  };

  // Función para cerrar el sidebar cuando se elige un tema en mobile
  const handleTopicSelect = (topic) => {
    setActiveTopic(topic);
    setIsSidebarOpen(false); // Cerrar menú automáticamente
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans flex-col md:flex-row">
      
      {/* BARRA SUPERIOR MÓVIL (Solo visible en celular) */}
      <div className="md:hidden bg-aws-dark text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <span className="font-bold text-lg">AWS Mastery</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-700 rounded">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar con lógica responsiva */}
      <Sidebar 
        modules={courseData}
        activeTopic={activeTopic}
        setActiveTopic={handleTopicSelect}
        progress={progress}
        unlockedModules={unlockedModules}
        unlockedTopics={unlockedTopics}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      {/* Overlay para oscurecer el fondo cuando el menú está abierto en móvil */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-80 transition-all duration-300 w-full">
        <TopicContent 
          topic={activeTopic}
          onQuizComplete={handleQuizComplete}
        />
      </main>
    </div>
  );
}

export default App;