'use client';

import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function UnitNavigation({ prevUnit, nextUnit, onNavigate, onComplete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <div className="flex items-center justify-between gap-4">
        {prevUnit ? (
          <button
            onClick={() => onNavigate(prevUnit)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Previous Unit</div>
              <div className="text-sm">Unit {prevUnit.id}: {prevUnit.title}</div>
            </div>
          </button>
        ) : (
          <div></div>
        )}

        {nextUnit ? (
          <button
            onClick={() => onNavigate(nextUnit)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors group"
          >
            <div className="text-right">
              <div className="text-xs text-blue-100">Next Unit</div>
              <div className="text-sm">Unit {nextUnit.id}: {nextUnit.title}</div>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            Complete Course
          </button>
        )}
      </div>
    </div>
  );
}