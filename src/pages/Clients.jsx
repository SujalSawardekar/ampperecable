import React from 'react';
import { O } from '../assets';
import Breadcrumbs from '../components/Breadcrumbs';
import useSEO from '../hooks/useSEO';

const Clients = () => {
  useSEO(
    "Our Clients & Trusted Brands | Amppere Cable",
    "Amppere Cable is proud to be trusted by great brands and leading companies worldwide for certified, durable wires and cables."
  );

  const clientLogos = [
    O.comany1,   // Schneider Electric
    O.comany2,   // Kotak
    O.comany3,   // Mahindra Aerospace
    O.comany4,   // PNB
    O.comany5,   // Dell
    O.comany6,   // MindSpace
    O.nexus,     // Nexus Engineering
    O.comany10,  // Capgemini
    O.comany11,  // Mahindra Aerospace webp
    O.comany12,  // BSE
    O.comany13,  // Inline base64 AVIF
    O.review1,   // Junani
    O.review3    // Kiam
  ].filter(Boolean);

  return (
    <div className="bg-[#f5f3f3] min-h-screen font-inter">
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Our Clients", path: null }
        ]}
      />

      {/* Hero Banner Area */}
      <div className="bg-black py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit mb-4">
            Our Clients
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            We are proud to have earned the trust of some of the industry's most reputable brands and organizations.
          </p>
        </div>
      </div>

      {/* Split Layout Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
            
            {/* Left Side: Text content */}
            <div className="w-full lg:w-[35%] text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight font-outfit">
                Trusted by <br/>
                <span className="text-[#E91F1F]">great brands</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
                Amppere Cable is committed to delivering high-quality, reliable cable solutions. Our dedication to excellence has made us the preferred choice for leading enterprises worldwide.
              </p>
            </div>

            {/* Right Side: Logo Grid */}
            <div className="w-full lg:w-[65%]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {clientLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="client-logo bg-white border border-gray-100 h-32 md:h-36 flex justify-center items-center rounded-xl p-6 shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 group cursor-pointer"
                  >
                    <img
                      src={logo}
                      alt={`Client Logo ${idx + 1}`}
                      className="max-h-full max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Clients;
