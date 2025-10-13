'use client';

import { useState } from 'react';
import { BookOpen, Brain, CheckCircle, XCircle, RotateCw, ChevronLeft, ChevronRight, Lightbulb, Award } from 'lucide-react';

// Exam questions extracted from the past paper
import { examQuestions } from '../data/examQuestions';

// Flashcards for quick review
import { flashcards } from '../data/flashCards';


export default function ExamRevision({ onBack }) {
  const [mode, setMode] = useState('menu'); // 'menu', 'exam', 'flashcards'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState(new Set());

  // Exam Practice Mode
  const ExamPractice = () => {
    const question = examQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Question {currentQuestion + 1} of {examQuestions.length}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold flex-shrink-0">
              Q{currentQuestion + 1}
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                {question.unit}
              </div>
              <div className="text-gray-900 text-lg leading-relaxed whitespace-pre-line">
                {question.question}
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 mb-6 border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-900">Key Points to Cover</h3>
            </div>
            <ul className="space-y-2">
              {question.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-amber-800">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Show Answer Button */}
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={`w-full py-4 rounded-lg font-semibold transition-all ${
              showAnswer
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
            }`}
          >
            {showAnswer ? '✓ Answer Shown' : '👁️ Show Model Answer'}
          </button>

          {/* Answer */}
          {showAnswer && (
            <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border-2 border-green-200 animate-fadeIn">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-green-900 text-lg">Model Answer</h3>
              </div>
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {question.answer}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setCurrentQuestion(Math.max(0, currentQuestion - 1));
                setShowAnswer(false);
                window.scrollTo(0, 0);
              }}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{currentQuestion + 1}</div>
              <div className="text-sm text-gray-600">of {examQuestions.length}</div>
            </div>

            <button
              onClick={() => {
                setCurrentQuestion(Math.min(examQuestions.length - 1, currentQuestion + 1));
                setShowAnswer(false);
                window.scrollTo(0, 0);
              }}
              disabled={currentQuestion === examQuestions.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Flashcards Mode
  const FlashcardsMode = () => {
    const card = flashcards[currentCard];
    const progress = ((currentCard + 1) / flashcards.length) * 100;
    const masteredCount = masteredCards.size;

    return (
      <div className="max-w-3xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{currentCard + 1}</div>
            <div className="text-sm text-gray-600">Current Card</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{masteredCount}</div>
            <div className="text-sm text-gray-600">Mastered</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{flashcards.length}</div>
            <div className="text-sm text-gray-600">Total Cards</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-white">
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
                  {card.unit}
                </div>
                <div className="text-3xl font-bold text-center mb-6 leading-relaxed">
                  {card.front}
                </div>
                <div className="text-sm text-white/80 mt-auto">Click to flip</div>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 backface-hidden ${isFlipped ? 'visible' : 'invisible'}`}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-white">
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
                  Answer
                </div>
                <div className="text-xl text-center leading-relaxed">
                  {card.back}
                </div>
                <div className="text-sm text-white/80 mt-auto">Click to flip back</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {isFlipped && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fadeIn">
            <div className="text-center mb-4">
              <p className="text-gray-700 font-semibold">Did you know this?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1));
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Need Review
              </button>
              <button
                onClick={() => {
                  setMasteredCards(prev => new Set([...prev, currentCard]));
                  setIsFlipped(false);
                  setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1));
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                I Know This!
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setCurrentCard(Math.max(0, currentCard - 1));
                setIsFlipped(false);
              }}
              disabled={currentCard === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={() => {
                setMasteredCards(new Set());
                setCurrentCard(0);
                setIsFlipped(false);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
            >
              <RotateCw className="w-5 h-5" />
              Reset Progress
            </button>

            <button
              onClick={() => {
                setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1));
                setIsFlipped(false);
              }}
              disabled={currentCard === flashcards.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main Menu
  const Menu = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
          <Brain className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Exam Revision Center</h1>
        <p className="text-xl text-gray-600">Master your Distributed Systems knowledge</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Exam Practice */}
        <div
          onClick={() => setMode('exam')}
          className="group bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-6 group-hover:scale-110 transition-transform">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Past Exam Questions</h2>
          <p className="text-gray-600 mb-4">
            Practice with real exam questions from December 2024. Includes model answers and key points.
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600 font-semibold">{examQuestions.length} Questions</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Flashcards */}
        <div
          onClick={() => setMode('flashcards')}
          className="group bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-green-500"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 text-white mb-6 group-hover:scale-110 transition-transform">
            <Brain className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Review Flashcards</h2>
          <p className="text-gray-600 mb-4">
            Master key concepts with interactive flashcards. Perfect for quick review sessions.
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-semibold">{flashcards.length} Cards</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 border-2 border-amber-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500 rounded-xl">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-900 mb-3">Study Tips</h3>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Practice regularly:</strong> Review flashcards daily for 10-15 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Write out answers:</strong> Practice writing full answers to exam questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Focus on key points:</strong> Each question has key concepts to cover</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Time yourself:</strong> Practice answering in exam conditions (3 hours for 4 questions)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .backface-hidden {
          backfaceVisibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {mode !== 'menu' && (
        <button
          onClick={() => {
            setMode('menu');
            setShowAnswer(false);
            setIsFlipped(false);
          }}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Menu
        </button>
      )}

      {onBack && mode === 'menu' && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </button>
      )}

      {mode === 'menu' && <Menu />}
      {mode === 'exam' && <ExamPractice />}
      {mode === 'flashcards' && <FlashcardsMode />}
    </div>
  );
}