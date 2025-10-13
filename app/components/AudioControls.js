'use client';

import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function AudioControls({
  speechSupported,
  isSpeaking,
  isPaused,
  onPlayUnit,
  onTogglePause,
  onStop
}) {
  if (!speechSupported) return null;

  return (
    <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg p-6 mb-8 text-white">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Audio Learning</h3>
            <p className="text-sm text-white/90">Listen to the entire unit content</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isSpeaking ? (
            <button
              onClick={onPlayUnit}
              className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-md"
            >
              <Play className="w-5 h-5" />
              Play Unit Audio
            </button>
          ) : (
            <>
              <button
                onClick={onTogglePause}
                className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-md"
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={onStop}
                className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md"
              >
                <VolumeX className="w-5 h-5" />
                Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}