import React from 'react';
import { Beaker, BookOpen, ChevronRight } from 'lucide-react';
import Quiz from './Quiz';

const TopicContent = ({ topic, onQuizComplete }) => {
  if (!topic) return <div className="p-10 text-center text-gray-500">Selecciona un tema para comenzar</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 animate-fadeIn">
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="flex items-center text-sm text-aws-blue font-bold uppercase tracking-wider mb-2">
          <BookOpen size={14} className="mr-2" />
          Módulo de Aprendizaje
        </div>
        <h2 className="text-4xl font-extrabold text-aws-dark mb-4">{topic.title}</h2>
      </div>

      {/* Content Body */}
      <div 
        className="prose max-w-none mb-12 text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: topic.content }}
      />

      {/* Lab Section */}
      {topic.lab && (
        <div className="bg-gray-900 text-white p-8 rounded-xl mb-12 shadow-2xl border-l-8 border-aws-orange overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Beaker size={120} />
          </div>
          <div className="flex items-center gap-3 mb-6 text-aws-orange relative z-10">
            <Beaker size={28} />
            <h3 className="text-2xl font-bold">{topic.lab.title}</h3>
          </div>
          <div className="space-y-4 relative z-10">
            {topic.lab.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <span className="bg-aws-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg">
                  {idx + 1}
                </span>
                <p className="text-gray-300 mt-1 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Section */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-300 flex-1"></div>
          <h3 className="text-2xl font-bold text-aws-dark px-4 uppercase tracking-wide">Evaluación</h3>
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