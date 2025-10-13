'use client';

import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
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
  onStartQuiz,
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AudioControls
          speechSupported={speechSupported}
          isSpeaking={isSpeaking}
          isPaused={isPaused}
          onPlayUnit={() => speakUnit(unit)}
          onTogglePause={togglePauseSpeech}
          onStop={stopSpeaking}
        />

        {/* Two Column Layout - Content Left, PDF Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <UnitSummary
              unit={unit}
              speechSupported={speechSupported}
              onSpeakText={speakText}
            />

            <Topics unit={unit} />

            <Exercises unit={unit} />
          </div>

          {/* Right Column - PDF Viewer */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <PDFViewer unit={unit} isClient={isClient} />
          </div>
        </div>

        <UnitNavigation
          prevUnit={prevUnit}
          nextUnit={nextUnit}
          onNavigate={handleNavigate}
          onComplete={handleComplete}
        />
        
      {/* Quiz CTA Banner - Full Width */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Ready to test your knowledge?</h3>
                <p className="text-sm text-white/90">Take the quiz and earn your score!</p>
              </div>
            </div>
            <button
              onClick={() => onStartQuiz(unit)}
              className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-md"
            >
              <Trophy className="w-5 h-5" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}