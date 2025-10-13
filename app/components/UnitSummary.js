'use client';

import { BookOpen, CheckCircle, Volume2 } from 'lucide-react';

export default function UnitSummary({ unit, speechSupported, onSpeakText }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-8 mb-8 border-2 border-blue-200">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-blue-600 rounded-xl">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unit Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            {unit.summary}
          </p>
        </div>
        {speechSupported && (
          <button
            onClick={() => onSpeakText(unit.summary)}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Listen to summary"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="border-t-2 border-blue-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          Key Points to Remember
        </h3>
        <div className="grid gap-3">
          {unit.keyPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-800 leading-relaxed flex-1">{point}</p>
              {speechSupported && (
                <button
                  onClick={() => onSpeakText(point)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors flex-shrink-0"
                  title="Listen to this point"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}