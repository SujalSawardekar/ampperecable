import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import { O } from '../assets';
import { categories } from '../categories';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// Icon Components
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.58C5.12 20.04 12 20.04 12 20.04s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c3.6 0 6.5-2.6 6.5-6.2 0-2.7-1.6-4.8-3.6-6.7-.3 1.8-1.2 3-2.4 3.7.2-3.2-1.4-5.8-4-7.8.2 3-3 5.1-3 9.5C5.5 17.8 8.4 21 12 21z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5c1.4 0 2.5-1 2.5-2.5 0-1.2-.7-2.1-1.6-3-.2 1-.7 1.7-1.5 2.1.1-1.6-.6-2.9-1.8-3.9.1 1.6-1.2 2.7-1.2 4.7 0 1.5 1.2 2.6 3.6 2.6z" />
  </svg>
);

const IndustryIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V10l5 3V9l5 4V7h4v14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h1.5M12 17h1.5M16 17h1.5" />
  </svg>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setProductsMenuOpen(false);
    setAboutMenuOpen(false);
    setHoveredCategory(null);
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/amppere_brochure.pdf';
    link.download = 'AmppereCable_Brochure.pdf';
    link.click();
  };

  const getCategoryIcon = (categoryName) => {
    return categoryName.toLowerCase().includes('fire') ? <FireIcon /> : <IndustryIcon />;
  };

  return (
    <>
      <ScrollToTop />
      <header className="w-full bg-[#1D102F] text-white shadow-lg sticky top-0 z-40">
        {/* Top Bar */}
        <div className={`hidden md:flex justify-between items-stretch bg-black text-white border-b border-white/5 transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0 opacity-0 border-transparent' : 'h-10 opacity-100'}`}>
          {/* Contact Info (Left) */}
          <div className="flex items-center gap-8 px-8 text-sm font-medium text-gray-300">
            <a href="tel:+919370946510" className="flex items-center gap-2 hover:text-white transition-colors">
              <PhoneIcon /> +91 9370946510
            </a>
            <a href="mailto:infoampperecable@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <MailIcon /> infoampperecable@gmail.com
            </a>
          </div>

          {/* Social Icons (Right) - Curved white background */}
          <div className="bg-white text-black flex items-center gap-5 px-10 rounded-tl-full relative">
            <a href="https://www.facebook.com/people/Amppere-Cable/61566408188370/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/ampperecable" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UCUpTOAVXEGQzM34Eke8kNRA" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className={`mx-auto flex items-center justify-between bg-[#151025] px-4 md:px-8 transition-all duration-300 ${isScrolled ? 'py-1 shadow-md' : 'py-3'}`}>
          {/* Logo (disappears on scroll) */}
          <Link to="/" className={`flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden flex items-center ${isScrolled ? 'max-w-0 opacity-0 mr-0' : 'max-w-[300px] opacity-100 mr-6 lg:mr-12'}`} onClick={closeAllMenus}>
            <img src={O.logo} alt="Amppere Cable" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className={`hidden md:flex items-center flex-1 gap-8 lg:gap-14 transition-all duration-500 ${isScrolled ? 'justify-start' : 'justify-center'}`}>
            <li>
              <Link to="/" className="text-sm lg:text-base font-medium tracking-wide hover:text-white text-gray-300 transition-colors whitespace-nowrap">
                Home
              </Link>
            </li>
            {/* About dropdown - hover opens, inline with li */}
            <li
              className="relative"
              onMouseEnter={() => { setAboutMenuOpen(true); setProductsMenuOpen(false); }}
              onMouseLeave={() => setAboutMenuOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm lg:text-base font-medium tracking-wide hover:text-white transition-colors focus:outline-none py-5 ${aboutMenuOpen ? 'text-white' : 'text-gray-300'}`}
              >
                About <svg className="w-3.5 h-3.5 ml-0.5 transition-transform duration-200" style={{transform: aboutMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              {/* About Dropdown Panel */}
              <div className={`absolute left-0 top-full pt-1 transition-all duration-200 origin-top z-50 ${
                aboutMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
              }`}>
                <div className="w-56 rounded-xl bg-white text-gray-950 shadow-2xl overflow-hidden border border-gray-100">
                  <Link
                    to="/about"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-600 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zm6-4h10V3H9v14zm-4 0h2V7H5v10zm12-10h-2v2h2V7zm0 4h-2v2h2v-2zm-4-4h-2v2h2V7zm0 4h-2v2h2v-2z"/></svg>
                    </span>
                    Company Overview
                  </Link>
                  <Link
                    to="/founder"
                    onClick={() => setAboutMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group border-t border-gray-100"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-600 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /></svg>
                    </span>
                    Founder &amp; MD
                  </Link>
                </div>
              </div>
            </li>

            {/* Products dropdown - hover opens, inline with li */}
            <li
              className="relative"
              onMouseEnter={() => { setProductsMenuOpen(true); setAboutMenuOpen(false); }}
              onMouseLeave={() => { setProductsMenuOpen(false); setHoveredCategory(null); }}
            >
              <button
                className={`flex items-center gap-1 text-sm lg:text-base font-medium tracking-wide hover:text-white transition-colors focus:outline-none py-5 ${productsMenuOpen ? 'text-white' : 'text-gray-300'}`}
              >
                Product <svg className="w-3.5 h-3.5 ml-0.5 transition-transform duration-200" style={{transform: productsMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              {/* Products Dropdown Panel */}
              <div className={`absolute left-0 top-full pt-1 transition-all duration-200 origin-top z-50 ${
                productsMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
              }`}>
                <div className="w-64 rounded-xl bg-white text-gray-950 shadow-2xl overflow-hidden border border-gray-100">
                  {categories.map((cat, idx) => (
                    <Link
                      key={cat.name}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => { setProductsMenuOpen(false); setHoveredCategory(null); }}
                      onMouseEnter={() => setHoveredCategory(cat.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors group ${
                        hoveredCategory === cat.name ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                      } ${idx > 0 ? 'border-t border-gray-100' : ''}`}
                    >
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors flex-shrink-0 ${
                        hoveredCategory === cat.name ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-600'
                      }`}>
                        {getCategoryIcon(cat.name)}
                      </span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link to="/clients" className="text-sm lg:text-base font-medium tracking-wide hover:text-white text-gray-300 transition-colors whitespace-nowrap">
                Client
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-sm lg:text-base font-medium tracking-wide hover:text-white text-gray-300 transition-colors whitespace-nowrap">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm lg:text-base font-medium tracking-wide hover:text-white text-gray-300 transition-colors whitespace-nowrap">
                Enquiry
              </Link>
            </li>
          </ul>

          {/* Download Brochure Button */}
          <button
            onClick={handleDownloadBrochure}
            className="hidden md:inline-flex items-center justify-center bg-[#ef2334] hover:bg-[#d61f2e] text-white text-sm lg:text-base font-medium px-5 lg:px-6 py-2.5 rounded-lg transition-colors flex-shrink-0"
          >
            Download Brochure
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden text-white focus:outline-none p-1.5 rounded-md hover:bg-white/10 transition-colors ml-auto"
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      <div
        onClick={closeAllMenus}
        className={`fixed inset-0 bg-black/60 z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-black z-[60] md:hidden shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <img src={O.logo} alt="Amppere Cable" className="h-10 w-auto" />
          <button
            onClick={closeAllMenus}
            className="text-white p-1 rounded-md hover:bg-white/10 transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-0.5">
            <li>
              <Link to="/" onClick={closeAllMenus} className="flex items-center py-3 px-2 text-white text-sm border-b border-white/10 hover:text-red-400 transition-colors rounded-md hover:bg-white/5">
                Home
              </Link>
            </li>
            <li className="border-b border-white/10">
              <button
                onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                className="w-full flex items-center justify-between py-3 px-2 text-white text-sm hover:text-red-400 transition-colors focus:outline-none rounded-md hover:bg-white/5"
              >
                About <ChevronIcon open={aboutMenuOpen} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${aboutMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="pl-4 pb-2 space-y-0.5">
                  <li>
                    <Link to="/about" onClick={closeAllMenus} className="block py-2 px-2 text-gray-300 text-sm hover:text-red-400 rounded-md hover:bg-white/5 transition-colors">
                      Company Overview
                    </Link>
                  </li>
                  <li>
                    <Link to="/founder" onClick={closeAllMenus} className="block py-2 px-2 text-gray-300 text-sm hover:text-red-400 rounded-md hover:bg-white/5 transition-colors">
                      Founder & MD
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="border-b border-white/10">
              <button
                onClick={() => setProductsMenuOpen(!productsMenuOpen)}
                className="w-full flex items-center justify-between py-3 px-2 text-white text-sm hover:text-red-400 transition-colors focus:outline-none rounded-md hover:bg-white/5"
              >
                Products <ChevronIcon open={productsMenuOpen} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${productsMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="pl-3 pb-2 space-y-0.5">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <div className="flex items-center justify-between w-full">
                        <Link
                          to={`/products?category=${encodeURIComponent(cat.name)}`}
                          onClick={closeAllMenus}
                          className="flex-1 py-2.5 px-2 text-left text-gray-200 text-sm font-semibold hover:text-red-400 transition-colors rounded-md hover:bg-white/5"
                        >
                          {cat.name}
                        </Link>
                        <button
                          onClick={() => setHoveredCategory(hoveredCategory === cat.name ? null : cat.name)}
                          className="p-2 text-gray-200 hover:text-red-400 transition-colors focus:outline-none rounded-md"
                        >
                          <ChevronIcon open={hoveredCategory === cat.name} />
                        </button>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ${hoveredCategory === cat.name ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4 pb-1 space-y-0.5">
                          {cat.products.map(([name, routePath]) => (
                            <li key={name}>
                              <Link
                                to={routePath}
                                onClick={closeAllMenus}
                                className="block py-2 px-2 text-gray-400 text-sm hover:text-red-400 rounded-md hover:bg-white/5 transition-colors"
                              >
                                {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link to="/clients" onClick={closeAllMenus} className="flex items-center py-3 px-2 text-white text-sm border-b border-white/10 hover:text-red-400 transition-colors rounded-md hover:bg-white/5">
                Clients
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeAllMenus} className="flex items-center py-3 px-2 text-white text-sm border-b border-white/10 hover:text-red-400 transition-colors rounded-md hover:bg-white/5">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeAllMenus} className="flex items-center py-3 px-2 text-white text-sm border-b border-white/10 hover:text-red-400 transition-colors rounded-md hover:bg-white/5">
                Enquiry
              </Link>
            </li>
            <li className="pt-4">
              <button
                onClick={() => {
                  handleDownloadBrochure();
                  closeAllMenus();
                }}
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm px-4 py-3 rounded-lg transition-colors shadow-md"
              >
                Download Brochure
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Contact & Social Details */}
        <div className="flex-shrink-0 border-t border-white/10 px-5 py-4 space-y-2.5 bg-[#0d0d20]">
          <a href="tel:+919370946510" className="flex items-center gap-2 text-gray-400 text-xs hover:text-white transition-colors">
            <PhoneIcon /> +91 9370946510
          </a>
          <a href="mailto:infoampperecable@gmail.com" className="flex items-center gap-2 text-gray-400 text-xs hover:text-white transition-colors">
            <MailIcon /> infoampperecable@gmail.com
          </a>
          <div className="flex items-center gap-3 pt-1">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
