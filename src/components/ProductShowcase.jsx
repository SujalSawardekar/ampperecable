import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { O } from '../assets';

const ProductShowcase = () => {
  useEffect(() => {
    AOS.init({ duration: 500, offset: 60 });
  }, []);

  return (
    <section className="pt-12 md:pt-20">
      <div className="md:flex md:flex-row m-10 md:m-0 justify-evenly items-center p-0 md:p-8 mb-12">
        {/* Mobile Header */}
        <div className="contents md:hidden">
          <div data-aos="fade-up" className="flex flex-row justify-center items-center mb-8">
            <p className="text-[#880000] font-bold text-3xl md:text-lg mr-2 font-inter">OUR</p>
            <p className="text-black font-bold text-3xl md:text-lg font-inter">PRODUCT</p>
          </div>
        </div>

        {/* Asymmetrical Offset Cable Cards Grid */}
        <div className="sm:flex sm:flex-col sm:justify-center md:-mt-12">
          <div className="flex flex-row sm:w-full sm:flex justify-center items-center">
            {/* Card 1 */}
            <Link
              to={`/product/${encodeURIComponent("Fire Alarm Cables")}`}
              data-aos="fade-right"
              className="relative w-[100px] h-[120px] m-2 lg:w-[210px] lg:h-[240px] md:m-5 md:mb-0 md:mr-4 flex justify-center items-center rounded-br-2xl bg-gradient-to-r from-[#253466] to-[#4A67CC] group overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={O.productImg_1}
                alt="Fire Alarm Cables"
                className="transition-all duration-300 ease-in-out group-hover:opacity-40 w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-xs md:text-lg font-bold text-center px-2">
                Fire Alarm Cables
              </span>
            </Link>

            {/* Card 2 */}
            <Link
              to={`/product/${encodeURIComponent("Fire Resistant Cables")}`}
              data-aos="fade-left"
              className="relative w-[100px] h-[130px] mt-2.5 md:mt-0 md:w-[225px] md:mb-4 md:h-[280px] flex justify-center items-center rounded-bl-2xl bg-gradient-to-r from-[#253466] to-[#4A67CC] group overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={O.productImg_2}
                alt="Fire Resistant Cables"
                className="transition-all duration-300 ease-in-out group-hover:opacity-40 w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-xs md:text-lg font-bold text-center px-2">
                Fire Resistant Cables
              </span>
            </Link>
          </div>

          <div className="flex flex-row justify-center">
            {/* Card 3 */}
            <Link
              to={`/product/${encodeURIComponent("Smoke Detection Cables")}`}
              data-aos="fade-up"
              className="relative w-[120px] h-[160px] md:w-[250px] mr-2 md:mr-4 md:h-[260px] flex justify-center items-center rounded-tr-2xl bg-gradient-to-r from-[#253466] to-[#4A67CC] group overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={O.productImg_3}
                alt="Smoke Detection Cables"
                className="transition-all duration-300 ease-in-out group-hover:opacity-40 w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-xs md:text-lg font-bold text-center px-2">
                Smoke Detection Cables
              </span>
            </Link>

            {/* Card 4 */}
            <Link
              to={`/product/${encodeURIComponent("Power LT Cables")}`}
              data-aos="fade-down"
              className="relative w-[120px] h-[170px] mt-2 md:mt-0 md:w-[250px] md:h-[320px] flex justify-center items-center rounded-tl-2xl bg-gradient-to-r from-[#253466] to-[#4A67CC] group overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={O.productImg_4}
                alt="Power LT Cables"
                className="transition-all duration-300 ease-in-out group-hover:opacity-40 w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-xs md:text-lg font-bold text-center px-2">
                Power LT Cables
              </span>
            </Link>
          </div>
        </div>

        {/* Text Showcase Section */}
        <div className="md:w-[40%] mt-8 md:mt-0">
          <div>
            <div className="hidden md:block">
              <p className="text-[#880000] font-bold text-6xl mb-5 font-inter">OUR</p>
              <p className="text-black font-bold text-6xl mb-10 font-inter">PRODUCT</p>
            </div>
            <p className="text-sm mt-5 md:text-2xl text-[#880000] font-inter leading-relaxed">
              Our comprehensive range of cables, including Fire Alarm, Fire Resistant, Smoke Detection, Fire Survival, Instrumentation Signal, Power LT, Control, and RTD/Thermocouple cables, caters to diverse industrial and commercial applications. Each type is meticulously designed for optimal performance, durability, and safety.
            </p>
          </div>
        </div>
      </div>

      {/* Button link */}
      <div className="flex justify-center items-center mb-24">
        <Link
          to="/products"
          className="font-inter p-2 md:p-4 border-[2px] md:mt-10 md:border-[3px] border-[#880000] bg-white text-[#AE1B1B] rounded-lg text-lg font-bold hover:bg-[#880000] hover:text-white hover:border-white transition-all duration-300 shadow-md"
        >
          More Products
        </Link>
      </div>
    </section>
  );
};

export default ProductShowcase;
