import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { O } from '../assets';

const AboutShowcase = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      mirror: true,
      offset: 60
    });
    AOS.refreshHard();
    return () => {
      AOS.refresh();
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    containerRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="relative text-white overflow-hidden pb-20">
      <div className="bg-black -mb-20">
        <img src={O.wire} alt="Copper Wire Graphic" className="w-full h-2/3 object-contain" />
        
        <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row items-center relative">
          {/* Left Side: Large Gradient Animated Heading with Cursor Spotlight Reveal */}
          <div className="md:w-1/2 text-left md:pl-10" data-aos="fade-in">
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative py-4 select-none cursor-none overflow-hidden rounded-xl"
            >
              {/* Base text (lower opacity) */}
              <h1 className="font-inter text-5xl md:text-7xl font-bold leading-tight text-white/10 m-0">
                Manufacturing<br />Low Tension<br />Copper<br />Conductors
              </h1>

              {/* Spotlight Reveal Overlay */}
              <h1 
                className="absolute top-4 left-0 w-full font-inter text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-200% animate-gradient-animation text-transparent bg-clip-text pointer-events-none m-0"
                style={{
                  clipPath: isHovered ? 'circle(125px at var(--x, 0px) var(--y, 0px))' : 'circle(0px at 0px 0px)',
                  transition: 'clip-path 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                Manufacturing<br />Low Tension<br />Copper<br />Conductors
              </h1>

              {/* Creative Glowing Cursor Orb & Dot */}
              {isHovered && (
                <>
                  {/* Large Ambient Glow */}
                  <div 
                    className="pointer-events-none absolute w-[240px] h-[240px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl z-10"
                    style={{
                      left: 'calc(var(--x, 0px) - 120px)',
                      top: 'calc(var(--y, 0px) - 120px)',
                    }}
                  />
                  {/* Small Precise Cursor Dot */}
                  <div 
                    className="pointer-events-none absolute w-5 h-5 rounded-full border border-purple-500/80 bg-purple-500/30 z-20 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    style={{
                      left: 'calc(var(--x, 0px) - 10px)',
                      top: 'calc(var(--y, 0px) - 10px)',
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Right Side: Text & Read More Link with Certificate Links */}
          <div className="font-inter md:w-1/2 mt-6 md:mt-0 text-left p-4" data-aos="fade-in">
            <p className="mb-4 text-white leading-relaxed">
              An emerging manufacturer in the cable industry, the company boasts 30 years of core manufacturing experience and has been producing wires and cables independently for the past 4 years.
              <br />
              <a 
                href="/AMPPERE-CABLE-ISO-9001-2015-Final.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-red-600 font-bold hover:text-red-500 hover:underline transition-colors cursor-pointer"
              >
                Accredited with ISO-9001:2015 certification and registered under MSME
              </a>
              , the company also holds <a 
                href="/CE.jpeg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white font-bold hover:text-red-500 hover:underline transition-colors cursor-pointer"
              >
                CE
              </a> and <a 
                href="/RoHS AMPPERE CABLE.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white font-bold hover:text-red-500 hover:underline transition-colors cursor-pointer"
              >
                RoHS certifications
              </a>.
            </p>
            <p className="text-white mb-6 leading-relaxed">
              It serves a distinguished clientele, including Comfort Techno Solutions, Kiam Inc., Securex Systems, Virtue Automation & Control Solutions, Schneider Electric India Ltd., and many others across India, reflecting its commitment to quality and industry standards.
            </p>
            <div className="flex justify-start items-center relative pl-3 pt-3">
              <Link
                to="/about"
                className="relative inline-block bg-[#AE1B1B] text-white font-bold py-3 px-6 rounded hover:bg-red-700 transition"
              >
                READ MORE
                <span className="absolute border-t-2 border-l-2 border-red-600 top-0 left-0 w-8 h-8 -m-3"></span>
                <span className="absolute border-b-2 border-r-2 border-red-600 bottom-0 right-0 w-8 h-8 -m-3"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutShowcase;
