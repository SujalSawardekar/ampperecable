import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { O } from '../assets';

const productsData = [
  {
    title: "Fire Alarm Cables",
    image: O.productImg_1,
    description: "Designed to maintain critical communication across fire detection systems, ensuring instant alarms and rapid evacuation when every second matters.",
    link: "/product/Fire%20Alarm%20Cables"
  },
  {
    title: "Fire Resistant Cables",
    image: O.productImg_2,
    description: "Engineered to withstand extreme temperatures up to 950°C during fire emergencies, keeping emergency lighting, pumps, and alarms fully operational.",
    link: "/product/Fire%20Resistant%20Cables"
  },
  {
    title: "Smoke Detection Cables",
    image: O.productImg_3,
    description: "High-precision signal transmission with Low Smoke Zero Halogen (LSZH) insulation, preventing toxic smoke emissions in enclosed environments.",
    link: "/product/Smoke%20Detection%20Cables"
  },
  {
    title: "Power LT & Control Cables",
    image: O.productImg_4,
    description: "Heavy-duty low tension copper conductors built for industrial infrastructure, delivering uncompromising voltage stability and long-term durability.",
    link: "/product/Power%20LT%20Cables"
  }
];

const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  // Responsive scroll distances to prevent "endless scrolling" on mobile
  const isMobileSize = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const displayedProducts = productsData;

  // Make it extremely fast on mobile so they instantly see the next item
  const PX_PER_PROD = isMobileSize ? 250 : 700;
  const TOTAL_SCROLL = PX_PER_PROD * displayedProducts.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [smoothProg, setSmoothProg] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const targetProgRef = useRef(0);
  const currentProgRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      
      if (scrolled <= 0) {
        targetProgRef.current = 0;
      } else {
        targetProgRef.current = Math.min(displayedProducts.length - 1, scrolled / PX_PER_PROD);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [PX_PER_PROD, displayedProducts.length]);

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
      
      if (Math.abs(p - lastP) > 0.001) {
        setSmoothProg(p);
        setActiveIdx(Math.min(displayedProducts.length - 1, Math.max(0, Math.round(p))));
        lastP = p;
      }
      
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [displayedProducts.length]);

  // Click handler to smoothly scroll to any specific product slide
  const handleNavClick = (idx) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top + idx * PX_PER_PROD + 20;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="bg-white text-[#111111] font-inter w-full relative">
      


      {/* ── STICKY SQUIRCLE REEL VIEWPORT ─────────────────────────────────
          No overflow-hidden on ancestor section, ensuring 100% reliable
          sticky behavior across all 4 product items without blank space.
      */}
      <div
        ref={sectionRef}
        style={{
          height: `calc(100vh + ${TOTAL_SCROLL}px)`,
          position: 'relative',
        }}
        className="w-full"
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
          }}
        >
          {/* ── ABSOLUTE STICKY TITLE (Like OUR GOALS) ────────────────────────────── */}
          <div className="absolute top-24 md:top-32 left-6 md:left-16 z-30 flex flex-col gap-1">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit tracking-tight text-left m-0">
              <span className="text-[#C62828] mr-3">OUR</span>
              <span className="text-[#111111]">PRODUCT</span>
            </h2>
          </div>

          {/* ── ABSOLUTE VIEW ALL BUTTON (Top Right) ────────────────────────────── */}
          <div className="absolute top-24 md:top-32 right-6 md:right-16 z-30 hidden md:block">
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 bg-white border border-neutral-200 text-neutral-900 px-7 py-3 rounded-full font-bold text-sm hover:bg-[#C62828] hover:text-white hover:border-[#C62828] transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <span>View all products</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Symmetrical 3-6-3 Grid Stage for perfect ZeroCircle proportions & generous breathing room */}
          {/* Symmetrical 3-6-3 Grid Stage for perfect ZeroCircle proportions & generous breathing room */}
          {windowWidth >= 1024 ? (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 items-center justify-center relative h-[420px] sm:h-[500px] lg:h-[600px]">
              
              {/* LEFT COLUMN (3 cols): Premium Outfit ExtraBold Right-Aligned Titles */}
              <div className="lg:col-span-3 relative h-[60px] sm:h-[80px] lg:h-full flex items-center justify-center lg:justify-end order-1 lg:order-1 z-20 pointer-events-none lg:pr-8 xl:pr-12">
                {displayedProducts.map((prod, i) => {
                  const offset = i - smoothProg;
                  const dist = Math.abs(offset);
                  
                  const plateau = 0.28;
                  const transSpan = 0.25;
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
                      key={prod.title}
                      style={{
                        position: 'absolute',
                        right: 0,
                        width: '100%',
                        opacity: opacity,
                        transform: `translateY(${translateY}px)`,
                        pointerEvents: dist < 0.35 ? 'auto' : 'none',
                      }}
                      className="text-center lg:text-right px-4 lg:px-0"
                    >
                      <Link 
                        to={prod.link} 
                        className="inline-block group hover:opacity-80 transition-opacity"
                      >
                        <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold font-outfit text-[#111111] tracking-tight leading-tight group-hover:text-[#C62828] transition-colors m-0">
                          {prod.title}
                        </h3>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* CENTER COLUMN (6 cols): ZeroCircle Sticky Squircle Reel */}
              <div className="lg:col-span-6 relative h-[260px] sm:h-[340px] lg:h-[460px] flex items-center justify-center order-2 lg:order-2 z-10">
                <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-[#e3d7ff]/40 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-[#ffcce6]/35 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-[#dcf2f1]/40 rounded-full blur-[90px] pointer-events-none" />
                {displayedProducts.map((prod, i) => {
                  const offset = i - smoothProg;
                  const absOff = Math.abs(offset);

                  const scale = Math.max(0.48, 1 - absOff * 0.52);
                  const baseTranslate = windowWidth >= 1024 ? 380 : 320;
                  const translateY = offset * baseTranslate; 
                  
                  const fadeStart = windowWidth >= 1024 ? 1.25 : 0.8;
                  const opacity = Math.max(0, 1 - Math.max(0, absOff - fadeStart) * 2);
                  const zIndex = absOff < 0.3 ? 20 : (absOff < 1.1 ? 10 : 1);

                  if (opacity <= 0.01) return null;

                  return (
                    <div
                      key={prod.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `translateY(${translateY}px) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                        pointerEvents: absOff < 0.4 ? 'auto' : 'none',
                        transition: 'opacity 0.05s linear',
                      }}
                    >
                      <Link
                        to={prod.link}
                        className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-[420px] aspect-square rounded-[48px] sm:rounded-[60px] md:rounded-[68px] overflow-hidden bg-[#F2F4F7] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:shadow-[0_28px_64px_rgba(198,40,40,0.2)] hover:border-[#C62828]/40 transition-all duration-500 flex items-center justify-center relative group block"
                      >
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none block"
                        />
                        <div className="absolute bottom-6 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-xs font-bold text-[#111111] shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 border border-black/10">
                          <span>Explore {prod.title}</span>
                          <svg className="w-3.5 h-3.5 text-[#C62828]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT COLUMN (3 cols): Left-Aligned Clean Descriptive Paragraphs */}
              <div className="lg:col-span-3 relative h-[80px] sm:h-[100px] lg:h-full flex items-center justify-center lg:justify-start order-3 lg:order-3 z-20 pointer-events-none lg:pl-8 xl:pr-12">
                {displayedProducts.map((prod, i) => {
                  const offset = i - smoothProg;
                  const dist = Math.abs(offset);
                  
                  const plateau = 0.28;
                  const transSpan = 0.25;
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
                      key={prod.title}
                      style={{
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        opacity: opacity,
                        transform: `translateY(${translateY}px)`,
                        pointerEvents: dist < 0.35 ? 'auto' : 'none',
                      }}
                      className="text-center lg:text-left px-4 lg:px-0"
                    >
                      <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#444444] font-normal font-inter leading-relaxed m-0 max-w-sm mx-auto lg:mx-0">
                        {prod.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            /* MOBILE / TABLET VIEW: Vertical Scroll-Jacking Layout */
            <div className="w-full h-[550px] sm:h-[650px] relative flex items-center justify-center pt-16">
              {displayedProducts.map((prod, i) => {
                const offset = i - smoothProg;
                const dist = Math.abs(offset);
                
                // Horizontal movement based on offset
                const translateX = offset * windowWidth * 0.85; // 85% of width
                
                // Fade out off-center items
                const opacity = Math.max(0, 1 - dist * 1.8);
                const scale = Math.max(0.8, 1 - dist * 0.15);

                if (opacity <= 0.01) return null;

                return (
                  <div
                    key={prod.title}
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
                    <Link to={prod.link} className="inline-block group mb-6 hover:opacity-80 transition-opacity max-w-[280px] mx-auto">
                      <h3 className="text-3xl sm:text-4xl font-extrabold font-outfit text-[#111111] group-hover:text-[#C62828] transition-colors m-0 leading-tight max-w-[280px] mx-auto">
                        {prod.title}
                      </h3>
                    </Link>

                    <Link
                      to={prod.link}
                      className="w-[240px] sm:w-[280px] aspect-square rounded-[40px] sm:rounded-[48px] overflow-hidden bg-[#F2F4F7] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:shadow-[0_28px_64px_rgba(198,40,40,0.2)] mb-8 flex items-center justify-center relative group block transition-all"
                    >
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover select-none block group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>

                    <p className="text-sm sm:text-base text-[#444444] font-normal font-inter leading-relaxed max-w-[280px] sm:max-w-sm mx-auto m-0 px-2">
                      {prod.description}
                    </p>
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
            {displayedProducts.map((_, idx) => (
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
            onClick={() => handleNavClick(Math.min(displayedProducts.length - 1, activeIdx + 1))}
            disabled={activeIdx === displayedProducts.length - 1}
            style={{ fontFamily: 'monospace' }}
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-black/10 transition bg-white shadow-sm font-bold text-sm ${activeIdx === displayedProducts.length - 1 ? 'opacity-30 cursor-not-allowed text-gray-400' : 'hover:bg-red-50 text-red-600 active:scale-95'}`}
            aria-label="Next Item"
          >
            &gt;
          </button>
        </div>

      </div>
    </div>

    </section>
  );
};

export default ProductShowcase;
