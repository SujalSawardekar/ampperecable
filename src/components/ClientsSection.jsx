import React from 'react';
import { Link } from 'react-router-dom';
import { O } from '../assets';

const clientLogos = [
  { name: "Schneider Electric", logo: O.comany1 },
  { name: "Kotak", logo: O.comany6 },
  { name: "Mahindra Aerospace", logo: O.comany11 },
  { name: "PNB", logo: O.comany5 },
  { name: "Dell", logo: O.comany4 },
  { name: "MindSpace", logo: O.comany3 },
  { name: "NXP Semiconductors", logo: O.comany13 },
  { name: "Kiam", logo: O.review3 }
];

const ClientsSection = React.memo(() => {
  return (
    <section className="bg-[#f4f4f4] py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden font-inter border-y border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-16 lg:gap-8">
          
          {/* ── LEFT SIDE: Text Block (1/3 width) ────────────────────────────── */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center relative z-20">
            
            {/* Matching Section Title Style (Like OUR GOALS) */}
            <div className="flex flex-col gap-1 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  style={{ background: '#C62828' }}
                  className="w-2 h-2 rounded-full inline-block animate-pulse"
                />
                <p
                  style={{ color: '#C62828' }}
                  className="text-xs font-bold tracking-[0.25em] uppercase m-0"
                >
                  Trusted Partners
                </p>
              </div>
              <div className="flex items-baseline gap-2 mt-1 font-outfit text-left">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit tracking-tight text-left m-0">
                  <span style={{ color: '#C62828' }} className="mr-3">OUR</span>
                  <span style={{ color: '#111111' }}>CLIENTS</span>
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-neutral-600 font-inter leading-relaxed max-w-sm mb-10">
              Amppere Cable has the opportunity to work with many prestigious clients across industrial, aerospace, and commercial sectors.
            </p>

            {/* Action Button */}
            <div>
              <Link
                to="/clients"
                className="inline-flex items-center gap-2.5 bg-white border border-neutral-200 text-neutral-900 px-7 py-3 rounded-full font-bold text-sm hover:bg-[#C62828] hover:text-white hover:border-[#C62828] transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <span>View all clients</span>
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
          </div>

          {/* ── RIGHT SIDE: Marquee Rows (2/3 width) ────────────────────────────── */}
          <div className="w-full lg:w-2/3 relative flex flex-col gap-y-12 overflow-hidden py-10 mask-edges">
            
            {/* Subtle gradient masks for smooth fade at horizontal edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-r from-[#f4f4f4] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-l from-[#f4f4f4] to-transparent z-10 pointer-events-none" />

            {/* Row 1: Left to Right */}
            <div className="flex animate-marquee whitespace-nowrap items-center gap-16 md:gap-24">
              {clientLogos.concat(clientLogos).map((logo, idx) => (
                <div key={`row1-${idx}`} className="flex items-center justify-center flex-shrink-0">
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Row 2: Right to Left */}
            <div className="flex animate-marquee whitespace-nowrap items-center gap-16 md:gap-24" style={{ animationDirection: 'reverse' }}>
              {clientLogos.slice().reverse().concat(clientLogos.slice().reverse()).map((logo, idx) => (
                <div key={`row2-${idx}`} className="flex items-center justify-center flex-shrink-0">
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      <style>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
});

export default ClientsSection;
