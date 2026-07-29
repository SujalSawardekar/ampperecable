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

const ChevronIcon = ({ open, isTransparent }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? (isTransparent ? 'rotate-180 text-red-400' : 'rotate-180 text-red-600') : (isTransparent ? 'text-white/70' : 'text-neutral-400')}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c3.6 0 6.5-2.6 6.5-6.2 0-2.7-1.6-4.8-3.6-6.7-.3 1.8-1.2 3-2.4 3.7.2-3.2-1.4-5.8-4-7.8.2 3-3 5.1-3 9.5C5.5 17.8 8.4 21 12 21z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5c1.4 0 2.5-1 2.5-2.5 0-1.2-.7-2.1-1.6-3-.2 1-.7 1.7-1.5 2.1.1-1.6-.6-2.9-1.8-3.9.1 1.6-1.2 2.7-1.2 4.7 0 1.5 1.2 2.6 3.6 2.6z" />
  </svg>
);

const IndustryIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V10l5 3V9l5 4V7h4v14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h1.5M12 17h1.5M16 17h1.5" />
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0">
    {/* Circle border */}
    <circle cx="256" cy="256" r="230" stroke="#ef4444" strokeWidth="28" fill="none"/>
    {/* Tall left building */}
    <rect x="120" y="110" width="180" height="290" rx="6" stroke="#ef4444" strokeWidth="20" fill="none"/>
    {/* Roof slope (diagonal line from top-right of tall building to top of short building) */}
    <line x1="300" y1="110" x2="390" y2="220" stroke="#ef4444" strokeWidth="20" strokeLinecap="round"/>
    {/* Short right building */}
    <rect x="300" y="220" width="100" height="180" rx="6" stroke="#ef4444" strokeWidth="20" fill="none"/>
    {/* Ground line */}
    <line x1="115" y1="400" x2="405" y2="400" stroke="#ef4444" strokeWidth="20" strokeLinecap="round"/>
    {/* Windows left building — row 1 */}
    <rect x="148" y="148" width="28" height="24" rx="3" fill="#ef4444"/>
    <rect x="196" y="148" width="28" height="24" rx="3" fill="#ef4444"/>
    <rect x="244" y="148" width="28" height="24" rx="3" fill="#ef4444"/>
    {/* Windows left building — row 2 */}
    <rect x="148" y="192" width="28" height="24" rx="3" fill="#ef4444"/>
    <rect x="196" y="192" width="28" height="24" rx="3" fill="#ef4444"/>
    <rect x="244" y="192" width="28" height="24" rx="3" fill="#ef4444"/>
    {/* Windows left building — row 3 */}
    <rect x="148" y="236" width="28" height="24" rx="3" fill="#ef4444"/>
    <rect x="196" y="236" width="28" height="24" rx="3" fill="#ef4444"/>
    <rect x="244" y="236" width="28" height="24" rx="3" fill="#ef4444"/>
    {/* Windows left building — row 4 */}
    <rect x="148" y="280" width="28" height="24" rx="3" fill="#ef4444"/>
    <rect x="196" y="280" width="28" height="24" rx="3" fill="#ef4444"/>
    <rect x="244" y="280" width="28" height="24" rx="3" fill="#ef4444"/>
    {/* Door (center of left building) */}
    <rect x="210" y="345" width="50" height="55" rx="4" stroke="#ef4444" strokeWidth="16" fill="none"/>
    {/* Right building windows (horizontal bars) */}
    <rect x="320" y="258" width="60" height="18" rx="4" fill="#ef4444"/>
    <rect x="320" y="300" width="60" height="18" rx="4" fill="#ef4444"/>
  </svg>
);

const FounderIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGoalsReached, setIsGoalsReached] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  
  // Routes with dark background theme requiring dark navigation style
  const darkRoutes = ['/about', '/founder', '/blog', '/contact'];
  const isDarkPage = darkRoutes.some(route => location.pathname.startsWith(route));
  const isDarkTheme = isHomePage ? (!isGoalsReached) : isDarkPage;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      setIsScrolled(scrollY > 10);
      // 2.7 * vh transitions the navbar color just as the Goals section slides up to the top
      setIsGoalsReached(scrollY > 2.65 * vh);
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
      {/* 
        Adaptive Navigation Bar:
        1. Home (top/hero): Floating transparent glass pill with dark maroon frame background.
        2. Home (goals section): Minimal full-width white glass navbar.
        3. Dark Pages (About, Founder, Blogs, Enquiry): Sleek dark glass header with light text/icons.
        4. Light Pages (Products, Clients): Minimal white glass header with dark text/icons.
      */}
      <header
        className={`fixed left-1/2 z-50 transition-all duration-700 ease-out font-inter ${
          isLoaded 
            ? '-translate-x-1/2 translate-y-0 opacity-100' 
            : '-translate-x-1/2 -translate-y-full opacity-0 pointer-events-none'
        } ${
          isHomePage
            ? isScrolled
              ? isGoalsReached
                ? 'top-0 w-full max-w-full rounded-none bg-white/95 backdrop-blur-lg border-b border-neutral-200/50 shadow-sm py-3 px-6 md:px-12 text-neutral-800'
                : 'top-0 w-full max-w-full rounded-none bg-[#290508]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5 px-6 md:px-12 text-white'
              : 'top-3 sm:top-5 w-[92%] max-w-5xl rounded-full bg-white/10 border border-white/25 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] py-2 px-5 sm:px-8 text-white'
            : isDarkTheme
              ? 'top-0 w-full max-w-full rounded-none bg-[#120204]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3 px-6 md:px-12 text-white'
              : 'top-0 w-full max-w-full rounded-none bg-white/95 backdrop-blur-lg border-b border-neutral-200/50 shadow-sm py-3 px-6 md:px-12 text-neutral-800'
        }`}
      >
        <div className="flex items-center justify-between w-full mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group flex-shrink-0"
            onClick={closeAllMenus}
          >
            <img
              src={O.logo}
              alt="Amppere Cable"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links (Consistent Casing) */}
          <ul className={`hidden md:flex items-center justify-center gap-8 lg:gap-10 text-sm font-medium transition-colors duration-300 ${isDarkTheme ? 'text-white/95' : 'text-neutral-700'}`}>
            <li>
              <Link
                to="/"
                className={`transition-colors py-2 relative group ${isDarkTheme ? 'hover:text-red-400' : 'hover:text-red-600'}`}
              >
                <span>Home</span>
              </Link>
            </li>

            {/* About Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => { setAboutMenuOpen(true); setProductsMenuOpen(false); }}
              onMouseLeave={() => setAboutMenuOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 transition-colors focus:outline-none py-2 ${
                  isDarkTheme 
                    ? (aboutMenuOpen ? 'text-red-400' : 'hover:text-red-400') 
                    : (aboutMenuOpen ? 'text-red-600' : 'hover:text-red-600')
                }`}
              >
                <span>About</span>
                <ChevronIcon open={aboutMenuOpen} isTransparent={isDarkTheme} />
              </button>

              <div className={`absolute left-0 top-full pt-3 transition-all duration-200 origin-top z-50 ${
                aboutMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
              }`}>
                <div className={`w-56 rounded-2xl shadow-2xl overflow-hidden border p-2 backdrop-blur-2xl ${
                  isDarkTheme 
                    ? 'bg-[#390609]/95 text-white border-white/20' 
                    : 'bg-white text-neutral-800 border-neutral-100'
                }`}>
                  <Link
                    to="/about"
                    onClick={() => setAboutMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isDarkTheme ? 'hover:bg-red-600/30 hover:text-red-300' : 'hover:bg-neutral-50 hover:text-red-600'
                    }`}
                  >
                    <AboutIcon />
                    <span>Company Overview</span>
                  </Link>
                  <Link
                    to="/founder"
                    onClick={() => setAboutMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-t ${
                      isDarkTheme ? 'hover:bg-red-600/30 hover:text-red-300 border-white/10' : 'hover:bg-neutral-50 hover:text-red-600 border-neutral-50'
                    }`}
                  >
                    <FounderIcon />
                    <span>Founder &amp; MD</span>
                  </Link>
                </div>
              </div>
            </li>

            {/* Products Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => { setProductsMenuOpen(true); setAboutMenuOpen(false); }}
              onMouseLeave={() => { setProductsMenuOpen(false); setHoveredCategory(null); }}
            >
              <button
                className={`flex items-center gap-1.5 transition-colors focus:outline-none py-2 ${
                  isDarkTheme 
                    ? (productsMenuOpen ? 'text-red-400' : 'hover:text-red-400') 
                    : (productsMenuOpen ? 'text-red-600' : 'hover:text-red-600')
                }`}
              >
                <span>Products</span>
                <ChevronIcon open={productsMenuOpen} isTransparent={isDarkTheme} />
              </button>

              <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 origin-top z-50 ${
                productsMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
              }`}>
                <div className={`w-72 rounded-2xl shadow-2xl overflow-hidden border p-2 backdrop-blur-2xl ${
                  isDarkTheme 
                    ? 'bg-[#390609]/95 text-white border-white/20' 
                    : 'bg-white text-neutral-800 border-neutral-100'
                }`}>
                  {categories.map((cat, idx) => (
                    <Link
                      key={cat.name}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => { setProductsMenuOpen(false); setHoveredCategory(null); }}
                      onMouseEnter={() => setHoveredCategory(cat.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isDarkTheme 
                          ? (hoveredCategory === cat.name ? 'bg-red-600/30 text-red-300' : 'hover:bg-red-600/20 hover:text-red-300')
                          : (hoveredCategory === cat.name ? 'bg-neutral-50 text-red-600' : 'hover:bg-neutral-50 hover:text-red-600')
                      } ${idx > 0 ? (isDarkTheme ? 'border-t border-white/10' : 'border-t border-neutral-50') : ''}`}
                    >
                      <span className="shrink-0 text-red-500">
                        {getCategoryIcon(cat.name)}
                      </span>
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <Link
                to="/clients"
                className={`transition-colors py-2 relative group ${isDarkTheme ? 'hover:text-red-400' : 'hover:text-red-600'}`}
              >
                <span>Clients</span>
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className={`transition-colors py-2 relative group ${isDarkTheme ? 'hover:text-red-400' : 'hover:text-red-600'}`}
              >
                <span>Enquiry</span>
              </Link>
            </li>
          </ul>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleDownloadBrochure}
              className="inline-flex items-center gap-2 bg-[#C62828] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-neutral-900 transition-all duration-300 shadow-md group"
            >
              <span>Brochure</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={`md:hidden focus:outline-none p-1.5 rounded-lg transition-colors ml-auto ${
              isDarkTheme ? 'text-white bg-white/10 hover:bg-white/20' : 'text-neutral-800 hover:bg-neutral-100'
            }`}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        onClick={closeAllMenus}
        className={`fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-[70] md:hidden shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isDarkTheme 
            ? 'bg-[#290508] text-white border-l border-white/10' 
            : 'bg-white text-neutral-800'
        }`}
      >
        <div className={`flex items-center justify-between px-5 py-5 border-b flex-shrink-0 ${
          isDarkTheme ? 'border-white/10' : 'border-neutral-100'
        }`}>
          <img src={O.logo} alt="Amppere Cable" className="h-8 w-auto" />
          <button
            onClick={closeAllMenus}
            className={`p-1 rounded-md transition-colors focus:outline-none ${
              isDarkTheme ? 'text-white hover:bg-white/10' : 'text-neutral-500 hover:bg-neutral-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 font-inter">
          <ul className="space-y-1">
            <li>
              <Link to="/" onClick={closeAllMenus} className={`flex items-center py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                isDarkTheme ? 'text-white hover:text-red-400 hover:bg-white/5' : 'text-neutral-800 hover:text-red-600 hover:bg-neutral-50'
              }`}>
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                className={`w-full flex items-center justify-between py-3 px-3 text-sm font-medium transition-colors focus:outline-none rounded-lg ${
                  isDarkTheme ? 'text-white hover:text-red-400 hover:bg-white/5' : 'text-neutral-800 hover:text-red-600 hover:bg-neutral-50'
                }`}
              >
                <span>About</span> <ChevronIcon open={aboutMenuOpen} isTransparent={isDarkTheme} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${aboutMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="pl-4 pb-2 space-y-1">
                  <li>
                    <Link to="/about" onClick={closeAllMenus} className={`block py-2 px-3 text-sm rounded-lg transition-colors ${
                      isDarkTheme ? 'text-gray-300 hover:text-red-400 hover:bg-white/5' : 'text-neutral-600 hover:text-red-600 hover:bg-neutral-50'
                    }`}>
                      Company Overview
                    </Link>
                  </li>
                  <li>
                    <Link to="/founder" onClick={closeAllMenus} className={`block py-2 px-3 text-sm rounded-lg transition-colors ${
                      isDarkTheme ? 'text-gray-300 hover:text-red-400 hover:bg-white/5' : 'text-neutral-600 hover:text-red-600 hover:bg-neutral-50'
                    }`}>
                      Founder &amp; MD
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <button
                onClick={() => setProductsMenuOpen(!productsMenuOpen)}
                className={`w-full flex items-center justify-between py-3 px-3 text-sm font-medium transition-colors focus:outline-none rounded-lg ${
                  isDarkTheme ? 'text-white hover:text-red-400 hover:bg-white/5' : 'text-neutral-800 hover:text-red-600 hover:bg-neutral-50'
                }`}
              >
                <span>Products</span> <ChevronIcon open={productsMenuOpen} isTransparent={isDarkTheme} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${productsMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="pl-4 pb-2 space-y-1">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <Link
                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                        onClick={closeAllMenus}
                        className={`block py-2 px-3 text-sm rounded-lg transition-colors ${
                          isDarkTheme ? 'text-gray-300 hover:text-red-400 hover:bg-white/5' : 'text-neutral-600 hover:text-red-600 hover:bg-neutral-50'
                        }`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link to="/clients" onClick={closeAllMenus} className={`flex items-center py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                isDarkTheme ? 'text-white hover:text-red-400 hover:bg-white/5' : 'text-neutral-800 hover:text-red-600 hover:bg-neutral-50'
              }`}>
                Clients
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeAllMenus} className={`flex items-center py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                isDarkTheme ? 'text-white hover:text-red-400 hover:bg-white/5' : 'text-neutral-800 hover:text-red-600 hover:bg-neutral-50'
              }`}>
                Enquiry
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <button
                onClick={() => {
                  handleDownloadBrochure();
                  closeAllMenus();
                }}
                className="w-full bg-[#C62828] text-white text-sm font-bold px-4 py-3.5 rounded-full hover:bg-neutral-900 transition-colors shadow-md"
              >
                Download Brochure
              </button>
            </li>
          </ul>
        </nav>

        <div className={`flex-shrink-0 border-t px-5 py-6 space-y-3 text-sm ${
          isDarkTheme ? 'border-white/10 bg-black/40' : 'border-neutral-100 bg-neutral-50'
        }`}>
          <a href="tel:+919370946510" className={`flex items-center gap-3 transition-colors font-medium ${
            isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-neutral-600 hover:text-red-600'
          }`}>
            <span className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center ${
              isDarkTheme ? 'bg-white/5 text-neutral-400' : 'bg-white text-neutral-400'
            }`}>
              <PhoneIcon />
            </span>
            +91 9370946510
          </a>
          <a href="mailto:infoampperecable@gmail.com" className={`flex items-center gap-3 transition-colors font-medium ${
            isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-neutral-600 hover:text-red-600'
          }`}>
            <span className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center ${
              isDarkTheme ? 'bg-white/5 text-neutral-400' : 'bg-white text-neutral-400'
            }`}>
              <MailIcon />
            </span>
            info@ampperecable.com
          </a>
        </div>
      </aside>
    </>
  );
};

export default Header;
