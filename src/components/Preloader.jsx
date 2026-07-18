import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  const brandWords = [
    "FIRE SAFETY",
    "PREMIUM COPPER",
    "TRUST SINCE 1993",
    "HIGH PERFORMANCE",
    "AMPPERE CABLE"
  ];

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    // Fast loading count simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Trigger slide up animation
          setTimeout(() => {
            setIsAnimatingOut(true);
          }, 400);
          // Destroy from DOM after slide transition finishes
          setTimeout(() => {
            setIsDestroyed(true);
            document.body.style.overflow = '';
          }, 1600);
          return 100;
        }
        // Count in randomized increments for organic feel
        const increment = Math.floor(Math.random() * 12) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) return;
    
    const wordInterval = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % brandWords.length);
    }, 280);

    return () => clearInterval(wordInterval);
  }, [progress, brandWords.length]);

  if (isDestroyed) return null;

  // Format progress to always show two digits (e.g. 03, 45, 100)
  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0813',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 2rem md:padding-12',
        color: '#ffffff',
        transform: isAnimatingOut ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 1.2s cubic-bezier(0.85, 0, 0.15, 1)',
        overflow: 'hidden'
      }}
      className="box-border"
    >
      {/* Background Glowing Ambient Accents */}
      <div 
        className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-[#3d6bb5]/10 rounded-full blur-[150px] pointer-events-none"
        style={{ transform: 'translate(50%, 50%)' }}
      />

      {/* Top Section: Branding & Date */}
      <div className="flex justify-between items-center z-10 w-full max-w-7xl mx-auto border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-sm font-semibold tracking-[0.2em] font-inter">AMPPERE CABLE</span>
        </div>
        <div className="text-gray-400 text-xs font-semibold tracking-wider font-inter">
          EST. 1993
        </div>
      </div>

      {/* Middle Section: Big Numbers & Words */}
      <div className="flex-1 flex flex-col justify-center items-center z-10 w-full max-w-7xl mx-auto my-12 relative">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          {/* Brand Word Reveal */}
          <div className="h-16 flex items-center overflow-hidden">
            <div 
              key={activeWordIdx} 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-outfit tracking-wide animate-slide-up"
            >
              {progress < 100 ? brandWords[activeWordIdx] : "READY"}
            </div>
          </div>

          {/* Huge Dynamic Counter */}
          <div className="flex items-baseline font-outfit select-none">
            <span className="text-[18vw] md:text-[14vw] font-black leading-none text-[#ef2334] tracking-tighter">
              {formattedProgress}
            </span>
            <span className="text-[5vw] font-bold text-gray-500 ml-1">%</span>
          </div>

        </div>
      </div>

      {/* Bottom Section: Mission & Details */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10 text-xs text-gray-400 font-inter">
        <div>
          ISO 9001 · CE · ROHS CERTIFIED
        </div>
        <div className="flex items-center gap-4">
          <span>MAHARASHTRA, INDIA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span>SERVERS OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
