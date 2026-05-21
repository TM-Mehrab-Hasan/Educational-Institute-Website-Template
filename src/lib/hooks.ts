"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

export function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setElement(node);
    }
  }, []);

  useEffect(() => {
    if (!element) return;

    // Fallback for environments where IntersectionObserver is not available
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible to save resources
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05, // Lower threshold for better reliability
        rootMargin: '50px', // Start revealing slightly before it enters the viewport
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [element]);

  return { ref, isVisible };
}

