'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Central State Management with localStorage Persistence
 *
 * This file manages ALL application state in one place and automatically
 * persists state to localStorage for data persistence across page reloads.
 */

const STORAGE_KEY = 'distributed-systems-app-state';

// Default initial state
const DEFAULT_STATE = {
  // Navigation State
  currentView: 'home', // 'home', 'unit', 'quiz', 'exam'
  currentUnit: null,
  searchQuery: '',

  // Progress State
  completedUnits: new Set(),

  // Exam Revision State
  exam: {
    mode: 'menu', // 'menu', 'exam', 'flashcards', 'pastpapers'
    currentQuestion: 0,
    showAnswer: false,
    currentCard: 0,
    isFlipped: false,
    masteredCards: new Set(),
    // PDF state
    numPages: null,
    pageNumber: 1,
    pdfScale: 1.0,
  },

  // Quiz State
  quiz: {
    currentQuestion: 0,
    selectedAnswers: {},
    showResults: false,
    timeStarted: null,
    timeFinished: null,
  },

  // UI State (expandable sections)
  ui: {
    expandedTopics: {},
    expandedAnswers: {},
    showPdfViewer: false,
  },
};

/**
 * Custom hook for centralized state management
 */
export function useAppState() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsed = JSON.parse(savedState);
          setState(prevState => ({
            ...prevState,
            ...parsed,
            // Convert arrays back to Sets
            completedUnits: new Set(parsed.completedUnits || []),
            // Don't restore these volatile states
            currentView: 'home',
            exam: {
              ...prevState.exam,
              ...parsed.exam,
              masteredCards: new Set(parsed.exam?.masteredCards || []),
              mode: 'menu', // Always start at menu
            },
            quiz: {
              ...prevState.quiz,
              timeStarted: null, // Reset quiz timer
            },
          }));
        }
      } catch (error) {
        console.error('Failed to load state from localStorage:', error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        // Convert Sets to arrays before saving
        const stateToSave = {
          ...state,
          completedUnits: Array.from(state.completedUnits),
          exam: {
            ...state.exam,
            masteredCards: Array.from(state.exam.masteredCards),
          },
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (error) {
        console.error('Failed to save state to localStorage:', error);
      }
    }
  }, [state, isLoaded]);

  // Generic update function
  const updateState = useCallback((updates) => {
    setState(prevState => ({
      ...prevState,
      ...updates,
    }));
  }, []);

  // Navigation actions
  const setCurrentView = useCallback((view) => {
    updateState({ currentView: view });
  }, [updateState]);

  const setCurrentUnit = useCallback((unit) => {
    updateState({ currentUnit: unit });
  }, [updateState]);

  const setSearchQuery = useCallback((query) => {
    updateState({ searchQuery: query });
  }, [updateState]);

  const navigateToUnit = useCallback((unit) => {
    updateState({
      currentView: 'unit',
      currentUnit: unit,
    });
  }, [updateState]);

  const navigateToHome = useCallback(() => {
    updateState({
      currentView: 'home',
      currentUnit: null,
    });
  }, [updateState]);

  const navigateToQuiz = useCallback((unit) => {
    updateState({
      currentView: 'quiz',
      currentUnit: unit,
      quiz: {
        ...DEFAULT_STATE.quiz,
        timeStarted: Date.now(),
      },
    });
  }, [updateState]);

  const navigateToExam = useCallback(() => {
    updateState({
      currentView: 'exam',
    });
  }, [updateState]);

  // Progress actions
  const markUnitComplete = useCallback((unitId) => {
    setState(prevState => ({
      ...prevState,
      completedUnits: Array.from(new Set([...prevState.completedUnits, unitId])),
    }));
  }, []);

  const isUnitCompleted = useCallback((unitId) => {
    return state.completedUnits.includes(unitId);
  }, [state.completedUnits]);

  // Exam Revision actions
  const updateExamState = useCallback((updates) => {
    setState(prevState => ({
      ...prevState,
      exam: {
        ...prevState.exam,
        ...updates,
      },
    }));
  }, []);

  const setExamMode = useCallback((mode) => {
    updateExamState({ mode });
  }, [updateExamState]);

  const setCurrentQuestion = useCallback((questionIndex) => {
    updateExamState({ currentQuestion: questionIndex });
  }, [updateExamState]);

  const toggleShowAnswer = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      exam: {
        ...prevState.exam,
        showAnswer: !prevState.exam.showAnswer,
      },
    }));
  }, []);

  const setShowAnswer = useCallback((show) => {
    updateExamState({ showAnswer: show });
  }, [updateExamState]);

  const setCurrentCard = useCallback((cardIndex) => {
    updateExamState({ currentCard: cardIndex });
  }, [updateExamState]);

  const toggleCardFlip = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      exam: {
        ...prevState.exam,
        isFlipped: !prevState.exam.isFlipped,
      },
    }));
  }, []);

  const setIsFlipped = useCallback((flipped) => {
    updateExamState({ isFlipped: flipped });
  }, [updateExamState]);

  const addMasteredCard = useCallback((cardIndex) => {
    setState(prevState => ({
      ...prevState,
      exam: {
        ...prevState.exam,
        masteredCards: Array.from(new Set([...prevState.exam.masteredCards, cardIndex])),
      },
    }));
  }, []);

  const resetMasteredCards = useCallback(() => {
    updateExamState({ masteredCards: new Set() });
  }, [updateExamState]);

  const setPdfState = useCallback((pdfUpdates) => {
    updateExamState(pdfUpdates);
  }, [updateExamState]);

  const resetExamState = useCallback(() => {
    updateState({ exam: DEFAULT_STATE.exam });
  }, [updateState]);

  // Quiz actions
  const updateQuizState = useCallback((updates) => {
    setState(prevState => ({
      ...prevState,
      quiz: {
        ...prevState.quiz,
        ...updates,
      },
    }));
  }, []);

  const setQuizCurrentQuestion = useCallback((questionIndex) => {
    updateQuizState({ currentQuestion: questionIndex });
  }, [updateQuizState]);

  const setQuizAnswer = useCallback((questionIndex, answerIndex) => {
    setState(prevState => ({
      ...prevState,
      quiz: {
        ...prevState.quiz,
        selectedAnswers: {
          ...prevState.quiz.selectedAnswers,
          [questionIndex]: answerIndex,
        },
      },
    }));
  }, []);

  const submitQuiz = useCallback(() => {
    updateQuizState({
      showResults: true,
      timeFinished: Date.now(),
    });
  }, [updateQuizState]);

  const retakeQuiz = useCallback(() => {
    updateQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      showResults: false,
      timeStarted: Date.now(),
      timeFinished: null,
    });
  }, [updateQuizState]);

  const resetQuizState = useCallback(() => {
    updateState({
      quiz: {
        ...DEFAULT_STATE.quiz,
        timeStarted: Date.now(),
      },
    });
  }, [updateState]);

  // UI State actions
  const toggleTopic = useCallback((topicId) => {
    setState(prevState => ({
      ...prevState,
      ui: {
        ...prevState.ui,
        expandedTopics: {
          ...prevState.ui.expandedTopics,
          [topicId]: !prevState.ui.expandedTopics[topicId],
        },
      },
    }));
  }, []);

  const toggleAnswer = useCallback((answerId) => {
    setState(prevState => ({
      ...prevState,
      ui: {
        ...prevState.ui,
        expandedAnswers: {
          ...prevState.ui.expandedAnswers,
          [answerId]: !prevState.ui.expandedAnswers[answerId],
        },
      },
    }));
  }, []);

  const togglePdfViewer = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      ui: {
        ...prevState.ui,
        showPdfViewer: !prevState.ui.showPdfViewer,
      },
    }));
  }, []);

  const setShowPdfViewer = useCallback((show) => {
    setState(prevState => ({
      ...prevState,
      ui: {
        ...prevState.ui,
        showPdfViewer: show,
      },
    }));
  }, []);

  // Utility actions
  const clearAllData = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      setState(DEFAULT_STATE);
    }
  }, []);

  const exportState = useCallback(() => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  const importState = useCallback((jsonState) => {
    try {
      const parsed = JSON.parse(jsonState);
      setState(parsed);
      return true;
    } catch (error) {
      console.error('Failed to import state:', error);
      return false;
    }
  }, []);

  return {
    // State
    state,
    isLoaded,

    // Generic
    updateState,
    clearAllData,
    exportState,
    importState,

    // Navigation
    currentView: state.currentView,
    currentUnit: state.currentUnit,
    searchQuery: state.searchQuery,
    setCurrentView,
    setCurrentUnit,
    setSearchQuery,
    navigateToUnit,
    navigateToHome,
    navigateToQuiz,
    navigateToExam,

    // Progress
    completedUnits: state.completedUnits,
    markUnitComplete,
    isUnitCompleted,

    // Exam Revision
    examState: state.exam,
    updateExamState,
    setExamMode,
    setCurrentQuestion,
    toggleShowAnswer,
    setShowAnswer,
    setCurrentCard,
    toggleCardFlip,
    setIsFlipped,
    addMasteredCard,
    resetMasteredCards,
    setPdfState,
    resetExamState,

    // Quiz
    quizState: state.quiz,
    updateQuizState,
    setQuizCurrentQuestion,
    setQuizAnswer,
    submitQuiz,
    retakeQuiz,
    resetQuizState,

    // UI
    uiState: state.ui,
    toggleTopic,
    toggleAnswer,
    togglePdfViewer,
    setShowPdfViewer,
  };
}
