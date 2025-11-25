'use client';

import React from 'react';
import HomePage from './components/HomePage';
import UnitView from './components/UnitView';
import Quiz from './components/Quiz';
import ExamRevision from './components/ExamRevision';
import useSpeech from './hooks/useSpeech';
import { courseData } from './data/courseData';
import { useAppState } from './store/appState';

// Set up PDF worker for react-pdf (only on client side)
if (typeof window !== 'undefined') {
  import('react-pdf').then((pdfjs) => {
    pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.mjs`;
  });
}

export default function DistributedSystemsApp() {
  // Centralized state management with localStorage persistence
  const {
    currentView,
    currentUnit,
    searchQuery,
    setSearchQuery,
    completedUnits,
    markUnitComplete,
    navigateToUnit,
    navigateToHome,
    navigateToQuiz,
    navigateToExam,
    examState,
    updateExamState,
    setExamMode,
    setCurrentQuestion,
    setShowAnswer,
    setCurrentCard,
    setIsFlipped,
    addMasteredCard,
    resetMasteredCards,
    setPdfState,
  } = useAppState();

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
    navigateToUnit(unit);
    window.scrollTo(0, 0);
  };

  const handleStartQuiz = (unit) => {
    stopSpeaking(); // Stop any audio when starting quiz
    navigateToQuiz(unit);
    window.scrollTo(0, 0);
  };

  const handleStartExamRevision = () => {
    stopSpeaking();
    navigateToExam();
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    navigateToHome();
  };

  const handleBackToUnit = () => {
    // Navigate back to the current unit
    if (currentUnit) {
      navigateToUnit(currentUnit);
    }
  };

  const handleNavigate = (unit) => {
    navigateToUnit(unit);
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
          onStartExamRevision={handleStartExamRevision}
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

      {currentView === 'exam' && (
        <ExamRevision
          onBack={handleBack}
          examState={examState}
          updateExamState={updateExamState}
          setExamMode={setExamMode}
          setCurrentQuestion={setCurrentQuestion}
          setShowAnswer={setShowAnswer}
          setCurrentCard={setCurrentCard}
          setIsFlipped={setIsFlipped}
          addMasteredCard={addMasteredCard}
          resetMasteredCards={resetMasteredCards}
          setPdfState={setPdfState}
        />
      )}
    </div>
  );
}