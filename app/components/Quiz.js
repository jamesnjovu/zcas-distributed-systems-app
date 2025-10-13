'use client';

import { useState } from 'react';
import { Trophy, CheckCircle, XCircle, RotateCcw, ArrowLeft, Clock, Target, BookOpen, AlertCircle } from 'lucide-react';
import { quizData } from '../data/quizData1';

export default function Quiz({ unitId, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeStarted] = useState(Date.now());
  const [timeFinished, setTimeFinished] = useState(null);

  const quiz = quizData[unitId];
  
  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Not Available</h2>
          <p className="text-gray-600 mb-6">Quiz for this unit is coming soon!</p>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Unit
          </button>
        </div>
      </div>
    );
  }

  const handleAnswer = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setTimeFinished(Date.now());
    setShowResults(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeFinished(null);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100)
    };
  };

  const getTimeTaken = () => {
    const seconds = Math.floor((timeFinished - timeStarted) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { letter: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { letter: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 70) return { letter: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 60) return { letter: 'D', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { letter: 'F', color: 'text-red-600', bg: 'bg-red-100' };
  };

  if (showResults) {
    const score = calculateScore();
    const grade = getGrade(score.percentage);
    const timeTaken = getTimeTaken();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4">
                <Trophy className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
              <p className="text-xl text-gray-600">{quiz.unitTitle}</p>
            </div>

            {/* Score Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {score.percentage}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>

              <div className={`${grade.bg} rounded-lg p-6 text-center`}>
                <BookOpen className={`w-8 h-8 mx-auto mb-2 ${grade.color}`} />
                <div className={`text-3xl font-bold mb-1 ${grade.color}`}>
                  {grade.letter}
                </div>
                <div className="text-sm text-gray-600">Grade</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {timeTaken}
                </div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>

            {/* Performance Message */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700">
                You got <span className="font-bold text-blue-600">{score.correct}</span> out of{' '}
                <span className="font-bold">{score.total}</span> questions correct!
              </p>
              {score.percentage >= 80 && (
                <p className="text-green-600 font-semibold mt-2">🎉 Excellent work! You&apos;ve mastered this unit!</p>
              )}
              {score.percentage >= 60 && score.percentage < 80 && (
                <p className="text-blue-600 font-semibold mt-2">👍 Good job! Review the missed questions to improve.</p>
              )}
              {score.percentage < 60 && (
                <p className="text-orange-600 font-semibold mt-2">📚 Keep studying! Review the unit materials and try again.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Unit
              </button>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Answers</h2>
            <div className="space-y-6">
              {quiz.questions.map((q, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === q.correct;
                
                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-lg border-2 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-3">
                          Question {index + 1}: {q.question}
                        </div>
                        
                        {/* Options */}
                        <div className="space-y-2 mb-4">
                          {q.options.map((option, optIndex) => {
                            const isUserAnswer = userAnswer === optIndex;
                            const isCorrectAnswer = optIndex === q.correct;
                            
                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg ${
                                  isCorrectAnswer
                                    ? 'bg-green-100 border-2 border-green-400'
                                    : isUserAnswer
                                    ? 'bg-red-100 border-2 border-red-400'
                                    : 'bg-white border border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {isCorrectAnswer && (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                  )}
                                  <span className={`${
                                    isCorrectAnswer ? 'font-semibold text-green-700' :
                                    isUserAnswer ? 'font-semibold text-red-700' :
                                    'text-gray-700'
                                  }`}>
                                    {option}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="font-semibold text-blue-900 mb-2">💡 Explanation:</div>
                          <p className="text-blue-800 text-sm leading-relaxed">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Taking View
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const allAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quiz: {quiz.unitTitle}</h1>
              <p className="text-gray-600">Test your knowledge</p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold mb-4">
              Question {currentQuestion + 1}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`flex-1 ${
                      isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-600">
                {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
              </div>
            </div>

            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trophy className="w-5 h-5" />
                Submit Quiz
              </button>
            )}
          </div>

          {!allAnswered && currentQuestion === quiz.questions.length - 1 && (
            <div className="mt-4 text-center text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              ⚠️ Please answer all questions before submitting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
