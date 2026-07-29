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
const PX_PER_GOAL = 950;
const TOTAL_SCROLL = PX_PER_GOAL * goalsData.length;

export default function Goals() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [smoothProg, setSmoothProg] = useState(0);
  const targetProgRef = useRef(0);
  const currentProgRef = useRef(0);
  const rafRef = useRef(null);

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
        targetProgRef.current = Math.min(goalsData.length - 1, scrolled / PX_PER_GOAL);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Ultra-smooth animation loop with gentler damping (0.07)
  useEffect(() => {
    const loop = () => {
      const diff = targetProgRef.current - currentProgRef.current;
      if (Math.abs(diff) > 0.0002) {
        currentProgRef.current += diff * 0.07;
      } else {
        currentProgRef.current = targetProgRef.current;
      }
      
      const p = currentProgRef.current;
      setSmoothProg(p);
      setActiveIdx(Math.min(goalsData.length - 1, Math.max(0, Math.round(p))));
      
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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

        {/* Main 3-Column Responsive Layout */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-32 md:pt-24">
          
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
              {goalsData.map((g, i) => {
                const offset = i - smoothProg;
                const angleDeg = offset * ANGLE_STEP;
                const angleRad = (angleDeg * Math.PI) / 180;

                const y = RADIUS * Math.sin(angleRad);
                const x = RADIUS * (Math.cos(angleRad) - 1);

                const dist = Math.abs(offset);
                const isActive = dist < 0.45;
                const scale = Math.max(0.75, 1 - dist * 0.2);
                // Aggressive fade out so items completely disappear before they can overlap the title
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
                    {/* Active Red Dot Indicator */}
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
          <div className="lg:col-span-5 relative h-[360px] md:h-[400px] flex items-center justify-center lg:justify-start">
            {goalsData.map((g, i) => {
              const offset = i - smoothProg;
              const dist = Math.abs(offset);
              
              // STRICT ZERO-OVERLAP MATH:
              // Plateau up to 0.28. Fades out completely by 0.48.
              // Since any slide with dist >= 0.48 has 0% opacity and visibility: hidden,
              // two slides CAN NEVER be visible or overlap at the same time!
              const plateau = 0.28;
              const transSpan = 0.20; // 0.28 + 0.20 = 0.48 cutoff
              let opacity = 0;
              let translateY = 0;
              
              if (dist <= plateau) {
                opacity = 1.0;
                translateY = 0;
              } else if (dist < plateau + transSpan) {
                const t = (dist - plateau) / transSpan; // 0 to 1
                opacity = 1 - t;
                translateY = Math.sign(offset) * t * 70; // slides 70px away as it fades
              } else {
                opacity = 0;
                translateY = Math.sign(offset) * 70;
              }

              const isVisible = opacity > 0.01;
              if (!isVisible) return null;

              return (
                <div
                  key={g.num}
                  style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    top: i === 0 ? 'auto' : '50%',
                    left: 0,
                    width: '100%',
                    transform: i === 0 
                      ? (dist > 0.001 ? `translateY(${translateY}px)` : 'none') 
                      : `translateY(calc(-50% + ${translateY}px))`,
                    opacity: opacity,
                    pointerEvents: dist < 0.35 ? 'auto' : 'none',
                    zIndex: dist < 0.35 ? 10 : 1,
                  }}
                  className="flex flex-col justify-center text-center lg:text-left px-4 lg:px-0"
                >
                  {/* Mobile Goal Number Badge */}
                  <div className="flex lg:hidden items-center justify-center gap-2 mb-4">
                    <span style={{ background: '#C62828' }} className="w-2 h-2 rounded-full" />
                    <span style={{ color: '#C62828' }} className="font-bold tracking-wider text-sm">
                      GOAL {g.num}
                    </span>
                  </div>

                  {/* Title — Uses Amppere's native Outfit font */}
                  <h3
                    style={{
                      color: '#111111',
                      lineHeight: 1.15,
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit mb-6 whitespace-pre-line tracking-tight drop-shadow-sm"
                  >
                    {g.title}
                  </h3>

                  {/* Description — Uses native Inter font */}
                  <p
                    style={{
                      color: '#555555',
                      lineHeight: 1.75,
                    }}
                    className="text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 font-normal"
                  >
                    {g.description}
                  </p>

                  {/* Pill Tags */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                    {g.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: '#FFFFFF',
                          color: '#222222',
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                        }}
                        className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 hover:border-[#C62828] hover:text-[#C62828] hover:shadow-[0_4px_12px_rgba(198,40,40,0.12)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: 3D Sculpted Icons with Strict Zero-Overlap Physics */}
          <div className="lg:col-span-4 relative h-[280px] sm:h-[360px] md:h-[420px] flex items-center justify-center">
            {/* Ambient Gradients to match the soft red/pink minimal aesthetic */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#ffcccc]/25 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#ffe6e6]/20 rounded-full blur-[90px] pointer-events-none" />

            {goalsData.map((g, i) => {
              const offset = i - smoothProg;
              const dist = Math.abs(offset);
              
              // 3D Parallax Zero-Overlap Math
              // Fades out completely by dist = 0.48 so icons NEVER overlap
              const plateau = 0.26;
              const transSpan = 0.22; // 0.26 + 0.22 = 0.48 cutoff
              let opacity = 0;
              let scale = 0.7;
              let rotateDeg = 0;
              let translateY = 0;

              if (dist <= plateau) {
                opacity = 1.0;
                scale = 1.0;
                rotateDeg = 0;
                translateY = 0;
              } else if (dist < plateau + transSpan) {
                const t = (dist - plateau) / transSpan;
                opacity = 1 - t;
                scale = 1 - t * 0.25;
                rotateDeg = -offset * 20; // smooth 3D tilt during transition
                translateY = offset * 60;
              } else {
                opacity = 0;
              }

              const isVisible = opacity > 0.01;
              if (!isVisible) return null;

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
                    transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotateDeg}deg)`,
                    transition: 'opacity 0.05s linear',
                    pointerEvents: dist < 0.35 ? 'auto' : 'none',
                    zIndex: dist < 0.35 ? 10 : 1,
                  }}
                >
                  <img
                    src={g.image}
                    alt={g.title}
                    style={{
                      filter: 'drop-shadow(0 28px 50px rgba(198, 40, 40, 0.25)) drop-shadow(0 12px 24px rgba(0, 0, 0, 0.15))',
                      animation: dist < 0.25 ? 'goalIconFloat 5s ease-in-out infinite' : 'none',
                    }}
                    className="w-48 sm:w-64 md:w-80 max-h-[85%] object-contain select-none"
                  />
                </div>
              );
            })}
          </div>

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
}
