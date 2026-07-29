import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to the returned ref.
 * Once the element scrolls into view it sets isVisible = true (and stays true).
 *
 * @param {object} options
 * @param {string}  options.threshold - 0–1, default 0.15
 * @param {string}  options.rootMargin - CSS margin string, default '0px'
 * @param {boolean} options.once - if true (default) the observer disconnects after first trigger
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * useScrollProgress
 * Tracks a normalized [0, 1] scroll progress value for a given element.
 * 0 = element top just entered the bottom of the viewport
 * 1 = element bottom has left the top of the viewport
 *
 * Useful for continuous scroll-driven effects like text reveal.
 */
export function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // When rect.top === vh: progress = 0 (element just entering from bottom)
      // When rect.bottom === 0: progress = 1 (element fully scrolled past)
      const total = vh + rect.height;
      const scrolled = vh - rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return { ref, progress };
}
