'use client';

import { BookOpen, Brain, CheckCircle, XCircle, RotateCw, ChevronLeft, ChevronRight, Lightbulb, Award, FileText, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import dynamic from 'next/dynamic';
import useSpeech from '../hooks/useSpeech';

const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

// Exam questions extracted from the past paper
import { examQuestions } from '../data/examQuestions';

// Flashcards for quick review
import { flashcards } from '../data/flashCards';


export default function ExamRevision({ onBack, examState, updateExamState, setExamMode, setCurrentQuestion, setShowAnswer, setCurrentCard, setIsFlipped, addMasteredCard, resetMasteredCards, setPdfState }) {
  // Destructure exam state from props (managed by central state)
  const {
    mode,
    currentQuestion: questionIndex,
    showAnswer: answerShown,
    currentCard: cardIndex,
    isFlipped: cardFlipped,
    masteredCards,
    numPages,
    pageNumber,
    pdfScale,
  } = examState;

  // Text-to-Speech hook
  const { isSpeaking, isPaused, speechSupported, speakText, stopSpeaking, togglePauseSpeech } = useSpeech();

  // Exam Practice Mode
  const ExamPractice = () => {
    const question = examQuestions[questionIndex];
    const progress = ((questionIndex + 1) / examQuestions.length) * 100;
    const hasSubQuestions = question.subQuestions && question.subQuestions.length > 0;

    // Helper to build full text for a question (handles both formats)
    const buildQuestionText = (q) => {
      if (q.subQuestions) {
        let fullText = `${q.title || `Question ${questionIndex + 1}`}. `;
        q.subQuestions.forEach((sub) => {
          fullText += `Part ${sub.id}. ${sub.question}. `;
        });
        return fullText;
      }
      return `Question ${questionIndex + 1}. ${q.question}`;
    };

    const buildAnswerText = (q) => {
      if (q.subQuestions) {
        let fullText = 'Answer: ';
        q.subQuestions.forEach((sub) => {
          fullText += `Part ${sub.id}. ${sub.answer}. `;
        });
        return fullText;
      }
      return `Answer: ${q.answer}`;
    };

    const speakQuestion = () => {
      const text = buildQuestionText(question);
      speakText(text);
    };

    const speakAnswer = () => {
      const text = buildAnswerText(question);
      speakText(text);
    };

    const speakAll = () => {
      const text = buildQuestionText(question) + '. ' + buildAnswerText(question);

      // Callback to auto-advance to next question after speaking
      const onSpeechEnd = () => {
        // If there's a next question, auto-advance and continue reading
        if (questionIndex < examQuestions.length - 1) {
          setShowAnswer(false);
          setCurrentQuestion(questionIndex + 1);
          window.scrollTo(0, 0);

          // Wait a bit for state to update, then speak the next question
          setTimeout(() => {
            const nextQuestion = examQuestions[questionIndex + 1];
            const nextText = buildQuestionText(nextQuestion) + '. ' + buildAnswerText(nextQuestion);
            speakText(nextText, onSpeechEnd); // Recursively call with same callback
          }, 500);
        }
      };

      speakText(text, onSpeechEnd);
    };

    // Speak individual sub-question
    const speakSubQuestion = (subQuestion) => {
      const text = `Part ${subQuestion.id}. ${subQuestion.question}`;
      speakText(text);
    };

    // Speak individual sub-answer
    const speakSubAnswer = (subQuestion) => {
      const text = `Answer to part ${subQuestion.id}. ${subQuestion.answer}`;
      speakText(text);
    };

    return (
      <div className="max-w-4xl mx-auto">
        {/* Audio Controls */}
        {speechSupported && (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-white">
                <Volume2 className="w-5 h-5" />
                <span className="font-semibold">Audio Controls</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={speakQuestion}
                  disabled={isSpeaking}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Read Question
                </button>
                {answerShown && (
                  <>
                    <button
                      onClick={speakAnswer}
                      disabled={isSpeaking}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Read Answer
                    </button>
                    <button
                      onClick={speakAll}
                      disabled={isSpeaking}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Read All
                    </button>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <button
                      onClick={togglePauseSpeech}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                    >
                      {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={stopSpeaking}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                    >
                      <VolumeX className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Question {questionIndex + 1} of {examQuestions.length}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold flex-shrink-0">
                Q{questionIndex + 1}
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                  {question.unit}
                </div>
                {hasSubQuestions ? (
                  <div className="text-gray-900 text-xl font-bold mb-6">
                    {question.title}
                  </div>
                ) : (
                  <div className="text-gray-900 text-lg leading-relaxed whitespace-pre-line">
                    {question.question}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {speechSupported && (
                <button
                  onClick={speakQuestion}
                  disabled={isSpeaking}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Listen to question"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen
                </button>
              )}
              <button
                onClick={() => setShowAnswer(!answerShown)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  answerShown
                    ? 'bg-green-100 hover:bg-green-200 text-green-700'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }`}
              >
                <Award className="w-4 h-4" />
                {answerShown ? 'Hide Answer' : 'Show Answer'}
              </button>
            </div>
          </div>

          {/* Sub-Questions (if any) */}
          {hasSubQuestions ? (
            <div className="space-y-6 mb-6">
              {question.subQuestions.map((subQ, idx) => (
                <div key={subQ.id} className="border-l-4 border-blue-400 pl-6 py-2">
                  {/* Sub-Question */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-bold mb-2">
                          Part {subQ.id}
                        </div>
                        <div className="text-gray-900 leading-relaxed whitespace-pre-line">
                          {subQ.question}
                        </div>
                      </div>
                      {speechSupported && (
                        <button
                          onClick={() => speakSubQuestion(subQ)}
                          disabled={isSpeaking}
                          className="flex-shrink-0 p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Read this part"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Key Points for this sub-question */}
                    {subQ.points && subQ.points.length > 0 && (
                      <div className="bg-amber-50 rounded-lg p-4 mt-3 border border-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <h4 className="font-semibold text-amber-900 text-sm">Key Points</h4>
                        </div>
                        <ul className="space-y-1">
                          {subQ.points.map((point, pidx) => (
                            <li key={pidx} className="flex items-start gap-2 text-amber-800 text-sm">
                              <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sub-Answer */}
                  {answerShown && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 animate-fadeIn">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-green-600" />
                            <h4 className="font-semibold text-green-900">Answer</h4>
                          </div>
                          <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                            {subQ.answer}
                          </div>
                          {/* Image support for answers */}
                          {subQ.image && (
                            <div className="mt-4">
                              <img
                                src={subQ.image}
                                alt={`Diagram for part ${subQ.id}`}
                                className="max-w-full h-auto rounded-lg border-2 border-green-300 shadow-md"
                              />
                            </div>
                          )}
                        </div>
                        {speechSupported && (
                          <button
                            onClick={() => speakSubAnswer(subQ)}
                            disabled={isSpeaking}
                            className="flex-shrink-0 p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Read this answer"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Key Points (old format) */}
              {question.points && question.points.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 mb-6 border-2 border-amber-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-amber-900">Key Points to Cover</h3>
                  </div>
                  <ul className="space-y-2">
                    {question.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-amber-800">
                        <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Answer (old format - only if no sub-questions) */}
          {!hasSubQuestions && answerShown && (
            <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border-2 border-green-200 animate-fadeIn">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-green-900 text-lg">Model Answer</h3>
              </div>
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {question.answer}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                stopSpeaking();
                setCurrentQuestion(Math.max(0, questionIndex - 1));
                setShowAnswer(false);
                window.scrollTo(0, 0);
              }}
              disabled={questionIndex === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{questionIndex + 1}</div>
              <div className="text-sm text-gray-600">of {examQuestions.length}</div>
            </div>

            <button
              onClick={() => {
                stopSpeaking();
                setCurrentQuestion(Math.min(examQuestions.length - 1, questionIndex + 1));
                setShowAnswer(false);
                window.scrollTo(0, 0);
              }}
              disabled={questionIndex === examQuestions.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Flashcards Mode
  const FlashcardsMode = () => {
    const card = flashcards[cardIndex];
    const progress = ((cardIndex + 1) / flashcards.length) * 100;
    const masteredCount = masteredCards.size;

    const speakFront = () => {
      speakText(card.front);
    };

    const speakBack = () => {
      speakText(card.back);
    };

    const speakBoth = () => {
      const text = `Question: ${card.front}. Answer: ${card.back}`;
      speakText(text);
    };

    return (
      <div className="max-w-3xl mx-auto">
        {/* Audio Controls */}
        {speechSupported && (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-white">
                <Volume2 className="w-5 h-5" />
                <span className="font-semibold">Audio Controls</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={speakFront}
                  disabled={isSpeaking}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Read Question
                </button>
                {cardFlipped && (
                  <>
                    <button
                      onClick={speakBack}
                      disabled={isSpeaking}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Read Answer
                    </button>
                    <button
                      onClick={speakBoth}
                      disabled={isSpeaking}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Read Both
                    </button>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <button
                      onClick={togglePauseSpeech}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                    >
                      {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={stopSpeaking}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                    >
                      <VolumeX className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{cardIndex + 1}</div>
            <div className="text-sm text-gray-600">Current Card</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{masteredCount}</div>
            <div className="text-sm text-gray-600">Mastered</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{flashcards.length}</div>
            <div className="text-sm text-gray-600">Total Cards</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-6">
          <div
            onClick={() => setIsFlipped(!cardFlipped)}
            className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
              cardFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 backface-hidden ${cardFlipped ? 'invisible' : 'visible'}`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-white">
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
                  {card.unit}
                </div>
                <div className="text-3xl font-bold text-center mb-6 leading-relaxed">
                  {card.front}
                </div>
                <div className="text-sm text-white/80 mt-auto">Click to flip</div>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 backface-hidden ${cardFlipped ? 'visible' : 'invisible'}`}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-white">
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
                  Answer
                </div>
                <div className="text-xl text-center leading-relaxed">
                  {card.back}
                </div>
                <div className="text-sm text-white/80 mt-auto">Click to flip back</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {cardFlipped && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fadeIn">
            <div className="text-center mb-4">
              <p className="text-gray-700 font-semibold">Did you know this?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsFlipped(false);
                  setCurrentCard(Math.min(flashcards.length - 1, cardIndex + 1));
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Need Review
              </button>
              <button
                onClick={() => {
                  stopSpeaking();
                  addMasteredCard(cardIndex);
                  setIsFlipped(false);
                  setCurrentCard(Math.min(flashcards.length - 1, cardIndex + 1));
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                I Know This!
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                stopSpeaking();
                setCurrentCard(Math.max(0, cardIndex - 1));
                setIsFlipped(false);
              }}
              disabled={cardIndex === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={() => {
                stopSpeaking();
                resetMasteredCards();
                setCurrentCard(0);
                setIsFlipped(false);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
            >
              <RotateCw className="w-5 h-5" />
              Reset Progress
            </button>

            <button
              onClick={() => {
                stopSpeaking();
                setCurrentCard(Math.min(flashcards.length - 1, cardIndex + 1));
                setIsFlipped(false);
              }}
              disabled={cardIndex === flashcards.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Past Papers Mode
  const PastPapersMode = () => {
    const handleZoomIn = () => setPdfState({ pdfScale: Math.min(pdfScale + 0.25, 2.0) });
    const handleZoomOut = () => setPdfState({ pdfScale: Math.max(pdfScale - 0.25, 0.5) });

    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mid Semester Exam Paper</h2>
              <p className="text-gray-600">Review past examination questions</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Page Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPdfState({ pageNumber: 1 })}
                  disabled={pageNumber <= 1}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                >
                  First
                </button>
                <button
                  onClick={() => setPdfState({ pageNumber: Math.max(1, pageNumber - 1) })}
                  disabled={pageNumber <= 1}
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <input
                    type="number"
                    min="1"
                    max={numPages || 1}
                    value={pageNumber}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= numPages) setPdfState({ pageNumber: val });
                    }}
                    className="w-16 text-center bg-white border border-gray-300 rounded px-2 py-1 text-sm font-semibold"
                  />
                  <span className="text-gray-600 text-sm">/ {numPages || '?'}</span>
                </div>

                <button
                  onClick={() => setPdfState({ pageNumber: Math.min(numPages || 1, pageNumber + 1) })}
                  disabled={pageNumber >= (numPages || 1)}
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPdfState({ pageNumber: numPages || 1 })}
                  disabled={pageNumber >= (numPages || 1)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                >
                  Last
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 border-l pl-4">
                <button
                  onClick={handleZoomOut}
                  disabled={pdfScale <= 0.5}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  -
                </button>
                <span className="text-sm font-semibold text-gray-700 min-w-[60px] text-center">
                  {Math.round(pdfScale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={pdfScale >= 2.0}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col items-center">
            <Document
              file="/mid_semester_exam_paper.pdf"
              onLoadSuccess={({ numPages }) => setPdfState({ numPages })}
              className="max-w-full"
            >
              <Page
                pageNumber={pageNumber}
                scale={pdfScale}
                className="shadow-lg"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>

        {/* Download Option */}
        <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 border-2 border-indigo-200">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="font-bold text-indigo-900 mb-1">Download PDF</h3>
                <p className="text-sm text-indigo-700">Open in a new tab for full PDF features</p>
              </div>
            </div>
            <a
              href="/mid_semester_exam_paper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Open in New Tab
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Main Menu
  const Menu = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
          <Brain className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Exam Revision Center</h1>
        <p className="text-xl text-gray-600">Master your Distributed Systems knowledge</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Exam Practice */}
        <div
          onClick={() => setExamMode('exam')}
          className="group bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-6 group-hover:scale-110 transition-transform">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Past Exam Questions</h2>
          <p className="text-gray-600 mb-4">
            Practice with real exam questions from December 2024. Includes model answers and key points.
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600 font-semibold">{examQuestions.length} Questions</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Flashcards */}
        <div
          onClick={() => setExamMode('flashcards')}
          className="group bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-green-500"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 text-white mb-6 group-hover:scale-110 transition-transform">
            <Brain className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Review Flashcards</h2>
          <p className="text-gray-600 mb-4">
            Master key concepts with interactive flashcards. Perfect for quick review sessions.
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-semibold">{flashcards.length} Cards</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Past Papers */}
        <div
          onClick={() => setExamMode('pastpapers')}
          className="group bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-indigo-500"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white mb-6 group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Past Exam Papers</h2>
          <p className="text-gray-600 mb-4">
            View and study past examination papers. Includes mid-semester and final exams.
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-indigo-600 font-semibold">Mid Semester Exam</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 border-2 border-amber-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500 rounded-xl">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-900 mb-3">Study Tips</h3>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Practice regularly:</strong> Review flashcards daily for 10-15 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Write out answers:</strong> Practice writing full answers to exam questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Focus on key points:</strong> Each question has key concepts to cover</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Time yourself:</strong> Practice answering in exam conditions (3 hours for 4 questions)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .backface-hidden {
          backfaceVisibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {mode !== 'menu' && (
        <button
          onClick={() => {
            stopSpeaking();
            setExamMode('menu');
            setShowAnswer(false);
            setIsFlipped(false);
          }}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Menu
        </button>
      )}

      {onBack && mode === 'menu' && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </button>
      )}

      {mode === 'menu' && <Menu />}
      {mode === 'exam' && <ExamPractice />}
      {mode === 'flashcards' && <FlashcardsMode />}
      {mode === 'pastpapers' && <PastPapersMode />}
    </div>
  );
}