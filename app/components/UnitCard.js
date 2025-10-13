'use client';

import { ChevronRight, CheckCircle } from 'lucide-react';

export default function UnitCard({ unit, isCompleted, onClick }) {
  return (
    <div
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-blue-500"
      onClick={onClick}
    >
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <CheckCircle className="w-6 h-6 text-green-500 fill-current" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 font-bold text-lg">
            {unit.id}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {unit.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          {unit.topics.length} topics • {unit.exercises.length} exercises
        </p>

        <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
          Start Learning
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
}