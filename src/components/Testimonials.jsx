import React, { useState, useEffect } from 'react';
import { O } from '../assets';
import { useScrollReveal } from '../hooks/useScrollReveal';

const testimonialsData = [
  {
    id: 1,
    name: "Junani Fire Industries",
    text: '"Amppere\'s cables offer unmatched quality and durability, with outstanding customer service. They\'ve been a crucial supplier for our fire safety systems, and their dedication to excellence ensures our continued partnership. "',
    imageUrl: O.review1
  },
  {
    id: 2,
    name: "Nexus Engineering",
    text: '"Amppere provides dependable cabling solutions that meet our rigorous standards. Their consistent product quality and prompt delivery are essential to our engineering projects, making them a valued and trusted partner. "',
    imageUrl: O.nexus
  },
  {
    id: 3,
    name: "KIAM INTL PVT LTD.",
    text: '" Amppere\'s cabling materials are top- notch, and their on - time delivery is impressive.Theyve been crucial to our banking and retail projects, and their reliability makes them a valuable partner.Were excited to continue working with them. "',
    imageUrl: O.review3
  },
  {
    id: 4,
    name: "SCHNEIDER ELECTRIC",
    text: '"Amppere consistently delivers high-quality cabling materials and meets deadlines, which is vital for our operations. Their dependability has built our trust, and we are eager to expand our business relationship. Their exceptional service sets them apart."',
    imageUrl: O.review4
  }
];

const Testimonials = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Scroll reveal — only for the inner content wrapper, NOT the black background
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slideCount = isMobile ? testimonialsData.length : Math.ceil(testimonialsData.length / 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideCount]);

  // Group testimonials by 1 on mobile, by 2 on desktop
  const slides = isMobile
    ? testimonialsData.map((item) => [item])
    : Array.from({ length: Math.ceil(testimonialsData.length / 2) }).map((_, idx) =>
        testimonialsData.slice(idx * 2, idx * 2 + 2)
      );

  return (
    // The outer black container is ALWAYS fully visible — no AOS, no fade-in on the background
    <div className="relative w-full h-[540px] md:h-[480px] overflow-hidden bg-black -mt-1">

      {/* Inner content wrapper — this is the ONLY thing that animates in */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0px)' : 'translateY(32px)',
          transition: 'opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Slide strip */}
        <div
          className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="flex w-full h-full flex-shrink-0 p-4 md:py-16 md:px-36 items-center justify-center bg-black"
            >
              <div className="flex w-full max-w-6xl mx-auto flex-col md:flex-row justify-center items-stretch gap-8 md:gap-16">
                {slide.map((item) => (
                  <div
                    key={item.id}
                    className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center"
                  >
                    <div
                      className="relative rounded-xl bg-white text-center text-black p-6 overflow-visible w-full flex flex-col justify-between"
                      style={{
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        minHeight: '260px'
                      }}
                    >
                      {/* Floating Logo/Icon */}
                      <div className="relative w-20 h-20 mx-auto -mt-16 mb-6 rounded-full overflow-hidden shadow-md bg-white border border-gray-100 flex items-center justify-center p-2">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full max-h-12 object-contain"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2 font-inter">{item.name}</h3>
                        <p className="text-xs md:text-sm mb-12 font-inter leading-relaxed italic text-gray-700">
                          {item.text}
                        </p>
                      </div>

                      {/* Review Stars */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
                        <span className="text-[#F4E134] text-2xl text-center font-semibold">
                          {"★".repeat(5)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators / Navigation Bullets */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center mt-6 pb-4 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-7 h-3 mx-1 rounded transition-colors duration-300 ${
                idx === slideIndex ? 'bg-red-600' : 'bg-red-900'
              }`}
              onClick={() => setSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
