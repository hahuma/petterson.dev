'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseTypingEffectOptions {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  initialDelay?: number;
}

export function useTypingEffect({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
  initialDelay = 1000,
}: UseTypingEffectOptions) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const type = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) {
      return;
    }

    if (isDeleting) {
      setDisplayText(currentPhrase.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);

      if (charIndex <= 1) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      setDisplayText(currentPhrase.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);

      if (charIndex >= currentPhrase.length - 1) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    }
  }, [phrases, phraseIndex, charIndex, isDeleting, isPaused, pauseDuration]);

  useEffect(() => {
    const startTimer = setTimeout(() => setIsStarted(true), initialDelay);
    return () => clearTimeout(startTimer);
  }, [initialDelay]);

  useEffect(() => {
    if (!isStarted) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(type, isPaused ? 0 : speed);

    return () => clearTimeout(timer);
  }, [type, isDeleting, isPaused, isStarted, typingSpeed, deletingSpeed]);

  return displayText;
}
