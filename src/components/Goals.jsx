import React, { useEffect, useRef, useState } from 'react';

const goalsData = [
  {
    num: '01',
    title: 'Innovative Product\nDevelopment',
    description:
      'Continuously investing in research and development to engineer high-performance cable solutions that meet evolving industry standards.',
    tags: ['R&D', 'Innovation', 'Performance'],
    image: '/goals/01.png',
  },
  {
    num: '02',
    title: 'Customer-Centric\nSolutions',
    description:
      'Delivering reliable products and exceptional support through customized solutions that address the unique needs of every customer.',
    tags: ['Customer First', 'Technical Support', 'Reliability'],
    image: '/goals/02.png',
  },
  {
    num: '03',
    title: 'Fast & Reliable\nDelivery',
    description:
      'Ensuring timely manufacturing and efficient nationwide distribution to keep projects running without delays.',
    tags: ['On-Time Delivery', 'Logistics', 'Supply Chain'],
    image: '/goals/03.png',
  },
  {
    num: '04',
    title: 'Quality & Safety\nAssurance',
    description:
      'Manufacturing every cable to the highest quality and safety standards through rigorous testing and certified production processes.',
    tags: ['Quality Control', 'Certified Products', 'Safety Standards'],
    image: '/goals/04.png',
  },
];

// 950px scroll space per slide gives a relaxed, comfortable scroll duration
const Goals = () => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  
  // Responsive scroll distances to prevent "endless scrolling" on mobile
  const isMobileSize = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const displayedGoals = goalsData;

  // Make it extremely fast on mobile so they instantly see the next item
  const PX_PER_GOAL = isMobileSize ? 250 : 550;
  const TOTAL_SCROLL = PX_PER_GOAL * displayedGoals.length;

  // React state for scroll progress
  const targetProgRef = useRef(0);
  const currentProgRef = useRef(0);
  const [smoothProg, setSmoothProg] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Scroll listener updates target progress
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      
      if (scrolled <= 0) {
        targetProgRef.current = 0;
      } else {
        targetProgRef.current = Math.min(displayedGoals.length - 1, scrolled / PX_PER_GOAL);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [PX_PER_GOAL, displayedGoals.length]);

  // 2. Ultra-smooth continuous animation loop with React re-render guard
  useEffect(() => {
    let lastP = -1;
    
    const loop = () => {
      const diff = targetProgRef.current - currentProgRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgRef.current += diff * 0.08;
      } else {
        currentProgRef.current = targetProgRef.current;
      }
      
      const p = currentProgRef.current;
      
      // ONLY trigger React re-render if the value has changed!
      // This completely prevents the CPU-freezing infinite re-render loop.
      if (Math.abs(p - lastP) > 0.001) {
        setSmoothProg(p);
        setActiveIdx(Math.min(displayedGoals.length - 1, Math.max(0, Math.round(p))));
        lastP = p;
      }
      
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [displayedGoals.length]);

  // Click handler to smoothly scroll to any specific goal slide
  const handleNavClick = (idx) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top + idx * PX_PER_GOAL + 20;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Circular arc wheel geometry
  const RADIUS = 460;
  const ANGLE_STEP = 26;

  return (
    <section
      ref={sectionRef}
      data-section="goals"
      style={{
        height: `calc(100vh + ${TOTAL_SCROLL}px)`,
        position: 'relative',
        background: '#FFFFFF',
        color: '#111111',
      }}
      className="w-full font-inter"
    >
      {/* Sticky full-screen viewport panel */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 80% 50%, rgba(198, 40, 40, 0.03) 0%, rgba(255, 255, 255, 1) 70%)',
        }}
      >
        {/* Section Header (Top Bar) — Uses Amppere's native Outfit font for headings */}
        <div className="absolute top-24 md:top-32 left-6 md:left-16 z-20 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              style={{ background: '#C62828' }}
              className="w-2 h-2 rounded-full inline-block animate-pulse"
            />
            <p
              style={{ color: '#C62828' }}
              className="text-xs font-bold tracking-[0.25em] uppercase m-0"
            >
              Why Choose Amppere
            </p>
          </div>
          <div className="flex items-baseline gap-2 mt-1 font-outfit text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit tracking-tight text-left m-0">
              <span style={{ color: '#C62828' }} className="mr-3">OUR</span>
              <span style={{ color: '#111111' }}>GOALS</span>
            </h2>
          </div>
        </div>

        {windowWidth >= 1024 ? (
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center h-full pt-32 md:pt-24 pb-8">
            
            {/* LEFT COLUMN: Circular Arc Wheel Navigation */}
            <div className="hidden lg:flex lg:col-span-3 relative h-[500px] items-center">
              {/* Decorative SVG Arc Line */}
              <svg
                className="absolute left-[-160px] top-1/2 -translate-y-1/2 pointer-events-none"
                width="500"
                height="800"
                viewBox="0 0 500 800"
                fill="none"
              >
                <path
                  d="M -150 50 A 460 460 0 0 1 -150 750"
                  stroke="rgba(0, 0, 0, 0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Rotating Number Reel */}
              <div className="relative w-full h-full flex items-center">
                {displayedGoals.map((g, i) => {
                  const offset = i - smoothProg;
                  const angleDeg = offset * ANGLE_STEP;
                  const angleRad = (angleDeg * Math.PI) / 180;

                  const y = RADIUS * Math.sin(angleRad);
                  const x = RADIUS * (Math.cos(angleRad) - 1);

                  const dist = Math.abs(offset);
                  const isActive = dist < 0.45;
                  const scale = Math.max(0.75, 1 - dist * 0.2);
                  const opacity = Math.max(0, 1 - dist * 0.7);
                  const rotate = angleDeg * 0.6;

                  return (
                    <div
                      key={g.num}
                      onClick={() => handleNavClick(i)}
                      style={{
                        position: 'absolute',
                        left: `${30 + x}px`,
                        top: `calc(50% + ${y}px)`,
                        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
                        opacity: opacity,
                        pointerEvents: opacity > 0.05 ? 'auto' : 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                        zIndex: isActive ? 10 : 1,
                      }}
                      className="flex items-center gap-3 select-none group py-2 px-4 rounded-full"
                    >
                      <span
                        style={{
                          background: '#C62828',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'scale(1)' : 'scale(0)',
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(198,40,40,0.6)]"
                      />
                      <span
                        style={{
                          color: isActive ? '#111111' : '#777777',
                          fontWeight: isActive ? 800 : 500,
                          letterSpacing: '0.02em',
                        }}
                        className="text-2xl md:text-3xl font-outfit transition-colors group-hover:text-[#C62828]"
                      >
                        {g.num}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CENTER COLUMN: Typography & Content Slider with Strict Zero-Overlap Physics */}
            <div className="lg:col-span-5 relative h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center lg:justify-start">
              {displayedGoals.map((g, i) => {
                const offset = i - smoothProg;
                const dist = Math.abs(offset);
                
                const plateau = 0.28;
                const transSpan = 0.20; 
                let opacity = 0;
                let translateY = 0;
                
                if (dist <= plateau) {
                  opacity = 1.0;
                  translateY = 0;
                } else if (dist < plateau + transSpan) {
                  const t = (dist - plateau) / transSpan;
                  opacity = 1 - t;
                  translateY = Math.sign(offset) * t * 25;
                } else {
                  opacity = 0;
                }

                if (opacity <= 0.01) return null;

                return (
                  <div
                    key={g.num}
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: '100%',
                      opacity: opacity,
                      transform: `translateY(${translateY}px) translateY(-50%)`,
                      top: '50%',
                      pointerEvents: dist < 0.35 ? 'auto' : 'none',
                    }}
                    className="text-center lg:text-left px-4 lg:px-0"
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold font-outfit text-[#111111] tracking-tight leading-[1.1] mb-4 sm:mb-6">
                      {g.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#444444] font-inter font-normal leading-relaxed max-w-[420px] mx-auto lg:mx-0 mb-6 sm:mb-8">
                      {g.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                      {g.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-black/10 text-xs sm:text-sm font-semibold text-[#333333] bg-white shadow-sm hover:shadow-md hover:border-black/20 hover:text-[#C62828] transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Minimal Rendered Images */}
            <div className="lg:col-span-4 relative h-[200px] sm:h-[260px] md:h-[420px] flex items-center justify-center">
              {displayedGoals.map((g, i) => {
                const offset = i - smoothProg;
                const dist = Math.abs(offset);
                
                const plateau = 0.25;
                const transSpan = 0.25; 
                let opacity = 0;
                let translateY = 0;
                let scale = 1;

                if (dist <= plateau) {
                  opacity = 1.0;
                  translateY = 0;
                  scale = 1;
                } else if (dist < plateau + transSpan) {
                  const t = (dist - plateau) / transSpan;
                  opacity = 1 - t;
                  translateY = Math.sign(offset) * t * 30;
                  scale = 1 - t * 0.05;
                } else {
                  opacity = 0;
                }

                if (opacity <= 0.01) return null;

                return (
                  <div
                    key={g.num}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: opacity,
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      pointerEvents: dist < 0.35 ? 'auto' : 'none',
                    }}
                  >
                    <div className="w-[180px] sm:w-[220px] md:w-[320px] lg:w-[380px] aspect-square flex items-center justify-center rounded-[32px] sm:rounded-[48px]">
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(198,40,40,0.15)] hover:scale-105 transition-transform duration-700 select-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* MOBILE VIEW: Vertical Scroll-Jacking Layout */
          <div className="w-full h-[550px] sm:h-[650px] relative flex items-center justify-center pt-8">
              {displayedGoals.map((g, i) => {
                const offset = i - smoothProg;
                const dist = Math.abs(offset);
                
                // Calculate horizontal translation based on scroll offset
                const translateX = offset * windowWidth * 0.85; // 85% of screen width per slide
                
                // Fade out slightly when off-center
                const opacity = Math.max(0, 1 - dist * 1.8);
                const scale = Math.max(0.8, 1 - dist * 0.15);

                if (opacity <= 0.01) return null;

                return (
                  <div
                    key={g.num}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: opacity,
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      pointerEvents: dist < 0.35 ? 'auto' : 'none',
                    }}
                    className="px-6 text-center"
                  >
                    {/* Image */}
                    <div className="w-[180px] sm:w-[220px] aspect-square flex items-center justify-center rounded-[32px] mb-6">
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(198,40,40,0.12)] select-none"
                      />
                    </div>
                    {/* Number & Title */}
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#C62828] shadow-[0_0_8px_rgba(198,40,40,0.6)]" />
                      <span className="text-xl font-outfit font-bold text-[#C62828]">{g.num}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-[#111111] tracking-tight leading-[1.1] mb-4">
                      {g.title}
                    </h3>
                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#444444] font-inter font-normal leading-relaxed max-w-[320px] mx-auto mb-4">
                      {g.description}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {g.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full border border-black/10 text-[0.7rem] font-semibold text-[#333333] bg-white shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
             })}
          </div>
        )}

        {/* ── EASY-NAV OVERLAY BUTTONS & DOTS (Solves stuck scroll and mobile navigation) ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex lg:hidden items-center gap-3 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/10 shadow-sm">
          {/* Prev Arrow */}
          <button
            onClick={() => handleNavClick(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            style={{ fontFamily: 'monospace' }}
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-black/10 transition bg-white shadow-sm font-bold text-sm ${activeIdx === 0 ? 'opacity-30 cursor-not-allowed text-gray-400' : 'hover:bg-red-50 text-red-600 active:scale-95'}`}
            aria-label="Previous Item"
          >
            &lt;
          </button>
          
          {/* Bullets */}
          <div className="flex items-center gap-1.5">
            {displayedGoals.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIdx ? 'bg-[#C62828] w-6' : 'bg-gray-300 hover:bg-gray-400 w-2.5'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => handleNavClick(Math.min(displayedGoals.length - 1, activeIdx + 1))}
            disabled={activeIdx === displayedGoals.length - 1}
            style={{ fontFamily: 'monospace' }}
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-black/10 transition bg-white shadow-sm font-bold text-sm ${activeIdx === displayedGoals.length - 1 ? 'opacity-30 cursor-not-allowed text-gray-400' : 'hover:bg-red-50 text-red-600 active:scale-95'}`}
            aria-label="Next Item"
          >
            &gt;
          </button>
        </div>

      </div>

      {/* Floating keyframes for the 3D sculpted icons */}
      <style>{`
        @keyframes goalIconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
};

export default Goals;
