import React from 'react';
import { Link } from 'react-router-dom';
import { O } from '../assets';

const clientLogos = [
  { name: "Schneider Electric", logo: O.comany1 },
  { name: "Kotak", logo: O.comany6 },
  { name: "Mahindra Aerospace", logo: O.comany11 },
  { name: "PNB", logo: O.comany5 },
  { name: "Dell", logo: O.comany4 },
  { name: "MindSpace", logo: O.comany3 },
  { name: "NXP Semiconductors", logo: O.comany13 },
  { name: "Kiam", logo: O.review3 }
];

const ClientsSection = React.memo(() => {
  return (
    <div className="bg-white pt-12 md:pt-16 p-6 md:pb-16 md:px-48">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-left mb-6 md:mb-0">
          <div className="flex items-center">
            <p className="text-[#880000] font-bold text-2xl md:text-4xl mr-2 font-inter">OUR ESTEEMED</p>
            <p className="text-black font-bold text-2xl md:text-4xl font-inter">CLIENTS</p>
          </div>
          <p className="text-black mt-2 font-inter">AMMPERE CABLE got an opportunity to work with many prestigious clients.</p>
        </div>

        <div>
          <Link
            to="/clients"
            className="font-inter bg-[#AE1B1B] text-white px-6 py-2 rounded-md hover:bg-red-800 flex items-center transition-colors shadow-md"
          >
            <span>View our clients</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6.79 4.093a.5.5 0 0 1 .607-.064l4.5 3a.5.5 0 0 1 0 .854l-4.5 3A.5.5 0 0 1 6 10.5v-6a.5.5 0 0 1 .79-.407z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Marquee slider */}
      <div className="relative overflow-hidden mt-16 mb-20">
        <div className="flex animate-marquee whitespace-nowrap">
          {clientLogos.map((logo, idx) => (
            <img
              key={`logo-1-${idx}`}
              src={logo.logo}
              alt={logo.name}
              className="h-6 md:h-10 mx-4 md:mx-8 object-contain"
              loading="lazy"
            />
          ))}
          {clientLogos.map((logo, idx) => (
            <img
              key={`logo-2-${idx}`}
              src={logo.logo}
              alt={logo.name}
              className="h-10 mx-8 object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ClientsSection;
