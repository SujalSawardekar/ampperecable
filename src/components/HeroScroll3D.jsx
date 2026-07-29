import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;
export const FRAME_SCROLL_VH = 1.8; // scroll vh to play all frames

const pad = (n) => String(n).padStart(3, '0');

const taglines = [
  "High-performance certified cables, trusted across industries.",
  "Engineered for maximum safety and unyielding reliability.",
  "Powering modern infrastructure with state-of-the-art precision.",
  "Your trusted partner in advanced cable manufacturing."
];

const HeroScroll3D = ({ isMobile = false }) => {
  const canvasRef  = useRef(null);
  const wrapRef    = useRef(null);
  const images     = useRef([]);
  const rafId      = useRef(null);
  const targetF    = useRef(0);
  const currentF   = useRef(0);
  const [progress, setProgress] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Parallax refs
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetMouseX = useRef(0);
  const targetMouseY = useRef(0);

  // Spotlight position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Count up state
  const [countProgress, setCountProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Reveal slightly before preloader is completely gone to overlap transitions smoothly
    const timer = setTimeout(() => setIsLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  // Count up trigger
  useEffect(() => {
    if (isLoaded) {
      let start = null;
      const duration = 2000; // 2s smooth ease-out count-up
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const p = Math.min(elapsed / duration, 1);
        // cubic ease out
        const ease = 1 - Math.pow(1 - p, 3);
        setCountProgress(ease);
        if (p < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isLoaded]);

  // Mouse move parallax tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientWidth, clientHeight } = document.documentElement;
      targetMouseX.current = (e.clientX / clientWidth) * 2 - 1;
      targetMouseY.current = (e.clientY / clientHeight) * 2 - 1;

      const rect = wrapRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx(prev => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* Preload */
  useEffect(() => {
    if (isMobile) return;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${pad(i)}.webp`;
      images.current[i - 1] = img;
    }
  }, [isMobile]);

  /* Scroll → frame mapping
     The sticky wrapper is inside a scroll-spacer in Home.jsx.
     We track scrollY relative to the spacer's top edge.
  */
  useEffect(() => {
    if (isMobile) {
      setProgress(0);
      return;
    }
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      // parent scroll-spacer's top relative to page
      const spacerTop = el.parentElement?.offsetTop ?? 0;
      const scrolled  = window.scrollY - spacerTop;
      // The animation always plays over the dedicated FRAME_SCROLL_VH height
      const maxScroll = FRAME_SCROLL_VH * window.innerHeight;
      const p = maxScroll <= 0 ? 0 : Math.max(0, Math.min(1, scrolled / maxScroll));
      setProgress(p);
      targetF.current = p * (TOTAL_FRAMES - 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  /* Render loop */
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx    = canvas.getContext('2d');
    const dpr    = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      currentF.current += (targetF.current - currentF.current) * 0.18;
      const idx = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, currentF.current)));
      const W = canvas.offsetWidth, H = canvas.offsetHeight;

      // Interpolate mouse parallax coordinates
      mouseX.current += (targetMouseX.current - mouseX.current) * 0.08;
      mouseY.current += (targetMouseY.current - mouseY.current) * 0.08;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#390609';
      ctx.fillRect(0, 0, W, H);

      const img = images.current[idx];
      if (img?.complete && img.naturalWidth) {
        const currentProg = currentF.current / (TOTAL_FRAMES - 1);
        // A gentle zoom (up to 1.10x) for a balanced motion
        const zoom = 1 + (currentProg * 0.10); 

        const baseScale  = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const s = baseScale * zoom;
        const dw = img.naturalWidth  * s;
        const dh = img.naturalHeight * s;

        // Apply dynamic mouse parallax offsets (dampened on scroll)
        const parallaxFactor = 22 * (1 - currentProg);
        const offsetX = mouseX.current * parallaxFactor;
        const offsetY = mouseY.current * parallaxFactor;

        ctx.drawImage(img, (W - dw) / 2 + offsetX, (H - dh) / 2 + offsetY, dw, dh);
      }
      ctx.restore();
      rafId.current = requestAnimationFrame(draw);
    };
    rafId.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  return (
    /*
      sticky top-0, height 100vh.
      Lives inside a tall scroll-spacer div in Home.jsx.
      As the spacer scrolls, this element stays pinned at top-0
      until the spacer bottom leaves the viewport.
      
      Intro Transition: Scales down from 1.12, fades in, and unblurs when loaded.
    */
    <div
      ref={wrapRef}
      style={{
        position: isMobile ? 'relative' : 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        zIndex: 20,
        background: '#390609',
        overflow: 'hidden',
      }}
      className={`transition-all duration-[1400ms] ease-out ${
        isLoaded ? 'scale-100 opacity-100 blur-0' : 'scale-[1.12] opacity-0 blur-[6px]'
      }`}
    >
      {isMobile ? (
        <img
          src="/mobile-hero.png"
          alt="Amppere Cable"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 10,
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      )}

      {/* Soft Black Vignette Background Overlay (easily visible on 1st frame, fades on scroll) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)',
          zIndex: 25,
          opacity: isLoaded ? Math.max(0, 1 - progress * 10) : 0,
          transition: 'opacity 0.4s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Interactive Cursor Spotlight Glow Overlay (Follows hover instantly on 1st frame) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 320px at ${mousePos.x}px ${mousePos.y}px, rgba(198, 40, 40, 0.15) 0%, transparent 100%)`,
          zIndex: 26,
          opacity: isLoaded && progress === 0 ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── CENTERED HEADING TITLE (Visible only on 1st frame / scroll = 0) ── */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '16vh' : '20vh',
          left: '50%',
          transform: isLoaded 
            ? (progress > 0.01 && !isMobile
                ? 'translateX(-50%) translateY(-50px)' 
                : 'translateX(-50%) translateY(0)') 
            : 'translateX(-50%) translateY(-20px)',
          zIndex: 30,
          opacity: isLoaded ? Math.max(0, 1 - progress * 12) : 0,
          transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
          pointerEvents: 'none',
          width: '100%',
          maxWidth: '900px',
        }}
        className="px-6 text-center select-none"
      >
        <h1 className="text-[15.5vw] sm:text-[8vw] md:text-[5vw] font-black uppercase tracking-tight leading-[0.92] text-white m-0 font-outfit overflow-hidden">
          <span style={{
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
            transitionDelay: '1050ms'
          }}>
            POWERING
          </span>
          <span style={{
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
            transitionDelay: '1200ms',
            textShadow: isLoaded ? '0 0 25px rgba(239, 68, 68, 0.45)' : 'none',
          }} className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#ff3b47] to-[#8d1118] py-1">
            WHAT MATTERS
          </span>
          <span style={{
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
            transitionDelay: '1350ms'
          }}>
            MOST
          </span>
        </h1>
      </div>

      {/* ── SEAMLESS FLYING BOTTOM CONTAINER (Taglines + Stats Card) ────────── */}
      <div 
        style={{
          position: 'absolute',
          zIndex: 30,
          opacity: isLoaded ? Math.max(0, 1 - Math.max(0, progress - 0.92) * 15) : 0,
          left: '50%',
          bottom: isMobile ? '1.75rem' : '4rem',
          transform: isLoaded 
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(20px)',
          transition: 'bottom 0.5s ease, opacity 0.4s ease-out',
          pointerEvents: isLoaded && (isMobile || progress < 0.95) ? 'auto' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '0.45rem' : '1.25rem',
          alignItems: 'center',
          width: '100%',
          maxWidth: isMobile ? '92%' : '850px',
        }}
        className="select-none"
      >
        {/* Tagline Over Box */}
        <div 
          style={{ 
            position: 'relative', 
            height: isMobile ? 'auto' : '2.2rem', 
            minHeight: isMobile ? '2.5rem' : 'auto',
            overflow: 'hidden', 
            width: '100%',
            transition: 'max-width 1s ease',
          }}
        >
          {taglines.map((text, idx) => {
            const isActive = taglineIdx === idx;
            return (
              <p 
                key={idx}
                style={{ 
                  position: isMobile && !isActive ? 'absolute' : (isActive && isMobile ? 'relative' : 'absolute'), 
                  top: 0, left: 0, width: '100%',
                  fontSize: isMobile ? '0.85rem' : '1.35rem', 
                  color: '#f3f4f6', 
                  margin: 0, fontWeight: 500,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'opacity 0.5s, transform 0.5s, font-size 0.5s, color 0.5s',
                  pointerEvents: isActive ? 'auto' : 'none',
                  textAlign: 'center',
                  whiteSpace: 'normal',
                }}
                className="font-inter leading-tight"
              >
                {text}
              </p>
            );
          })}
        </div>

        {/* Stats card (Seamless dimensions) */}
        <div 
          className="flex flex-row flex-nowrap justify-center items-center gap-1.5 md:gap-7 relative bg-[rgba(10,5,5,0.65)] backdrop-blur-[20px] saturate-[180%] border border-white/20 rounded-2xl md:rounded-[20px] p-2.5 md:px-9 md:py-4 text-white shadow-[0_20px_50px_0_rgba(0,0,0,0.65),0_0_30px_rgba(198,40,40,0.15)] w-full"
        >

          {/* Stat 1 */}
          <div className="flex flex-col md:flex-row gap-0.5 md:gap-2.5 items-center justify-center group">
            <span className="text-[1.25rem] sm:text-[1.75rem] md:text-[2.5rem] font-black leading-none font-outfit transition-all duration-300 group-hover:text-red-500 group-hover:scale-105 whitespace-nowrap">
              {Math.round(countProgress * 30)}+
            </span>
            <span className="text-[0.48rem] sm:text-[0.65rem] md:text-[0.8rem] text-slate-300 leading-tight text-center md:text-left font-medium font-inter mt-0.5 md:mt-0">Years Of<br className="hidden md:block"/>Experience</span>
          </div>
          
          <div className="w-px h-[28px] sm:h-[45px] bg-white/15" />
          
          {/* Stat 2 */}
          <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 items-center justify-center group">
            <span className="text-[1.25rem] sm:text-[1.75rem] md:text-[2.5rem] font-black leading-none font-outfit transition-all duration-300 group-hover:text-red-500 group-hover:scale-105 whitespace-nowrap">
              {Math.round(countProgress * 100)}+
            </span>
            <span className="text-[0.48rem] sm:text-[0.65rem] md:text-[0.8rem] text-slate-300 leading-tight text-center md:text-left font-medium font-inter mt-0.5 md:mt-0">Number Of<br className="hidden md:block"/>Clients</span>
          </div>
          
          <div className="w-px h-[28px] sm:h-[45px] bg-white/15" />
          
          {/* Stat 3 */}
          <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 items-center justify-center group">
            <span className="text-[1.25rem] sm:text-[1.75rem] md:text-[2.5rem] font-black leading-none font-outfit transition-all duration-300 group-hover:text-red-500 group-hover:scale-105 whitespace-nowrap">
              {Math.round(countProgress * 5000)}K+
            </span>
            <span className="text-[0.48rem] sm:text-[0.65rem] md:text-[0.8rem] text-slate-300 leading-tight text-center md:text-left font-medium font-inter mt-0.5 md:mt-0">Total Length<br className="hidden md:block"/>(Mtr)</span>
          </div>
        </div>
      </div>

      {/* Scroll hint (Adjusted proper at bottom-center on 1st frame, fades out on scroll) */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '2.2rem',
          left: '50%',
          transform: isLoaded ? `translate(-50%, ${progress * 40}px)` : 'translate(-50%, 20px)',
          opacity: isLoaded && progress < 0.08 ? Math.max(0, 1 - progress * 12) : 0,
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          pointerEvents: isLoaded && progress < 0.08 ? 'auto' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.68rem',
          fontFamily: 'monospace',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#e5e7eb',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          padding: '0.45rem 1rem',
          borderRadius: '999px',
          zIndex: 35,
        }}>
          <span style={{
            display: 'inline-block', width: '0.85rem', height: '1.2rem',
            border: '2px solid rgba(248,113,113,0.6)', borderRadius: '999px',
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute', top: '3px', left: '50%', transform: 'translateX(-50%)',
              width: '3px', height: '5px', background: '#fbbf24', borderRadius: '999px',
              animation: 'bounce 1s infinite',
            }} />
          </span>
          Scroll to explore
        </div>
      )}
    </div>
  );
};

export default HeroScroll3D;
