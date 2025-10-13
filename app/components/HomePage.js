'use client';

import { BookOpen, CheckCircle, Brain } from 'lucide-react';
import SearchBar from './SearchBar';
import UnitCard from './UnitCard';

export default function HomePage({
  courseData,
  searchQuery,
  setSearchQuery,
  filteredUnits,
  completedUnits,
  onUnitSelect,
  onStartExamRevision
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {courseData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-2">Interactive Study Guide</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {courseData.units.length} Units
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              {completedUnits.size} Completed
            </span>
          </div>
        </div>


        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resultCount={filteredUnits.length}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUnits.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              isCompleted={completedUnits.has(unit.id)}
              onClick={() => onUnitSelect(unit)}
            />
          ))}
        </div>
        
        {/* Exam Revision CTA Banner */}
        <div 
          onClick={onStartExamRevision}
          className="mt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-8 cursor-pointer hover:shadow-3xl transition-all hover:scale-[1.02] group"
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">🎓 Exam Revision Center</h2>
                <p className="text-white/90 text-lg">
                  Past exam questions + Interactive flashcards • Master your exam prep!
                </p>
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="px-3 py-1 bg-white/20 rounded-full">6 Past Questions</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full">24 Flashcards</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full">Model Answers</span>
                </div>
              </div>
            </div>
            <div className="text-white font-bold text-xl group-hover:translate-x-2 transition-transform">
              Start Revision →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}