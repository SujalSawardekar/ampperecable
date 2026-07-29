import React, { useRef, useState } from 'react';
import { O } from '../assets';
import Breadcrumbs from '../components/Breadcrumbs';
import useSEO from '../hooks/useSEO';

const Founder = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  useSEO(
    "Sandeep Sawant – Founder & MD | Amppere Cable",
    "Read the message from Sandeep Sawant, Founder & MD of Amppere Cable. Under his leadership, Amppere Cable has built over 30 years of trust in cable manufacturing."
  );

  const certificates = [
    { title: "AMPPERE CABLE GST CERTIFICATE", path: "/AMPPERE CABLE GST CERTIFICATE.pdf" },
    { title: "AMPPERE-CABLE-ISO-9001-2015-Final", path: "/AMPPERE-CABLE-ISO-9001-2015-Final.pdf" },
    { title: "CE", path: "/CE.jpeg" },
    { title: "RoHS AMPPERE CABLE", path: "/RoHS AMPPERE CABLE.pdf" },
    { title: "UL", path: "/UL.jpeg" }
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
              Today, Amppere Cable is recognized for its high-quality, specialized cables, including Instrumentation, Fire Alarm, and Fire Survival Cables. The leadership has not only earned the trust of leading industrial houses but has also positioned Amppere Cable as an <a href="/AMPPERE-CABLE-ISO-9001-2015-Final.pdf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#cc1111] hover:underline font-bold transition-colors">ISO-9001:2015 accredited organization</a> with <a href="/CE.jpeg" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#cc1111] hover:underline font-semibold transition-colors">CE</a> and <a href="/RoHS AMPPERE CABLE.pdf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#cc1111] hover:underline font-semibold transition-colors">RoHS certified</a> products, setting new standards in the industry.
            </p>
          </div>
        </div>
      </div>

      {/* NEW FULL-WIDTH SECTION: Instagram Reel with "THE BOSS" Typography */}
      <div className="relative w-full flex items-center justify-center py-24 bg-gradient-to-b from-transparent via-[#cc1111]/5 to-transparent border-y border-white/5 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-[1200px] h-[500px] bg-[#cc1111]/15 rounded-full blur-[160px]"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16 w-full max-w-7xl mx-auto px-4">
          {/* The Text "THE" */}
          <div className="hidden md:flex flex-1 justify-end z-20 pointer-events-none">
            <span className="text-[7rem] lg:text-[10rem] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white/90 to-white/20 tracking-tighter uppercase font-outfit drop-shadow-[0_10px_30px_rgba(255,255,255,0.15)]">THE</span>
          </div>

          {/* The Video Embed */}
          <div className="relative z-10 w-full max-w-[320px] transform hover:scale-[1.05] hover:-rotate-2 transition-all duration-700 group">
             {/* Soft, circular red glow behind the video container (prevents boxy shadows) */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-[#cc1111]/40 rounded-[100px] blur-[80px] pointer-events-none -z-10 group-hover:bg-[#cc1111]/60 group-hover:blur-[100px] transition-all duration-700"></div>
             
             <div className="relative rounded-[32px] overflow-hidden border-2 border-[#cc1111]/40 bg-[#000] p-1.5 w-full">
               <video 
                 ref={videoRef}
                 src="/THE_BOSS.mp4"
                 className="relative z-10 w-full h-[560px] object-cover rounded-[26px]"
                 autoPlay
                 loop
                 muted={isMuted}
                 playsInline
               />
               
               {/* Video Controls Overlay */}
               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 {/* Play/Pause Button */}
                 <button 
                   onClick={togglePlay}
                   className="text-white hover:text-[#cc1111] transition-colors focus:outline-none"
                   aria-label={isPlaying ? "Pause video" : "Play video"}
                 >
                   {isPlaying ? (
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                   ) : (
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   )}
                 </button>
                 
                 {/* Mute/Unmute Button */}
                 <button 
                   onClick={toggleMute}
                   className="text-white hover:text-[#cc1111] transition-colors focus:outline-none"
                   aria-label={isMuted ? "Unmute video" : "Mute video"}
                 >
                   {isMuted ? (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                   ) : (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                   )}
                 </button>
               </div>

               {/* Minimal Glass Bezel Effect */}
               <div className="absolute inset-0 z-20 rounded-[32px] ring-1 ring-inset ring-white/10 pointer-events-none"></div>
             </div>
          </div>

          {/* The Text "BOSS" */}
          <div className="hidden md:flex flex-1 justify-start z-20 pointer-events-none">
            <span className="text-[7rem] lg:text-[10rem] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-[#cc1111] to-[#ff4d4d] tracking-tighter uppercase font-outfit drop-shadow-[0_0_50px_rgba(204,17,17,0.6)]">BOSS</span>
          </div>
        </div>
        
        {/* Mobile Text (Fallback when hidden on sides) */}
        <div className="absolute top-6 w-full text-center md:hidden pointer-events-none">
          <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-[#cc1111] to-[#cc1111] tracking-tighter uppercase font-outfit drop-shadow-lg">THE BOSS</span>
        </div>
      </div>
    </div>
  );
};

export default Founder;
