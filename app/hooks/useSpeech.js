'use client';

import { useState, useEffect } from 'react';

export default function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  const speakText = (text, onEndCallback) => {
    if (!speechSupported) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      // Call the callback if provided
      if (onEndCallback && typeof onEndCallback === 'function') {
        onEndCallback();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const togglePauseSpeech = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const speakUnit = (unit) => {
    let fullText = `Unit ${unit.id}: ${unit.title}. `;
    fullText += `Summary: ${unit.summary}. `;
    fullText += `Key points: ${unit.keyPoints.join('. ')}. `;

    unit.topics.forEach((topic) => {
      fullText += `Topic: ${topic.title}. Summary: ${topic.summary}. `;
    });

    unit.exercises.forEach((ex, idx) => {
      fullText += `Question ${idx + 1}: ${ex.q}. Answer: ${ex.a}. `;
    });

    speakText(fullText);
  };

  return {
    isSpeaking,
    isPaused,
    speechSupported,
    speakText,
    stopSpeaking,
    togglePauseSpeech,
    speakUnit
  };
}