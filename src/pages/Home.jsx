import React from 'react';
import useSEO from '../hooks/useSEO';
import Banner from '../components/Banner';
import Goals from '../components/Goals';
import ProductShowcase from '../components/ProductShowcase';
import WeCommit from '../components/WeCommit';
import AboutShowcase from '../components/AboutShowcase';
import Testimonials from '../components/Testimonials';
import ClientsSection from '../components/ClientsSection';
import SocialShowcase from '../components/SocialShowcase';

const Home = () => {
  useSEO(
    "Amppere Cable | Certified Fire Alarm & Survival Cable Manufacturers",
    "Amppere Cable is a leading manufacturer of certified Low Tension Copper Conductor Wires, Fire Alarm & Survival Cables, and Instrumentation Cables in Maharashtra, India. ISO 9001, CE, and RoHS certified."
  );

  return (
    <main className="bg-white">
      <Banner />
      <Goals />
      <ProductShowcase />
      <WeCommit />
      <ClientsSection />
      <AboutShowcase />
      <Testimonials />
      <SocialShowcase />
    </main>
  );
};

export default Home;
