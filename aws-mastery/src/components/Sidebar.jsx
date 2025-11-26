import React from 'react';
import { Lock, CheckCircle, Circle, BookOpen, ShieldCheck, Server, Database, Box } from 'lucide-react';

const Sidebar = ({ modules, activeTopic, setActiveTopic, progress, unlockedModules, unlockedTopics }) => {
  
  const getModuleIcon = (id) => {
    switch(id) {
      case 1: return <ShieldCheck size={20} />;
      case 2: return <Server size={20} />;
      case 3: return <Database size={20} />;
      default: return <Box size={20} />;
    }
  };

  return (
    <div className="w-full md:w-80 bg-aws-dark text-white h-screen overflow-y-auto fixed left-0 top-0 shadow-2xl z-20">
      <div className="p-6 border-b border-gray-700 bg-black bg-opacity-20">
        <h1 className="text-2xl font-extrabold text-aws-orange flex items-center gap-2 tracking-tight">
          <BookOpen className="text-white" /> AWS Mastery
        </h1>
        <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-semibold">Preparación Certificación</p>
      </div>

      <div className="p-4">
        {modules.map((module) => {
          const isModuleUnlocked = unlockedModules.includes(module.id);
          
          return (
            <div key={module.id} className={`mb-8 ${!isModuleUnlocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
              <div className="flex items-center gap-2 text-aws-orange font-bold mb-3 px-2 uppercase text-xs tracking-wider">
                {getModuleIcon(module.id)}
                <span>{module.title}</span>
                {!isModuleUnlocked && <Lock size={14} className="ml-auto text-gray-500" />}
              </div>
              
              <div className="space-y-1 pl-2 border-l-2 border-gray-700 ml-2">
                {module.topics.map((topic) => {
                  const isUnlocked = unlockedTopics.includes(topic.id);
                  const isCompleted = progress[topic.id] === 100;
                  const isActive = activeTopic?.id === topic.id;

                  return (
                    <button
                      key={topic.id}
                      onClick={() => isUnlocked && setActiveTopic(topic)}
                      disabled={!isUnlocked}
                      className={`w-full text-left px-3 py-2 rounded-r-md flex items-center justify-between transition-all duration-200 group
                        ${isActive ? 'bg-aws-blue text-white shadow-md border-l-4 border-aws-orange' : 'text-gray-400 hover:bg-aws-light hover:text-white'}
                        ${!isUnlocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <span className="text-sm font-medium truncate w-4/5">{topic.title}</span>
                      <div className="w-1/5 flex justify-end">
                        {!isUnlocked ? (
                          <Lock size={12} className="text-gray-600" />
                        ) : isCompleted ? (
                          <CheckCircle size={14} className="text-green-400" />
                        ) : (
                          <Circle size={12} className="text-gray-500 group-hover:text-white" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;