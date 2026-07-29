import React from 'react';

const DesktopRequired = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(circle at center, #210305 0%, #080001 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Inter', sans-serif",
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient glowing circles */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(198, 40, 40, 0.15)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem',
        }}
      >
        {/* Animated Premium SVG Laptop Illustration */}
        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            fill="none" 
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            {/* Screen Outline */}
            <rect 
              x="16" 
              y="20" 
              width="88" 
              height="58" 
              rx="6" 
              stroke="#ef4444" 
              strokeWidth="3.5" 
              strokeLinejoin="round"
              fill="rgba(198, 40, 40, 0.05)"
            />
            {/* Display Content Lines */}
            <path 
              d="M 32 36 L 64 36 M 32 46 L 88 46 M 32 56 L 76 56" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            {/* Screen Inner Glow */}
            <rect 
              x="20" 
              y="24" 
              width="80" 
              height="50" 
              rx="4" 
              fill="url(#glowGradient)" 
              opacity="0.15"
            />
            {/* Base/Keyboard Part */}
            <path 
              d="M 6 86 C 6 82 10 78 15 78 L 105 78 C 110 78 114 82 114 86 C 114 87 113 88 111 88 L 9 88 C 7 88 6 87 6 86 Z" 
              fill="#ffffff" 
              opacity="0.9"
            />
            {/* Trackpad */}
            <rect 
              x="48" 
              y="80" 
              width="24" 
              height="4" 
              rx="1.5" 
              fill="#111111" 
              opacity="0.3"
            />
            
            <defs>
              <linearGradient id="glowGradient" x1="60" y1="20" x2="60" y2="78" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Tag */}
        <div 
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#ef4444',
            background: 'rgba(198, 40, 40, 0.1)',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          Desktop Experience Required
        </div>

        {/* Heading */}
        <h1 
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            margin: 0,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(to bottom, #ffffff 60%, #a3a3a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Best Experienced on Desktop
        </h1>

        {/* Description Text */}
        <p 
          style={{
            fontSize: '0.925rem',
            color: '#d4d4d4',
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 400,
            padding: '0 0.5rem',
          }}
        >
          This website is designed for desktop and laptop devices to provide the intended interactive experience. Mobile devices, including browsers using 'Desktop Site' mode, are not supported and may not display the website correctly.
        </p>

        {/* Footnote */}
        <div 
          style={{
            marginTop: '1.5rem',
            fontSize: '0.7rem',
            color: '#737373',
            letterSpacing: '0.05em',
          }}
        >
          AMPPERE CABLE &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default DesktopRequired;
