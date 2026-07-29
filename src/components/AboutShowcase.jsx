import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ─── READ MORE pill button (dark-bg inverted style) ──────────────────────────
// Mirrors the "View all clients" pill button but inverted:
//   Light sections: default=white, hover=red
//   Dark section  : default=red,   hover=white  (inverted so it's visible on black)
const ReadMoreBtn = ({ to }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: hovered ? '#ffffff' : '#C62828',
        color: hovered ? '#C62828' : '#ffffff',
        border: `1px solid ${hovered ? '#ffffff' : '#C62828'}`,
        padding: '10px 26px',
        borderRadius: 9999,
        fontWeight: 700,
        fontSize: 14,
        textDecoration: 'none',
        letterSpacing: '0.04em',
        transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 4px 18px rgba(198,40,40,0.25)' : '0 2px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      READ MORE
      <svg
        width="14" height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
      >
        <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
};


// ─── Progressive Word Reveal ──────────────────────────────────────────────────
// Splits text into spans with scroll-position-driven opacity.
// Each word goes from 0.35 → 1.0 opacity based on its index relative to scroll progress.

const DESCRIPTION_PARTS = [
  {
    type: 'text',
    content: 'An emerging manufacturer in the cable industry, the company boasts 30 years of core manufacturing experience and has been producing wires and cables independently for the past 4 years.',
  },
  {
    type: 'link',
    content: 'Accredited with ISO-9001:2015 certification and registered under MSME',
    href: '/AMPPERE-CABLE-ISO-9001-2015-Final.pdf',
    className: 'text-red-500 font-bold hover:text-red-400 hover:underline transition-colors cursor-pointer',
  },
  { type: 'text', content: ', the company also holds ' },
  {
    type: 'link',
    content: 'CE',
    href: '/CE.jpeg',
    className: 'text-white font-bold hover:text-red-400 hover:underline transition-colors cursor-pointer',
  },
  { type: 'text', content: ' and ' },
  {
    type: 'link',
    content: 'RoHS certifications',
    href: '/RoHS AMPPERE CABLE.pdf',
    className: 'text-white font-bold hover:text-red-400 hover:underline transition-colors cursor-pointer',
  },
  {
    type: 'text',
    content: '. It serves a distinguished clientele, including Comfort Techno Solutions, Kiam Inc., Securex Systems, Virtue Automation & Control Solutions, Schneider Electric India Ltd., and many others across India, reflecting its commitment to quality and industry standards.',
  },
];

// Build a flat list of word tokens from the DESCRIPTION_PARTS
function buildWordTokens() {
  const tokens = [];
  DESCRIPTION_PARTS.forEach((part, partIdx) => {
    const words = part.content.trim().split(/\s+/).filter(Boolean);
    words.forEach((word, wi) => {
      // Always add a trailing space so words/parts don't collide
      // Punctuation-only parts like ', ' or ' and ' are handled via their own content
      tokens.push({
        word,
        trailingSpace: ' ',
        type: part.type,
        href: part.href,
        className: part.className,
      });
    });
  });
  return tokens;
}

const wordTokens = buildWordTokens();
const TOTAL_WORDS = wordTokens.length;

const ProgressiveText = () => {
  const containerRef = useRef(null);
  const [wordProgress, setWordProgress] = useState(0); // 0 → TOTAL_WORDS

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start revealing when element is 80% down the screen, finish when element top is 20% from top
      const startY = vh * 0.85;  // element top enters here
      const endY = vh * 0.1;     // element top reaches here → all words revealed

      const top = rect.top;
      const progress = (startY - top) / (startY - endY);
      // Map progress to word count with a slight extension so last words reveal fully
      const words = Math.max(0, Math.min(TOTAL_WORDS, progress * TOTAL_WORDS * 1.1));
      setWordProgress(words);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <p
      ref={containerRef}
      className="mb-4 text-white leading-relaxed select-none"
      style={{ userSelect: 'none' }}
    >
      {wordTokens.map((token, i) => {
        // Each word starts revealing when wordProgress reaches its index
        // Full opacity when wordProgress exceeds index + 1
        const wordRevealStart = i;
        const wordRevealEnd = i + 1;
        const t = Math.max(0, Math.min(1, (wordProgress - wordRevealStart) / (wordRevealEnd - wordRevealStart)));
        const opacity = 0.35 + t * 0.65; // 0.35 → 1.0

        const style = {
          opacity,
          transition: 'opacity 0.1s ease',
          display: 'inline',
        };

        if (token.type === 'link') {
          return (
            <React.Fragment key={i}>
              <a
                href={token.href}
                target="_blank"
                rel="noopener noreferrer"
                className={token.className}
                style={style}
              >
                {token.word}
              </a>
              {token.trailingSpace}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={i}>
            <span style={style}>{token.word}</span>
            {token.trailingSpace}
          </React.Fragment>
        );
      })}
    </p>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const AboutShowcase = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Left heading reveal
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal({ threshold: 0.15 });
  // Button reveal
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    containerRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <div data-section="dark-content" className="relative text-white overflow-hidden">
      {/* Top Wave transition — always static, no animation */}
      <div className="bg-[#f4f4f4] w-full overflow-hidden">
        <img
          src="/Amppere Cable Wire cable black.png"
          alt="Copper Wire Graphic"
          className="w-full h-24 md:h-32 object-cover object-center block"
        />
      </div>

      {/* Main black content area — background is always static */}
      <div className="bg-black -mt-0.5 pb-6">
        <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row items-center relative">

          {/* Left Side: Large Gradient Animated Heading with Cursor Spotlight Reveal */}
          <div className="md:w-[55%] text-left md:pl-10">
            <div
              ref={headingRef}
              style={{
                opacity: headingVisible ? 1 : 0,
                transform: headingVisible ? 'translateY(0px)' : 'translateY(36px)',
                transition: 'opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative py-4 select-none rounded-xl"
              >
                {/* Base text (low opacity) */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-black font-outfit tracking-tight text-left leading-[1.05] text-white/10 m-0">
                  Manufacturing<br />Low Tension<br />Copper<br />Conductors
                </h1>

                {/* Cursor Spotlight Reveal (text only — background unaffected) */}
                <h1
                  className="absolute top-4 left-0 w-full text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-black font-outfit tracking-tight text-left leading-[1.05] bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-200% animate-gradient-animation text-transparent bg-clip-text pointer-events-none m-0"
                  style={{
                    clipPath: isHovered ? 'circle(160px at var(--x, 0px) var(--y, 0px))' : 'circle(0px at 0px 0px)',
                    transition: 'clip-path 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  Manufacturing<br />Low Tension<br />Copper<br />Conductors
                </h1>
              </div>
            </div>
          </div>

          {/* Right Side: Text & Read More Link with Certificate Links */}
          <div className="font-inter md:w-[45%] mt-6 md:mt-0 text-left p-4">

            {/* Progressive word-reveal description — covers entire company description */}
            <ProgressiveText />

            {/* READ MORE button — animated border corners expand on hover */}
            <div
              ref={buttonRef}
              className="flex justify-start items-center relative pl-3 pt-3"
              style={{
                opacity: buttonVisible ? 1 : 0,
                transform: buttonVisible ? 'translateY(0px)' : 'translateY(20px)',
                transition: 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) 160ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 160ms',
              }}
            >
              <ReadMoreBtn to="/about" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutShowcase;
