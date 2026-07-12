import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../products';
import { categories } from '../categories';

// Navigation Arrow Button Component (Ou)
const SliderNavButton = ({ dir, onClick, disabled }) => {
  const isNext = dir === 'next';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "1px solid #dcdcdc",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        color: "#E91F1F",
        transition: "all 0.25s ease"
      }}
      className="hover:shadow-md active:scale-95 focus:outline-none"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isNext ? (
          <path d="M9 5l7 7-7 7" />
        ) : (
          <path d="M15 19l-7-7 7-7" />
        )}
      </svg>
    </button>
  );
};

// Individual Product Card Slide Component (Bg)
export const ProductCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const description = item.description || (item.data && item.data[0] ? item.data[0].description : "");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        padding: "20px 20px 24px 20px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        minHeight: "420px",
        width: "100%",
        userSelect: "none",
        backgroundColor: "#ffffff",
        border: "1px solid #eaeaea"
      }}
      className={hovered ? "transform -translate-y-1" : ""}
    >
      <div style={{ borderRadius: "1px", overflow: "hidden", background: "linear-gradient(160deg, #b0c8e8 0%, #2a4a8a 55%, #1a2f6a 100%)", flex: "0 0 auto", height: "260px", position: "relative" }}>
        <img
          src={item.headerImg}
          alt={item.productName}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center bottom",
            display: "block",
            transformOrigin: "center bottom",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(.22,1,.36,1)"
          }}
        />
      </div>
      <p style={{ color: "#000000", fontSize: "0.95rem", lineHeight: "1.6", margin: "20px 0 0 0", flexGrow: 1, fontFamily: "sans-serif", fontWeight: 400 }}>
        {description ? (description.length > 100 ? description.slice(0, 100) + "…" : description) : `${item.productName} engineered for optimal performance, durability, and safety.`}
      </p>
      <div style={{ height: "1px", background: "#f0f0f0", margin: "20px 0 16px", flexShrink: 0 }} />
      
      <div style={{ display: "flex", alignItems: "center", justifySpaceBetween: "space-between", flexShrink: 0, justifyContent: "space-between" }}>
        <span style={{ color: "#E91F1F", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.01em", transform: hovered ? "translateX(10px)" : "translateX(0)", transition: "transform 0.35s cubic-bezier(.22,1,.36,1), color 0.25s" }}>
          View More
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", opacity: hovered ? 1 : 0.75, transform: hovered ? "translateX(-10px)" : "translateX(0)", transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ width: "36px", height: "2px", background: "#E91F1F", borderRadius: "2px" }} />
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="#E91F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Generic Featured Slider Component (Sf)
const FeaturedSlider = ({ items = null, title = "OUR PRODUCTS", activeProductName = "" }) => {
  const [sliderItems, setSliderItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);

  useEffect(() => {
    if (Array.isArray(items)) {
      setSliderItems(items);
      setActiveIndex(0);
      return;
    }
    
    // Determine target category
    let currentCategory = null;
    for (const cat of categories) {
      if (cat.products.some(([name]) => name === activeProductName)) {
        currentCategory = cat.name;
        break;
      }
    }
    
    let targetCategory = null;
    if (currentCategory === "Fire Safety") targetCategory = "Industrial Cables";
    else if (currentCategory === "Industrial Cables") targetCategory = "Fire Safety";

    let filtered = [];
    if (targetCategory) {
      const targetCatData = categories.find(c => c.name === targetCategory);
      if (targetCatData) {
        const targetNames = targetCatData.products.map(p => p[0]);
        filtered = products.filter(p => targetNames.includes(p.productName));
      }
    }
    
    if (filtered.length === 0) {
      filtered = products.filter(p => p.productName !== activeProductName);
    }
    
    const selected = [];
    const usedIndices = new Set();
    
    while (selected.length < Math.min(8, filtered.length) && usedIndices.size < filtered.length) {
      const randIdx = Math.floor(Math.random() * filtered.length);
      if (!usedIndices.has(randIdx)) {
        usedIndices.add(randIdx);
        selected.push(filtered[randIdx]);
      }
    }
    setSliderItems(selected);
  }, [items, activeProductName]);

  useEffect(() => {
    const updateVisibleSlides = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisibleSlides(4);
      else if (w >= 768) setVisibleSlides(3);
      else if (w >= 540) setVisibleSlides(2);
      else setVisibleSlides(1);
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  const maxIndex = Math.max(0, sliderItems.length - visibleSlides);
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < maxIndex;

  const handlePrev = () => setActiveIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setActiveIndex(prev => Math.min(maxIndex, prev + 1));

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
  };

  const handleDragEnd = (clientX) => {
    if (!isDragging || dragStartX === null) return;
    const diff = dragStartX - clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setIsDragging(false);
    setDragStartX(null);
  };

  const slideWidthPct = 100 / visibleSlides;
  const titleParts = title.split(" ");
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(" ");

  if (sliderItems.length === 0) {
    return (
      <section className="w-full bg-[#f6f4f4] px-4 py-10 md:px-14 md:py-16 box-border">
        <div className="max-w-7xl mx-auto text-center py-16">
          <h2 className="text-black font-extrabold m-0 text-3xl md:text-4xl leading-tight">
            {firstWord} <span className="text-[#E91F1F]">{restOfTitle}</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base leading-relaxed">
            No products found for this category. Please choose another category.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f6f4f4] px-4 py-10 md:px-14 md:py-16 box-border">
      <div className="max-w-7xl mx-auto flex items-end justify-between mb-6 md:mb-10 gap-4 flex-wrap">
        <div>
          <h2 className="text-black font-extrabold m-0 text-3xl md:text-4xl leading-tight font-inter">
            {firstWord} <span className="text-[#E91F1F]">{restOfTitle}</span>
          </h2>
        </div>
        <div className="flex gap-2.5 items-center">
          <SliderNavButton dir="prev" onClick={handlePrev} disabled={!hasPrev} />
          <SliderNavButton dir="next" onClick={handleNext} disabled={!hasNext} />
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto overflow-hidden cursor-grab"
        onMouseDown={e => handleDragStart(e.clientX)}
        onMouseUp={e => handleDragEnd(e.clientX)}
        onMouseLeave={() => {
          setIsDragging(false);
          setDragStartX(null);
        }}
        onTouchStart={e => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={e => handleDragEnd(e.changedTouches[0].clientX)}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(-${activeIndex * slideWidthPct}%)`,
            transition: isDragging ? "none" : "transform 0.5s cubic-bezier(.22,1,.36,1)",
            willChange: "transform"
          }}
        >
          {sliderItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                flexShrink: 0,
                width: `${slideWidthPct}%`,
                padding: "0 8px",
                display: "flex"
              }}
            >
              <Link to={`/product/${encodeURIComponent(item.productName)}`} className="no-underline w-full" style={{ display: "flex" }} tabIndex={-1}>
                <ProductCard item={item} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bullet Indicators */}
      <div className="flex justify-center gap-2 mt-7">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            style={{
              height: "7px",
              width: idx === activeIndex ? "28px" : "7px",
              borderRadius: "100px",
              background: idx === activeIndex ? "#E91F1F" : "rgba(0,0,0,0.15)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s ease, background 0.3s ease"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSlider;
