import React from 'react';
import { Beaker, BookOpen } from 'lucide-react';
import Quiz from './Quiz';

const TopicContent = ({ topic, onQuizComplete }) => {
  if (!topic) return <div className="p-10 text-center text-gray-500">Selecciona un tema para comenzar</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-12 animate-fadeIn pb-20">
      {/* Header Responsivo */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center text-xs md:text-sm text-aws-blue font-bold uppercase tracking-wider mb-2">
          <BookOpen size={14} className="mr-2" />
          Módulo de Aprendizaje
        </div>
        {/* Texto ajustado: text-2xl en movil, text-4xl en escritorio */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-aws-dark mb-2 leading-tight">{topic.title}</h2>
      </div>

      {/* Content Body - Ajuste de tablas y overflow */}
      <div 
        className="prose prose-sm md:prose-lg max-w-none mb-10 text-gray-700 leading-relaxed overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: topic.content }}
      />

      {/* Lab Section Responsiva */}
      {topic.lab && (
        <div className="bg-gray-900 text-white p-5 md:p-8 rounded-xl mb-10 shadow-xl border-l-4 md:border-l-8 border-aws-orange overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 hidden md:block">
            <Beaker size={120} />
          </div>
          <div className="flex items-center gap-3 mb-6 text-aws-orange relative z-10">
            <Beaker size={24} />
            <h3 className="text-lg md:text-2xl font-bold">{topic.lab.title}</h3>
          </div>
          <div className="space-y-4 relative z-10">
            {topic.lab.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3 md:gap-4 items-start">
                <span className="bg-aws-blue text-white w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0 shadow-lg mt-1">
                  {idx + 1}
                </span>
                <p className="text-gray-300 mt-0.5 text-sm md:text-base font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Section */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-300 flex-1"></div>
          <h3 className="text-xl md:text-2xl font-bold text-aws-dark px-2 uppercase tracking-wide text-center">
            Evaluación
          </h3>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
        
        <Quiz 
          questions={topic.quiz} 
          onComplete={onQuizComplete} 
          topicId={topic.id}
        />
      </div>
    </div>
  );
};

export default TopicContent;