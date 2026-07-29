import React, { useEffect } from 'react';
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

function App() {
  useEffect(() => {
    // Initialize AOS scroll animations globally
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100
    });
  }, []);

  return (
    <Router>
      <Preloader />
      <CustomCursor />
      <div className="flex flex-col min-h-screen bg-white overflow-x-hidden w-full">
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
