'use client';

import { BookOpen, CheckCircle } from 'lucide-react';
import SearchBar from './SearchBar';
import UnitCard from './UnitCard';

export default function HomePage({
  courseData,
  searchQuery,
  setSearchQuery,
  filteredUnits,
  completedUnits,
  onUnitSelect
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
      </div>
    </div>
  );
}