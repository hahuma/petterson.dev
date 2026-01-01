'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function useCounterAnimation(targetValue: number, duration = 2000) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const animateCounter = useCallback(() => {
    const startTime = performance.now();

    function updateCounter(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * targetValue);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(targetValue);
      }
    }

    requestAnimationFrame(updateCounter);
  }, [targetValue, duration]);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animateCounter, hasAnimated]);

  return { ref, displayValue };
}
