import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import HeroScroll3D, { FRAME_SCROLL_VH } from '../components/HeroScroll3D';
import Goals from '../components/Goals';
import ProductShowcase from '../components/ProductShowcase';
import WeCommit from '../components/WeCommit';
import AboutShowcase from '../components/AboutShowcase';
import Testimonials from '../components/Testimonials';
import ClientsSection from '../components/ClientsSection';
import SocialShowcase from '../components/SocialShowcase';

const OVERLAP_VH   = 2.0;
const PULL_UP_VH   = 1.0;

const Home = () => {
  useSEO(
    'Amppere Cable | Certified Fire Alarm & Survival Cable Manufacturers',
    'Amppere Cable is a leading manufacturer of certified Low Tension Copper Conductor Wires, Fire Alarm & Survival Cables, and Instrumentation Cables in Maharashtra, India. ISO 9001, CE, and RoHS certified.'
  );

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spacerVh = isMobile ? 1.0 : (FRAME_SCROLL_VH + OVERLAP_VH);
  const pullUpVh = isMobile ? 0.0 : PULL_UP_VH;

  return (
    <main style={{ background: '#390609' }}>

      <div style={{ height: `${spacerVh * 100}vh`, position: 'relative' }}>
        <HeroScroll3D isMobile={isMobile} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 30,
          marginTop: `-${pullUpVh * 100}vh`,
        }}
        className="bg-white rounded-t-[2.5rem] md:rounded-t-[3.5rem] shadow-[0_-24px_64px_rgba(0,0,0,0.85)]"
      >
        <Goals />
        <ProductShowcase />
        <WeCommit />
        <ClientsSection />
        <AboutShowcase />
        <Testimonials />
        <SocialShowcase />
      </div>

    </main>
  );
};

export default Home;
