import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameId = useRef(null);

  useEffect(() => {
    // 1. Disable custom cursor on touch-only/mobile devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    // 2. Mouse movement tracking
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if we are hovering over an element that has cursor-none
      // (like the Spotlight reveal section in AboutShowcase)
      const target = e.target;
      if (target) {
        const isSpotlightArea = target.closest('.cursor-none');
        if (isSpotlightArea) {
          if (dotRef.current) dotRef.current.style.opacity = '0';
          if (ringRef.current) ringRef.current.style.opacity = '0';
        } else {
          if (dotRef.current) dotRef.current.style.opacity = '1';
          if (ringPos.current.x > 0 && ringRef.current) ringRef.current.style.opacity = '1';
        }
      }
    };

    // 3. Click state triggers
    const onMouseDown = () => {
      if (dotRef.current) dotRef.current.classList.add('cursor-clicked');
      if (ringRef.current) ringRef.current.classList.add('cursor-clicked');
    };

    const onMouseUp = () => {
      if (dotRef.current) dotRef.current.classList.remove('cursor-clicked');
      if (ringRef.current) ringRef.current.classList.remove('cursor-clicked');
    };

    // 4. Interactive hover state detection
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer, .client-logo, .swiper-button-next, .swiper-button-prev'
      );
      
      interactives.forEach((el) => {
        if (el.dataset.hasCursorListeners) return;
        el.dataset.hasCursorListeners = 'true';

        el.addEventListener('mouseenter', () => {
          if (ringRef.current) ringRef.current.classList.add('cursor-hover');
          if (dotRef.current) dotRef.current.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
          if (ringRef.current) ringRef.current.classList.remove('cursor-hover');
          if (dotRef.current) dotRef.current.classList.remove('cursor-hover');
        });
      });
    };

    // 5. 60fps render loop
    const updateCursor = () => {
      // Immediate precise dot tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Smooth outer ring trailing (lerp)
      if (ringRef.current) {
        if (ringPos.current.x === -100 && mousePos.current.x !== -100) {
          ringPos.current = { ...mousePos.current };
          ringRef.current.style.opacity = '1';
        }

        const speed = 0.14; // Lerp speed for smooth trailing
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * speed;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * speed;

        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId.current = requestAnimationFrame(updateCursor);
    };

    // Attach event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Initial setup
    addHoverListeners();
    animationFrameId.current = requestAnimationFrame(updateCursor);

    // Dynamic content observation (to bind dynamic elements)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId.current);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precise Central Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none mix-blend-difference z-[9999] transition-[width,height,opacity] duration-200 ease-out will-change-transform"
      />
      {/* Outer Lagging Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-red-600 pointer-events-none z-[9998] opacity-0 transition-[width,height,border-color,background-color,mix-blend-mode] duration-300 ease-out will-change-transform"
      />
    </>
  );
};

export default CustomCursor;
