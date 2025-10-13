'use client';

import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Exercises({ unit }) {
  const [expandedAnswers, setExpandedAnswers] = useState({});

  const toggleAnswer = (questionIndex) => {
    const key = `${unit.id}-${questionIndex}`;
    setExpandedAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <CheckCircle className="w-6 h-6 text-purple-600" />
        Practice Exercises
      </h2>
      <div className="space-y-6">
        {unit.exercises.map((exercise, index) => {
          const key = `${unit.id}-${index}`;
          const isExpanded = expandedAnswers[key];

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
            >
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold text-sm flex-shrink-0">
                    Q{index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {exercise.q}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => toggleAnswer(index)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                    isExpanded
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      Show Answer
                    </>
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 animate-fadeIn">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm flex-shrink-0">
                        A
                      </div>
                      <p className="text-gray-800 leading-relaxed flex-1 whitespace-pre-line">
                        {exercise.a}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}