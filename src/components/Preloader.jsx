import React, { useState, useEffect } from 'react';
import { O } from '../assets';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isCounterFaded, setIsCounterFaded] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    // Fast loading count simulation (counter completes in ~600ms)
    const startTime = Date.now();
    const duration = 650; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        
        // Step 1: Fade out the counter text
        setTimeout(() => {
          setIsCounterFaded(true);
        }, 150);

        // Step 2: Slide up the curtain
        setTimeout(() => {
          setIsAnimatingOut(true);
          document.body.classList.add('loaded');
        }, 400);

        // Step 3: Destroy preloader from DOM (after transition finishes)
        setTimeout(() => {
          setIsDestroyed(true);
          document.body.style.overflow = '';
        }, 1300);
      }
    }, 16); // ~60fps check

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (isDestroyed) return null;

  // Format progress to always show two digits (e.g. 00, 03, 45, 100)
  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isAnimatingOut ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.85s cubic-bezier(0.85, 0, 0.15, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Center Logo & Progress Text */}
      <div 
        style={{
          opacity: isCounterFaded ? 0 : 1,
          transform: isCounterFaded ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        }}
        className="flex flex-col items-center justify-center gap-5 select-none font-inter"
      >
        <div className="relative flex items-center justify-center w-20 sm:w-24 aspect-square">
          <img 
            src={O.logo} 
            alt="Amppere Cable Logo" 
            className="w-full h-auto object-contain select-none animate-pulse"
            style={{ animationDuration: '1.5s' }}
          />
          {/* Subtle glowing ring behind the logo */}
          <div className="absolute inset-0 rounded-full border border-[#C62828]/35 scale-[1.35] animate-ping opacity-40 pointer-events-none" />
        </div>

        <div className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.25em] text-white/50 uppercase font-mono mt-3">
          {progress < 100 ? `LOADING ${formattedProgress}%` : "READY"}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
