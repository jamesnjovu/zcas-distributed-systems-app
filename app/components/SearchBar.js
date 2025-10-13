'use client';

import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery, resultCount }) {
  return (
    <div className="mb-8">
      <div className="max-w-2xl mx-auto relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search units, topics, exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="mt-2 text-center text-sm text-gray-600">
            Found {resultCount} {resultCount === 1 ? 'unit' : 'units'}
          </div>
        )}
      </div>
    </div>
  );
}