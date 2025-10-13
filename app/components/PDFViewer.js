'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, FileText, ExternalLink, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import react-pdf components to avoid SSR issues
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

export default function PDFViewer({ unit, isClient }) {
  const [showPdfViewer, setShowPdfViewer] = useState(true);
  const [pdfScale, setPdfScale] = useState(1.0);
  const [currentPdfPage, setCurrentPdfPage] = useState(null);

  const [startPage, endPage] = unit.pdfPages.split('-').map(p => parseInt(p.trim()));
  const totalPages = endPage - startPage + 1;
  const displayPage = currentPdfPage || startPage;

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-2 border-indigo-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-600" />
          Course Material
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPdfViewer(!showPdfViewer)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition-colors"
          >
            {showPdfViewer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showPdfViewer ? 'Hide PDF' : 'Show PDF'}
          </button>
          <a
            href={`/zcas-distributed-systems-app/distributed-systems-module.pdf#page=${startPage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open in New Tab
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Pages {unit.pdfPages}</p>
            <p className="text-sm text-gray-600">This unit covers pages {unit.pdfPages} in the course module</p>
          </div>
        </div>
      </div>

      {showPdfViewer && (
        <div className="border-2 border-indigo-200 rounded-lg overflow-hidden bg-gray-100">
          <div className="bg-indigo-100 px-4 py-3 border-b border-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-indigo-700">PDF Viewer</span>
              <span className="text-xs text-indigo-600 bg-white px-2 py-1 rounded">Pages {unit.pdfPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPdfScale(Math.max(0.75, pdfScale - 0.25))}
                disabled={pdfScale <= 0.75}
                className="p-1.5 bg-white text-indigo-600 rounded hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-indigo-700 bg-white px-2 py-1 rounded min-w-[60px] text-center">
                {Math.round(pdfScale * 100)}%
              </span>
              <button
                onClick={() => setPdfScale(Math.min(2, pdfScale + 0.25))}
                disabled={pdfScale >= 2}
                className="p-1.5 bg-white text-indigo-600 rounded hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white px-4 py-3 border-b border-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPdfPage(Math.max(startPage, displayPage - 1))}
                disabled={displayPage <= startPage}
                className="p-1.5 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Page</span>
                <input
                  type="number"
                  value={displayPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= startPage && page <= endPage) {
                      setCurrentPdfPage(page);
                    }
                  }}
                  min={startPage}
                  max={endPage}
                  className="w-16 px-2 py-1 text-sm font-medium text-center border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">of {endPage}</span>
                <span className="text-xs text-gray-500">({totalPages} pages for this unit)</span>
              </div>
              <button
                onClick={() => setCurrentPdfPage(Math.min(endPage, displayPage + 1))}
                disabled={displayPage >= endPage}
                className="p-1.5 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPdfPage(startPage)}
                disabled={displayPage === startPage}
                className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPdfPage(endPage)}
                disabled={displayPage === endPage}
                className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </button>
            </div>
          </div>

          <div className="bg-white p-4 flex justify-center items-center min-h-[800px]">
            {isClient ? (
              <Document
                file="/zcas-distributed-systems-app/distributed-systems-module.pdf"
                loading={
                  <div className="flex items-center justify-center p-8">
                    <div className="text-indigo-600">Loading PDF...</div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center p-8">
                    <div className="text-red-600">Failed to load PDF. Please try again.</div>
                  </div>
                }
              >
                <Page
                  pageNumber={displayPage}
                  scale={pdfScale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg"
                  loading={
                    <div className="flex items-center justify-center p-8">
                      <div className="text-indigo-600">Loading page {displayPage}...</div>
                    </div>
                  }
                />
              </Document>
            ) : (
              <div className="flex items-center justify-center p-8">
                <div className="text-indigo-600">Initializing PDF viewer...</div>
              </div>
            )}
          </div>

          <div className="bg-indigo-50 px-4 py-3 border-t border-indigo-200">
            <p className="text-xs text-indigo-600">
              📖 Viewing Unit {unit.id} material • Page {displayPage} of {endPage} • Unit covers pages {unit.pdfPages}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}