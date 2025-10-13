'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import AudioControls from './AudioControls';
import UnitSummary from './UnitSummary';
import PDFViewer from './PDFViewer';
import Topics from './Topics';
import Exercises from './Exercises';
import UnitNavigation from './UnitNavigation';

export default function UnitView({
  unit,
  courseData,
  completedUnits,
  markUnitComplete,
  onBack,
  onNavigate,
  speechSupported,
  isSpeaking,
  isPaused,
  speakUnit,
  togglePauseSpeech,
  stopSpeaking,
  speakText
}) {
  const [isClient, setIsClient] = useState(false);
  const currentIndex = courseData.units.findIndex(u => u.id === unit.id);
  const prevUnit = currentIndex > 0 ? courseData.units[currentIndex - 1] : null;
  const nextUnit = currentIndex < courseData.units.length - 1 ? courseData.units[currentIndex + 1] : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBack = () => {
    onBack();
    stopSpeaking();
  };

  const handleNavigate = (newUnit) => {
    onNavigate(newUnit);
    window.scrollTo(0, 0);
  };

  const handleComplete = () => {
    onBack();
    stopSpeaking();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        unit={unit}
        isCompleted={completedUnits.has(unit.id)}
        onBack={handleBack}
        onMarkComplete={() => markUnitComplete(unit.id)}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <AudioControls
          speechSupported={speechSupported}
          isSpeaking={isSpeaking}
          isPaused={isPaused}
          onPlayUnit={() => speakUnit(unit)}
          onTogglePause={togglePauseSpeech}
          onStop={stopSpeaking}
        />

        <UnitSummary
          unit={unit}
          speechSupported={speechSupported}
          onSpeakText={speakText}
        />

        <PDFViewer unit={unit} isClient={isClient} />

        <Topics unit={unit} />

        <Exercises unit={unit} />

        <UnitNavigation
          prevUnit={prevUnit}
          nextUnit={nextUnit}
          onNavigate={handleNavigate}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}