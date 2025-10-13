'use client';

import React, { useState } from 'react';
import HomePage from './components/HomePage';
import UnitView from './components/UnitView';
import Quiz from './components/Quiz';
import useSpeech from './hooks/useSpeech';
import { courseData } from './data/courseData';

// Set up PDF worker for react-pdf (only on client side)
if (typeof window !== 'undefined') {
  import('react-pdf').then((pdfjs) => {
    pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.mjs`;
  });
}

export default function DistributedSystemsApp() {
  // View state - 'home', 'unit', or 'quiz'
  const [currentView, setCurrentView] = useState('home');
  const [currentUnit, setCurrentUnit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Progress state
  const [completedUnits, setCompletedUnits] = useState(new Set());

  // Custom hook for speech functionality
  const {
    isSpeaking,
    isPaused,
    speechSupported,
    speakText,
    stopSpeaking,
    togglePauseSpeech,
    speakUnit
  } = useSpeech();

  // Filter units based on search query
  const filteredUnits = courseData.units.filter(unit => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      unit.title.toLowerCase().includes(query) ||
      unit.summary.toLowerCase().includes(query) ||
      unit.topics.some(topic =>
        topic.title.toLowerCase().includes(query) ||
        topic.summary.toLowerCase().includes(query)
      ) ||
      unit.exercises.some(ex =>
        ex.q.toLowerCase().includes(query) ||
        ex.a.toLowerCase().includes(query)
      )
    );
  });

  // Event handlers
  const handleUnitSelect = (unit) => {
    setCurrentUnit(unit);
    setCurrentView('unit');
    window.scrollTo(0, 0);
  };

  const handleStartQuiz = (unit) => {
    setCurrentUnit(unit);
    setCurrentView('quiz');
    stopSpeaking(); // Stop any audio when starting quiz
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentView('home');
    setCurrentUnit(null);
  };

  const handleBackToUnit = () => {
    setCurrentView('unit');
  };

  const handleNavigate = (unit) => {
    setCurrentUnit(unit);
  };

  const markUnitComplete = (unitId) => {
    setCompletedUnits(prev => new Set([...prev, unitId]));
  };

  return (
    <div className="font-sans">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      {currentView === 'home' && (
        <HomePage
          courseData={courseData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredUnits={filteredUnits}
          completedUnits={completedUnits}
          onUnitSelect={handleUnitSelect}
        />
      )}

      {currentView === 'unit' && (
        <UnitView
          unit={currentUnit}
          courseData={courseData}
          completedUnits={completedUnits}
          markUnitComplete={markUnitComplete}
          onBack={handleBack}
          onNavigate={handleNavigate}
          onStartQuiz={handleStartQuiz}
          speechSupported={speechSupported}
          isSpeaking={isSpeaking}
          isPaused={isPaused}
          speakUnit={speakUnit}
          togglePauseSpeech={togglePauseSpeech}
          stopSpeaking={stopSpeaking}
          speakText={speakText}
        />
      )}

      {currentView === 'quiz' && (
        <Quiz
          unitId={currentUnit.id}
          onBack={handleBackToUnit}
        />
      )}
    </div>
  );
}