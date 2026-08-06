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
    <section className="text-white relative flex flex-col items-center justify-center pt-8 md:pt-16 overflow-hidden">
      <div className="relative z-20 flex flex-col md:flex-row items-center space-y-8 md:space-x-8 md:space-y-0 w-full max-w-screen-lg p-0">
        {/* Left: Hand holding heart illustration */}
        <div className="relative w-full md:w-1/2 flex-shrink-0 flex items-center justify-center pt-10 md:pt-0">
          {/* Animated rings behind the hand */}
          <div className="absolute inset-0 m-auto w-64 h-64 border border-black/10 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-0 m-auto w-48 h-48 border border-red-500/20 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
          
          <img
            src="/handshake.png"
            alt="Handshake"
            className="h-auto w-3/5 md:w-3/5 relative z-30 mb-8 md:-mb-24 p-0 drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] transition-all duration-300 animate-float"
            data-aos="fade-down"
            data-aos-duration="400"
          />
        </div>

        {/* Right: Commit Text */}
        <div className="relative w-full md:w-1/2 text-center md:text-left px-6 md:px-0 pb-12 md:pb-12" data-aos="fade-up" data-aos-duration="400">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit tracking-tight text-center md:text-left mb-6 text-black">
            <span className="text-black mr-3">WE</span>
            <span className="text-red-600">COMMIT</span>
          </h2>
          <h3 className="text-base md:text-lg text-black font-inter leading-relaxed max-w-lg mx-auto md:mx-0">
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
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WeCommit;
