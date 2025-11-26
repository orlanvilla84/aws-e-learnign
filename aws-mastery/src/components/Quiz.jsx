import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

const Quiz = ({ questions, onComplete, topicId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0); // Contador de aciertos
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Reiniciar cuando cambia el tema
  useEffect(() => {
    resetQuiz();
  }, [topicId]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowFeedback(false);
    setQuizFinished(false);
  };

  const handleOptionSelect = (index) => {
    if (showFeedback) return;
    
    const correct = index === questions[currentQuestion].correct;
    setSelectedOption(index);
    setIsCorrect(correct);
    setShowFeedback(true);

    // Actualizamos el score en tiempo real solo si es correcto
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      // Siguiente pregunta
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      // Fin del quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    // Cálculo final seguro
    // Nota: 'score' ya tiene los aciertos acumulados
    const finalPercentage = Math.round((score / questions.length) * 100);
    onComplete(finalPercentage);
  };

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-aws-blue animate-fade-in">
        <h3 className="text-2xl font-bold mb-4 text-aws-dark">Resultados de la Evaluación</h3>
        
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className={`text-6xl font-extrabold ${percentage === 100 ? 'text-green-500' : 'text-aws-orange'}`}>
            {percentage}%
          </div>
        </div>

        <p className="text-gray-600 mb-8 text-lg">
          {percentage === 100 
            ? "¡Excelente! Has dominado los conceptos clave de este tema. El siguiente nivel ha sido desbloqueado." 
            : "Para avanzar, necesitas dominar todos los conceptos (100%). Revisa el material e inténtalo de nuevo."}
        </p>
        
        <button 
          onClick={() => { resetQuiz(); setScore(0); }} // Force score reset 
          className="flex items-center justify-center gap-2 mx-auto bg-aws-dark text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-bold shadow-lg"
        >
          <RotateCcw size={18} /> Intentar de nuevo
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-aws-orange">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-aws-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Pregunta {currentQuestion + 1} de {questions.length}
        </span>
        <span className="text-xs text-gray-400 font-mono">AWS CERTIFIED CLOUD PRACTITIONER</span>
      </div>
      
      <p className="text-xl mb-8 text-gray-800 font-medium leading-relaxed">{question.question}</p>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between group
              ${showFeedback 
                ? index === question.correct 
                  ? 'border-green-500 bg-green-50 ring-1 ring-green-500' 
                  : index === selectedOption 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-100 opacity-50'
                : selectedOption === index 
                  ? 'border-aws-blue bg-blue-50' 
                  : 'border-gray-200 hover:border-aws-orange hover:bg-orange-50'}
            `}
          >
            <span className="font-medium text-gray-700 group-hover:text-gray-900">{option}</span>
            {showFeedback && index === question.correct && <CheckCircle className="text-green-500 flex-shrink-0 ml-2" size={20} />}
            {showFeedback && index === selectedOption && index !== question.correct && <XCircle className="text-red-500 flex-shrink-0 ml-2" size={20} />}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`mt-6 p-5 rounded-lg border animate-fade-in-up ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-start gap-3">
            {isCorrect ? <CheckCircle className="text-green-700 mt-1 flex-shrink-0" /> : <AlertCircle className="text-red-700 mt-1 flex-shrink-0" />}
            <div>
              <h4 className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '¡Correcto!' : 'Respuesta Incorrecta'}
              </h4>
              <div className="text-gray-700 mt-2 text-sm leading-relaxed bg-white p-3 rounded border border-gray-100 shadow-sm">
                <strong>Explicación:</strong> {question.explanation}
                {question.source && (
                  <div className="mt-2 text-xs text-gray-500 border-t pt-1">
                    Fuente PDF: {question.source}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={nextQuestion}
            className="mt-4 w-full bg-aws-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-bold shadow-md flex justify-center items-center"
          >
            {currentQuestion < questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultados Finales"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;