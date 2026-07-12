import React, { useEffect } from 'react';
import AOS from 'aos';
import { O } from '../assets';

const WeCommit = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 60
    });
    AOS.refreshHard();
    return () => {
      AOS.refresh();
    };
  }, []);

  const benefits = [
    { title: "Proven Durability", icon: O.icon1 },
    { title: "Unyielding Quality", icon: O.icon2 },
    { title: "Customer Satisfaction", icon: O.icon3 },
    { title: "Quality Product", icon: O.icon4 }
  ];

  return (
    <section className="text-white relative flex flex-col items-center justify-center pt-8 md:pt-16">
      <div className="relative z-20 flex flex-col md:flex-row items-center space-y-8 md:space-x-8 md:space-y-0 w-full max-w-screen-lg p-0">
        {/* Left: Hand holding heart illustration */}
        <div className="relative w-full md:w-1/2 flex-shrink-0 flex items-center justify-center">
          <img
            src={O.commit}
            alt="Hand Holding Heart"
            className="h-auto w-3/5 md:w-3/5 relative z-30 -mb-12 md:-mb-24 p-0 drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] transition-all duration-300"
            data-aos="fade-down"
          />
        </div>

        {/* Right: Commit Text */}
        <div className="relative w-full md:w-1/2 text-center md:text-left px-6 md:px-0 pb-8 md:pb-12" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-6 flex flex-col md:flex-row md:items-center">
            <span className="text-red-600 font-inter">
              <span className="text-black md:mr-3 font-inter">WE</span> COMMIT
            </span>
          </h1>
          <h3 className="text-base md:text-lg text-black font-inter leading-relaxed max-w-lg">
            At Amppere Cable, we commit to providing top-quality, reliable products backed by over 30 years of expertise and international certifications. Our state-of-the-art facility and skilled team ensure excellence in every cable we manufacture.
          </h3>
        </div>
      </div>

      {/* Benefits Icons Bar */}
      <div className="relative z-10 bg-custom-blue w-full pt-16 md:pt-24 pb-12 md:pb-16 flex flex-wrap justify-center gap-6 md:gap-[60px] items-center">
        {benefits.map((benefit, idx) => (
          <div
            key={benefit.title}
            className="group relative bg-icon-color p-4 md:p-6 rounded-full overflow-hidden cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={idx * 80}
          >
            <img
              src={benefit.icon}
              alt={benefit.title}
              className="w-14 md:w-20 h-14 md:h-20 transition-transform duration-300 group-hover:scale-95"
            />
            {/* Hover overlay text */}
            <div className="absolute inset-0 bg-black/60 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-center text-xs md:text-sm font-bold px-4">
                {benefit.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeCommit;
