'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function Topics({ unit }) {
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (topicIndex) => {
    const key = `${unit.id}-${topicIndex}`;
    setExpandedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-blue-600" />
        Topics Covered
      </h2>
      <div className="grid gap-3">
        {unit.topics.map((topic, index) => {
          const key = `${unit.id}-${index}`;
          const isExpanded = expandedTopics[key];

          return (
            <div
              key={index}
              className="rounded-lg bg-gray-50 border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
            >
              <div
                className="flex items-start gap-3 p-4 cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => toggleTopic(index)}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold leading-relaxed">{topic.title}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 animate-fadeIn">
                  <div className="ml-11 p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {topic.summary}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}