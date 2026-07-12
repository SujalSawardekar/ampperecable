import React, { useState, useEffect, useRef } from 'react';
import { O } from '../assets';

const bannerData = [
  {
    id: 1,
    title: "Fire Survival Cable",
    description: "Our extensive cable product line is engineered to meet the highest standards in the industry.",
    imageUrl: O.banner1
  },
  {
    id: 2,
    title: "Optical Fiber",
    description: "Delivering high-performance optical fiber cables for fast and reliable data transmission.",
    imageUrl: O.banner2
  },
  {
    id: 3,
    title: "Power Cables",
    description: "Durable power cables designed to meet diverse industrial needs with the utmost reliability.",
    imageUrl: O.banner3
  },
  {
    id: 4,
    title: "Precision Instrumentation",
    description: "Precision instrumentation cables engineered for accuracy in the most demanding environments.",
    imageUrl: O.banner4
  },
  {
    id: 5,
    title: "Flexible Cables",
    description: "Highly flexible cables crafted to withstand continuous movement and mechanical stress.",
    imageUrl: O.banner5
  }
];

const statsData = [
  { value: "5000K+", label: "Total Cable Length\nManufactured (Mtr)" },
  { value: "100+", label: "Number Of\nClients" },
  { value: "30+", label: "Years Of\nExperience" }
];

const AUTOSLIDE_INTERVAL = 5000; // 5 seconds

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideVisible, setSlideVisible] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const animStartRef = useRef(null);
  const activeSlideRef = useRef(activeSlide);
  
  activeSlideRef.current = activeSlide;

  const startProgressBar = () => {
    cancelAnimationFrame(animFrameRef.current);
    setProgressWidth(0);
    animStartRef.current = performance.now();
    
    const animate = (time) => {
      const elapsed = time - animStartRef.current;
      const pct = Math.min((elapsed / AUTOSLIDE_INTERVAL) * 100, 100);
      setProgressWidth(pct);
      if (pct < 100) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    animFrameRef.current = requestAnimationFrame(animate);
  };

  const handleSlideChange = (nextIndex) => {
    setSlideVisible(false);
    setTimeout(() => {
      setActiveSlide(nextIndex);
      setSlideVisible(true);
      startProgressBar();
    }, 400);
  };

  const resetAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleSlideChange((activeSlideRef.current + 1) % bannerData.length);
    }, AUTOSLIDE_INTERVAL);
  };

  useEffect(() => {
    startProgressBar();
    resetAutoplay();
    return () => {
      clearInterval(timerRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePrevSlide = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animFrameRef.current);
    const prevIndex = (activeSlide - 1 + bannerData.length) % bannerData.length;
    handleSlideChange(prevIndex);
    resetAutoplay();
  };

  const handleNextSlide = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animFrameRef.current);
    const nextIndex = (activeSlide + 1) % bannerData.length;
    handleSlideChange(nextIndex);
    resetAutoplay();
  };

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] md:h-[85vh] overflow-hidden bg-black select-none -mt-[1px]">
      {bannerData.map((banner, i) => (
        <div
          key={banner.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === activeSlide ? 1 : 0 }}
        >
          <img
            src={banner.imageUrl}
            alt={banner.title}
            draggable={false}
            className="w-full h-full object-cover object-center block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
      ))}

      {/* Slide Text Content Container */}
      <div className="absolute inset-x-0 bottom-36 sm:bottom-44 md:bottom-48 lg:bottom-48 z-10 flex items-end pointer-events-none px-4 sm:px-10 md:px-10 lg:px-10">
        <div
          className="max-w-xl transition-all duration-[400ms] ease-out"
          style={{
            opacity: slideVisible ? 1 : 0,
            transform: slideVisible ? 'translateY(0px)' : 'translateY(20px)'
          }}
        >
          <p className="hidden sm:block text-white font-medium leading-relaxed text-lg sm:text-xl md:text-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-sm md:max-w-2xl">
            {bannerData[activeSlide].description}
          </p>
        </div>
      </div>

      {/* Control panel and Statistics Card overlays */}
      <div className="absolute z-20 flex items-end justify-between flex-wrap gap-2 bottom-4 left-2 right-2 sm:bottom-8 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8 lg:bottom-8 lg:left-10 lg:right-10">
        {/* Statistics Block */}
        <div className="relative flex items-stretch border border-white/40 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-white/10 to-transparent">
          <div className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
          {statsData.map((stat, i) => (
            <React.Fragment key={stat.value}>
              <div className="flex flex-col items-center justify-center text-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-5 lg:px-10 lg:py-6 gap-1">
                <span className="text-white font-black leading-none whitespace-nowrap text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  {stat.value}
                </span>
                <span className="text-gray-200 font-medium whitespace-pre-line leading-snug text-xs sm:text-xs md:text-sm">
                  {stat.label}
                </span>
              </div>
              {i < statsData.length - 1 && (
                <div className="self-center h-[30px] md:h-[50px] w-[1px] my-2 sm:my-3 bg-white/70 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Carousel Sliders Navigation */}
        <div className="flex flex-col items-center sm:items-stretch bg-transparent sm:bg-white/10 border-transparent sm:border sm:border-white/30 shadow-none sm:shadow-[0_8px_30px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)] rounded-none sm:rounded-xl px-0 py-0 sm:px-8 sm:py-4 md:px-10 md:py-5 gap-3 flex-shrink-0 w-full sm:w-auto">
          <div className="hidden sm:flex items-center justify-between gap-2 sm:gap-3">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="bg-transparent border-0 p-0 cursor-pointer text-white hover:text-red-400 transition-all duration-200 hover:-translate-x-1 focus:outline-none flex items-center"
            >
              <svg viewBox="0 0 100 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-4 sm:w-16 sm:h-5">
                <path d="M95 12H5M5 12l10-7M5 12l10 7" />
              </svg>
            </button>
            <div className="flex items-center justify-center gap-2 sm:gap-4 h-[22px] min-w-[120px] sm:min-w-[160px]">
              <span className="text-white font-bold leading-none whitespace-nowrap text-sm sm:text-lg tracking-wide">
                {activeSlide + 1}/{bannerData.length}
              </span>
            </div>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="bg-transparent border-0 p-0 cursor-pointer text-white hover:text-red-400 transition-all duration-200 hover:translate-x-1 focus:outline-none flex items-center"
            >
              <svg viewBox="0 0 100 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-4 sm:w-16 sm:h-5">
                <path d="M5 12h90M95 12l-10-7M95 12l-10 7" />
              </svg>
            </button>
          </div>
          <div className="w-full mt-2 md:mt-1 h-[2px] sm:h-[3px] bg-transparent sm:bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-[width] duration-[50ms] ease-linear"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
