import React from 'react';
import Banner from '../components/Banner';
import Goals from '../components/Goals';
import ProductShowcase from '../components/ProductShowcase';
import WeCommit from '../components/WeCommit';
import AboutShowcase from '../components/AboutShowcase';
import Testimonials from '../components/Testimonials';
import ClientsSection from '../components/ClientsSection';
import SocialShowcase from '../components/SocialShowcase';

const Home = () => {
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
