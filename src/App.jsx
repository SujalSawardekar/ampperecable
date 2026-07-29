import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Common Components
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Founder from './pages/Founder';
import Clients from './pages/Clients';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';
import DesktopRequired from './components/DesktopRequired';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize AOS scroll animations globally
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100
    });
  }, []);

  useEffect(() => {
    const detectDevice = () => {
      if (typeof window === 'undefined') return;

      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      // 1. Standard Mobile User Agent Check
      const uaMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
      
      // 2. Coarse Pointer (Primary Touchscreen device - Phone/Tablet)
      const isCoarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
      
      // 3. Touch Points + Screen Dimension Checks (Covers iPad Pro / Mobile 'Desktop Site' Mode)
      const hasTouch = (navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      
      // Typical mobile/tablet device screen resolutions (even iPad Pro is 1366 max)
      const isMobileScreen = screenWidth < 1024 || screenHeight < 768;
      const isTabletDesktopMode = hasTouch && (screenWidth <= 1366 && screenHeight <= 1366);

      setIsMobile(uaMobile || isCoarsePointer || isMobileScreen || isTabletDesktopMode);
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  if (isMobile) {
    return <DesktopRequired />;
  }

  return (
    <Router>
      <Preloader />
      <CustomCursor />
      <div className="flex flex-col min-h-screen bg-white" style={{ overflowX: 'clip' }}>
        <Header />
        
        {/* Main Content Area */}
        <div className="flex-grow">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productName" element={<ProductDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </div>

        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
