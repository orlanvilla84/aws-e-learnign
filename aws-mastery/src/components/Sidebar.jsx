import React from 'react';
import { Lock, CheckCircle, Circle, BookOpen, ShieldCheck, Server, Database, Box, X } from 'lucide-react';

const Sidebar = ({ modules, activeTopic, setActiveTopic, progress, unlockedModules, unlockedTopics, isOpen, setIsOpen }) => {
  
  const getModuleIcon = (id) => {
    switch(id) {
      case 1: return <ShieldCheck size={20} />;
      case 2: return <Server size={20} />;
      case 3: return <Database size={20} />;
      default: return <Box size={20} />;
    }
  };

  return (
    <>
      {/* CORRECCIÓN REALIZADA:
         - Se eliminó "md:static".
         - Ahora el sidebar es "fixed" (fijo) en todos los tamaños.
         - En móvil se oculta con translate, en escritorio (md) siempre se muestra.
         - Esto hace que al bajar (scroll) en el contenido, el menú se quede quieto a la izquierda.
      */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-aws-dark text-white shadow-2xl overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 
      `}>
        
        {/* Header del Sidebar */}
        <div className="p-6 border-b border-gray-700 bg-black bg-opacity-20 flex justify-between items-center sticky top-0 bg-aws-dark z-50">
          <div>
            <h1 className="text-2xl font-extrabold text-aws-orange flex items-center gap-2 tracking-tight">
              <BookOpen className="text-white" /> AWS Mastery
            </h1>
            <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-semibold">Preparación Certificación</p>
          </div>
          {/* Botón cerrar solo visible en móvil */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 pb-20">
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
                        className={`w-full text-left px-3 py-3 rounded-r-md flex items-center justify-between transition-all duration-200 group
                          ${isActive ? 'bg-aws-blue text-white shadow-md border-l-4 border-aws-orange' : 'text-gray-400 hover:bg-aws-light hover:text-white'}
                          ${!isUnlocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        <span className="text-sm font-medium truncate w-4/5 whitespace-normal leading-tight">{topic.title}</span>
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
    </>
  );
};

export default Sidebar;