import React, { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import FeaturedSlider from '../components/FeaturedSlider';
import { products } from '../products';
import { categories } from '../categories';

const getCategoryByProductName = (productName) => {
  for (const cat of categories) {
    if (cat.products.some(([name]) => name === productName)) {
      return cat.name;
    }
  }
  return "Products";
};

// Breadcrumb component for product details page
const ProductBreadcrumbs = ({ productName }) => {
  const categoryName = getCategoryByProductName(productName);
  return (
    <div className="w-full bg-[#cc1111] px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-md">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center gap-2 text-sm sm:text-base">
        <Link to="/products" className="text-white font-semibold hover:text-[#f8f8f8] whitespace-nowrap transition-colors">
          Products
        </Link>
        <svg className="w-3 h-3 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link
          to={`/products?category=${encodeURIComponent(categoryName)}`}
          className="text-white/90 font-medium whitespace-nowrap hover:text-white transition-colors"
        >
          {categoryName}
        </Link>
        <svg className="w-3 h-3 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-white font-semibold whitespace-nowrap">
          {productName}
        </span>
      </div>
    </div>
  );
};

// Accordion-like section component (or)
const DetailSection = ({ title, children }) => (
  <div className="py-5 border-b border-[#cc1111] last:border-b-0">
    <p className="text-[#cc1111] font-bold text-base sm:text-lg mb-3">
      {title} :
    </p>
    {children}
  </div>
);

const ProductDetail = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(-1);
    }, 250);
  };

  const product = useMemo(() => {
    return products.find(p => p.productName === productName);
  }, [productName]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-[#f5f3f3]">
        <p className="text-xl font-semibold">Product not found</p>
        <Link to="/products" className="mt-4 text-[#880000] underline text-sm">
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  const { data, headerImg, description } = product;

  // Find standard sections
  const intro = data.find(item => item.title?.toLowerCase().includes("intro"));
  const applications = data.find(item => item.title?.toLowerCase().includes("applic"));
  const features = data.find(item => item.title?.toLowerCase().includes("feature"));
  const whyUs = data.find(item => item.title?.toLowerCase().includes("why"));
  const remaining = data.filter(item => ![intro, applications, features, whyUs].includes(item));

  // Render content lists or text blocks
  const renderContent = (contentData) => {
    if (!contentData) return null;
    
    const desc = contentData.description;
    if (!desc) return null;

    if (Array.isArray(desc)) {
      return (
        <ul className="space-y-2 text-gray-700 text-base sm:text-lg leading-relaxed">
          {desc.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-left">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-left">
        {desc}
      </p>
    );
  };

  // Helper to parse features from comma-separated string if it is not an array
  const getFeaturesContent = () => {
    if (!features) return null;
    const desc = features.description;
    if (Array.isArray(desc)) return renderContent(features);

    // If string, split by commas/semicolons/newlines
    const parsedList = desc ? desc.split(/[,;]\s*|\n/).filter(Boolean) : [];
    return renderContent({ title: features.title, description: parsedList });
  };

  return (
    <div className="w-full bg-[#f5f3f3]">
      <ProductBreadcrumbs productName={productName} />

      <div className="w-full">
        <div className="flex flex-col md:flex-row items-stretch bg-white">
          
          {/* Left Column: Static Image with Gradient Background */}
          <div className="w-full md:w-[30%] lg:w-[30%] flex-shrink-0 relative bg-[#3d6bb5]">
            <div 
              className="sticky top-0 h-[100vh] w-full flex items-end justify-center overflow-hidden"
              style={{ background: "linear-gradient(180deg, #ffffff 0%, #c5d8ee 50%, #3d6bb5 100%)" }}
            >
              <img
                src={headerImg}
                alt={productName}
                draggable={false}
                className={`w-full h-full object-cover object-bottom origin-bottom ${isExiting ? 'animate-image-shrink' : 'animate-image-grow'}`}
              />
            </div>
          </div>

          {/* Right Column: Spec sheet with details */}
          <div className={`flex-1 flex flex-col text-left py-8 md:py-16 bg-[#f8f9fa] ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
            {/* Header info */}
            <div className="relative flex flex-col px-5 sm:px-12 md:px-16 lg:px-24 pb-8 mb-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1a6e] leading-tight text-center">
                {productName}
              </h1>
              {description && (
                <p className="text-gray-900 font-medium text-base sm:text-lg mt-4 leading-relaxed max-w-4xl text-center mx-auto">
                  {description}
                </p>
              )}
              <button
                onClick={handleClose}
                aria-label="Go back"
                className="absolute top-0 right-4 sm:right-8 w-10 h-10 flex items-center justify-center text-[#1a1a6e] hover:text-red-600 text-3xl font-bold transition-colors focus:outline-none"
              >
                &#x2715;
              </button>
            </div>

            {/* Content details */}
            <div className="flex-1 px-5 sm:px-12 md:px-16 lg:px-24 pb-12">
              {intro && (
                <DetailSection title={intro.title}>
                  {renderContent(intro)}
                </DetailSection>
              )}
              {applications && (
                <DetailSection title={applications.title}>
                  {renderContent(applications)}
                </DetailSection>
              )}
              {features && (
                <DetailSection title={features.title}>
                  {getFeaturesContent()}
                </DetailSection>
              )}
              {whyUs && (
                <DetailSection title={whyUs.title}>
                  {renderContent(whyUs)}
                </DetailSection>
              )}
              {remaining.map(item => (
                <DetailSection key={item.id} title={item.title}>
                  {renderContent(item)}
                </DetailSection>
              ))}

              <div className="pt-8 text-left">
                <Link to="/contact">
                  <button className="px-8 py-3 border-2 border-[#880000] text-[#880000] rounded-lg text-lg font-bold hover:bg-[#880000] hover:text-white active:scale-95 transition-all duration-300">
                    Send Enquiry
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-2 sm:h-3 w-full bg-[#880000]" />
      
      {getCategoryByProductName(productName) && (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-14 pb-16 pt-12">
          <div className="bg-gradient-to-r from-[#1a1a6e] to-[#3d6bb5] rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 transform hover:scale-[1.01] transition-transform duration-300">
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-3 font-inter">
                Explore {getCategoryByProductName(productName) === "Fire Safety" ? "Industrial Cables" : "Fire Safety"}
              </h3>
              <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed font-inter">
                Looking for {getCategoryByProductName(productName) === "Fire Safety" ? "Industrial Cables" : "Fire Safety"}? We offer a comprehensive range of high-performance cables meticulously designed for durability and safety.
              </p>
            </div>
            <a href={`/products?category=${encodeURIComponent(getCategoryByProductName(productName) === "Fire Safety" ? "Industrial Cables" : "Fire Safety")}`} className="flex-shrink-0">
              <button className="bg-white text-[#1a1a6e] font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#CDEF46] transition-all duration-300 flex items-center gap-2 font-inter active:scale-95">
                View Category
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
