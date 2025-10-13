'use client';

import { Home, CheckCircle } from 'lucide-react';

export default function Header({ unit, isCompleted, onBack, onMarkComplete }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-10 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Units
        </button>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 text-white font-bold">
                {unit.id}
              </div>
              <h1 className="text-3xl font-bold">{unit.title}</h1>
            </div>
            <p className="text-white/80">
              {unit.topics.length} topics • {unit.exercises.length} exercises
            </p>
          </div>
          {!isCompleted ? (
            <button
              onClick={onMarkComplete}
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              <CheckCircle className="w-5 h-5" />
              Mark Complete
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
              <CheckCircle className="w-5 h-5 fill-current" />
              Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}