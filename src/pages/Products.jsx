import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import FeaturedSlider from '../components/FeaturedSlider';
import { categories } from '../categories';
import { products } from '../products';
import useSEO from '../hooks/useSEO';

const Products = () => {
  const [searchParams] = useSearchParams();
  const defaultCategory = categories[0]?.name || "";
  const categoryParam = searchParams.get("category") || defaultCategory;
  
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const seoData = useMemo(() => {
    switch (activeCategory) {
      case "Fire Safety":
        return {
          title: "Certified Fire Alarm & Survival Cable Manufacturers | Amppere Cable",
          description: "Amppere Cable is a leading manufacturer of certified Low Tension Copper Conductor Wires, Fire Alarm & Survival Cables, and Instrumentation Cables."
        };
      case "Industrial Cables":
        return {
          title: "Industrial & Power Cables Supplier in India | Amppere Cable",
          description: "Amppere Cable manufactures LT and HT power cables, armoured cables and control cables for industrial, commercial and infrastructure projects."
        };
      case "House Wires":
        return {
          title: "House Wires Manufacturer – FR & FRLS PVC Wires | Amppere Cable",
          description: "Amppere Cable manufactures FR and FRLS PVC insulated house wires with pure copper conductors, built for safe and durable home electrical wiring."
        };
      case "Submersible Cables":
        return {
          title: "Submersible & Flexible Cables Manufacturer | Amppere Cable",
          description: "High-quality submersible pump cables and flexible cables from Amppere Cable, engineered for durability in demanding electrical applications."
        };
      default:
        return {
          title: "Electrical Wires & Cables Manufacturer | Amppere Cable",
          description: "Explore the wide range of high-performance electrical wires and cables from Amppere Cable, manufactured for safety and durability."
        };
    }
  }, [activeCategory]);

  useSEO(seoData.title, seoData.description);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== activeCategory) {
      setActiveCategory(cat);
    }
  }, [searchParams, activeCategory]);

  useEffect(() => {
    if (!activeCategory) {
      setActiveCategory(defaultCategory);
    }
  }, [activeCategory, defaultCategory]);

  const resolvedCategory = useMemo(() => {
    return categories.find(c => c.name === activeCategory) ?? categories[0];
  }, [activeCategory]);

  const categoryProducts = useMemo(() => {
    if (!resolvedCategory) return products;
    return resolvedCategory.products
      .map(([name]) => products.find(p => p.productName === name))
      .filter(Boolean);
  }, [resolvedCategory]);

  const targetCategory = activeCategory === "Fire Safety" ? "Industrial Cables" : (activeCategory === "Industrial Cables" ? "Fire Safety" : null);

  return (
    <div className="min-h-screen bg-[#f5f3f3]">
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Products", path: "/products" },
          { label: activeCategory || "Products", path: null }
        ]}
      />
      
      <FeaturedSlider items={categoryProducts} title={`Our ${activeCategory}`} />
      
      {targetCategory && (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-14 pb-16 pt-8">
          <div className="bg-gradient-to-r from-[#1a1a6e] to-[#3d6bb5] rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 transform hover:scale-[1.01] transition-transform duration-300">
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-3 font-inter">Explore {targetCategory}</h3>
              <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed font-inter">
                Looking for {targetCategory}? We offer a comprehensive range of high-performance cables meticulously designed for durability and safety.
              </p>
            </div>
            <Link to={`/products?category=${encodeURIComponent(targetCategory)}`} className="flex-shrink-0">
              <button className="bg-white text-[#1a1a6e] font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#CDEF46] transition-all duration-300 flex items-center gap-2 font-inter active:scale-95">
                View Category
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
