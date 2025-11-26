import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopicContent from './components/TopicContent';
import { courseData } from './data';
import confetti from 'canvas-confetti';

function App() {
  // --- STATE MANAGEMENT ---
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('awsMasteryProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Inicialmente desbloqueamos el primer tema del primer módulo
  const [unlockedTopics, setUnlockedTopics] = useState(() => {
    const saved = localStorage.getItem('awsMasteryUnlockedTopics');
    // Si no hay nada guardado, desbloqueamos el ID "1-1"
    return saved ? JSON.parse(saved) : ["1-1"];
  });

  // Inicialmente desbloqueamos el primer módulo
  const [unlockedModules, setUnlockedModules] = useState(() => {
    const saved = localStorage.getItem('awsMasteryUnlockedModules');
    return saved ? JSON.parse(saved) : [1];
  });

  const [activeTopic, setActiveTopic] = useState(courseData[0].topics[0]);

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('awsMasteryProgress', JSON.stringify(progress));
    localStorage.setItem('awsMasteryUnlockedTopics', JSON.stringify(unlockedTopics));
    localStorage.setItem('awsMasteryUnlockedModules', JSON.stringify(unlockedModules));
  }, [progress, unlockedTopics, unlockedModules]);

  // --- CORE LOGIC ---
  const handleQuizComplete = (scorePercentage) => {
    // 1. Guardar el progreso
    const newProgress = { ...progress, [activeTopic.id]: scorePercentage };
    setProgress(newProgress);

    // 2. Si aprobó (100%), calcular qué sigue
    if (scorePercentage === 100) {
      unlockNextContent(activeTopic.id);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  const unlockNextContent = (currentTopicId) => {
    let currentModuleIndex = -1;
    let currentTopicIndex = -1;

    // Buscar índices actuales
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
    
    // ESCENARIO A: Hay más temas en este módulo
    if (currentTopicIndex < currentModule.topics.length - 1) {
      const nextTopicId = currentModule.topics[currentTopicIndex + 1].id;
      if (!unlockedTopics.includes(nextTopicId)) {
        setUnlockedTopics(prev => [...prev, nextTopicId]);
      }
    } 
    // ESCENARIO B: Se acabó el módulo, desbloquear el siguiente módulo
    else if (currentModuleIndex < courseData.length - 1) {
      const nextModuleId = courseData[currentModuleIndex + 1].id;
      const nextModuleFirstTopicId = courseData[currentModuleIndex + 1].topics[0].id;
      
      // Desbloquear módulo
      if (!unlockedModules.includes(nextModuleId)) {
        setUnlockedModules(prev => [...prev, nextModuleId]);
      }
      // Desbloquear primer tema del siguiente módulo
      if (!unlockedTopics.includes(nextModuleFirstTopicId)) {
        setUnlockedTopics(prev => [...prev, nextModuleFirstTopicId]);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar 
        modules={courseData}
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        progress={progress}
        unlockedModules={unlockedModules}
        unlockedTopics={unlockedTopics}
      />
      
      <main className="flex-1 md:ml-80 transition-all duration-300">
        <TopicContent 
          topic={activeTopic}
          onQuizComplete={handleQuizComplete}
        />
      </main>
    </div>
  );
}

export default App;