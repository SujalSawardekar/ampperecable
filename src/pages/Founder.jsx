import React from 'react';
import { O } from '../assets';
import Breadcrumbs from '../components/Breadcrumbs';
import useSEO from '../hooks/useSEO';

const Founder = () => {
  useSEO(
    "Sandeep Sawant – Founder & MD | Amppere Cable",
    "Read the message from Sandeep Sawant, Founder & MD of Amppere Cable. Under his leadership, Amppere Cable has built over 30 years of trust in cable manufacturing."
  );

  const certificates = [
    { title: "AMPPERE CABLE GST CERTIFICATE" },
    { title: "AMPPERE-CABLE-ISO-9001-2015-Final" },
    { title: "CE" },
    { title: "RoHS AMPPERE CABLE" },
    { title: "UL" }
  ];

  return (
    <div className="bg-[#0b0c10] min-h-screen font-inter overflow-x-hidden">
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Founder & MD", path: null }
        ]}
      />

      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 py-12 lg:py-24">
        {/* Header Title */}
        <div className="mb-10 lg:mb-16">
          <p className="text-[#cc1111] font-bold tracking-widest text-sm uppercase mb-2">Meet the founder</p>
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl font-outfit">Sandeep Sawant</h1>
          <p className="text-gray-400 mt-2 text-lg md:text-xl font-medium">Founder & MD, Amppere Cable</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Left: Image with Offset Backdrop */}
          <div className="w-full lg:w-[40%] relative flex-shrink-0">
            {/* Red offset background block */}
            <div className="absolute inset-0 bg-[#cc1111] transform translate-x-4 translate-y-4 rounded-xl shadow-2xl"></div>
            {/* The Image */}
            <img
              src={O.profile}
              alt="Mr. Sandeep Sawant"
              className="relative z-10 w-full h-auto aspect-[4/5] object-cover object-top rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Right: Biography */}
          <div className="w-full lg:flex-1 text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed space-y-6 lg:space-y-8 pt-4 lg:pt-0">
            <p>
              <strong className="text-white font-semibold">Sandeep Sawant</strong>, armed with a diploma in Electrical Engineering and driven by a passion for innovation, founded Amppere Cable with a vision to revolutionize the wire and cable industry.
            </p>
            <p>
              Despite the challenges of entering a competitive market, Amppere Cable quickly gained traction under Sandeep's astute leadership. Over the past four years of independent production, his technical expertise and unwavering commitment have guided the company through various obstacles, fostering resilience and adaptability.
            </p>
            <blockquote className="border-l-4 border-[#cc1111] pl-6 py-2 my-8 italic text-white font-outfit text-xl lg:text-2xl font-medium">
              "Looking ahead, our vision and hands-on approach are poised to elevate Amppere Cable to new heights in the national and international markets."
            </blockquote>
            <p>
              Today, Amppere Cable is recognized for its high-quality, specialized cables, including Instrumentation, Fire Alarm, and Fire Survival Cables. The leadership has not only earned the trust of leading industrial houses but has also positioned Amppere Cable as an <a href="https://drive.google.com/drive/folders/1n2_qwCWmQmZo3NkSlhyv3FygYwJYY5KN?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#cc1111] hover:underline font-bold transition-colors">ISO-9001:2015 accredited organization</a> with <a href="https://drive.google.com/drive/folders/1n2_qwCWmQmZo3NkSlhyv3FygYwJYY5KN?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#cc1111] hover:underline font-semibold transition-colors">CE and RoHS certified</a> products, setting new standards in the industry.
            </p>
          </div>
        </div>
      </div>

      {/* Recognitions & Awards Section */}
      <div className="bg-[#111218] py-16 lg:py-24 border-t border-white/5 relative z-20">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 font-outfit">Our Recognitions & Awards</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certificates.map((cert, idx) => (
              <a 
                key={idx} 
                href="https://drive.google.com/drive/folders/1n2_qwCWmQmZo3NkSlhyv3FygYwJYY5KN?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer relative bg-[#1a1b23] border border-white/10 rounded-lg p-8 flex flex-col justify-center items-center h-48 transition-all duration-300 hover:border-[#cc1111] hover:shadow-[0_0_20px_rgba(204,17,17,0.2)] hover:-translate-y-1 block no-underline"
              >
                {/* Decorative subtle icon or watermark */}
                <svg className="w-12 h-12 text-white/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:text-[#cc1111]/10 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15.2l-5.2 2.7 1-5.8L3.6 8l5.8-.8L12 2l2.6 5.2 5.8.8-4.2 4.1 1 5.8z"/>
                </svg>
                
                <h3 className="text-white font-bold text-center text-sm md:text-base leading-snug z-10 font-outfit relative">
                  {cert.title}
                </h3>
                
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 relative">
                  <span className="text-[#cc1111] text-xs font-semibold tracking-widest uppercase">View Certificate</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;
