import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { O } from '../assets';
import Breadcrumbs from '../components/Breadcrumbs';
import useSEO from '../hooks/useSEO';
import { Leaf, Lightbulb, Telescope, Target, Map, Layers, Diamond } from 'lucide-react';

// --- Animated Counter Hook ---
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

// --- Animated Stat Card ---
const StatCard = ({ value, suffix, label, icon, startCounting }) => {
  const count = useCounter(value, 2000, startCounting);
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-600/40 transition-all duration-300 group">
      <div className="w-12 h-12 md:w-14 md:h-14 mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
        {typeof icon === 'string' && icon.startsWith('/') ? (
          <img src={icon} alt={label} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">{icon}</div>
        )}
      </div>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        {startCounting ? count : 0}<span className="text-red-500">{suffix}</span>
      </div>
      <p className="text-gray-400 text-xs md:text-sm mt-1.5 md:mt-2 text-center">{label}</p>
    </div>
  );
};

// --- Tab Content Components ---
const ValuesTab = ({ onCertificatesClick }) => {
  const values = [
    { icon: "/icons/7.svg", title: "Quality First", desc: "Every cable we manufacture passes rigorous in-house testing before it leaves our facility. Our commitment to quality is non-negotiable." },
    { icon: <Lightbulb className="w-3/4 h-3/4 text-white" strokeWidth={1.5} />, title: "Innovation", desc: "Continuously investing in R&D and state-of-the-art equipment to stay ahead of industry demands and international standards." },
    { icon: "/icons/9.svg", title: "Customer Focus", desc: "From initial inquiry to post-purchase support, we deliver exceptional service at every stage of the customer journey." },
    { icon: "/icons/10.svg", title: "Reliability", desc: "On-time delivery is our promise. We understand that project timelines depend on us, and we take that responsibility seriously." },
    { icon: <Leaf className="w-3/4 h-3/4 text-white" strokeWidth={1.5} />, title: "Sustainability", desc: "Committed to eco-friendly manufacturing practices, using RoHS-compliant materials and minimizing our environmental footprint." },
    { icon: "/icons/12.svg", title: "Excellence", desc: "ISO 9001, CE, and RoHS certified — our certifications are proof of our unrelenting pursuit of manufacturing excellence." },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {values.map((v, i) => {
        const isExcellence = v.title === "Excellence";
        const content = (
          <>
            <div className="w-12 h-12 mb-3 group-hover:scale-110 inline-block transition-transform duration-300">
              {typeof v.icon === 'string' ? (
                <img src={v.icon} alt={v.title} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">{v.icon}</div>
              )}
            </div>
            <h3 className="text-white font-bold text-base mb-2 font-coolvetica">{v.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-open-sans">{v.desc}</p>
          </>
        );
        if (isExcellence) {
          return (
            <button 
              key={i} 
              onClick={onCertificatesClick}
              data-aos="fade-up" 
              data-aos-delay={i * 80}
              className="p-5 block w-full rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-red-500 hover:from-red-950/30 transition-all duration-300 group cursor-pointer text-left focus:outline-none"
            >
              {content}
              <span className="mt-3 block text-red-400 text-xs font-semibold tracking-wider group-hover:underline">View Certifications &rarr;</span>
            </button>
          );
        }
        return (
          <div key={i} data-aos="fade-up" data-aos-delay={i * 80}
            className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-red-600/50 hover:from-red-950/30 transition-all duration-300 group cursor-default text-left">
            {content}
          </div>
        );
      })}
    </div>
  );
};

const CertificationsTab = () => {
  const certs = [
    { name: "ISO 9001:2015", body: "Bureau Veritas", desc: "Quality Management System — our quality processes, documentation, and traceability are audited to international standards.", color: "from-blue-900/40 to-blue-950/20", badge: "bg-blue-900/30 text-blue-300 border-blue-700/30", path: "/AMPPERE-CABLE-ISO-9001-2015-Final.pdf" },
    { name: "CE Marking", body: "European Conformity", desc: "All applicable products comply with EU safety, health, and environmental requirements for the European market.", color: "from-yellow-900/30 to-yellow-950/20", badge: "bg-yellow-900/30 text-yellow-300 border-yellow-700/30", path: "/CE.jpeg" },
    { name: "RoHS Compliant", body: "Restriction of Hazardous Substances", desc: "Our cables are manufactured without lead, mercury, cadmium, hexavalent chromium, and other restricted substances.", color: "from-green-900/30 to-green-950/20", badge: "bg-green-900/30 text-green-300 border-green-700/30", path: "/RoHS AMPPERE CABLE.pdf" },
    { name: "UL Certification", body: "Underwriters Laboratories", desc: "UL safety certification verifying that our wire and cable products meet global safety, quality, and performance requirements.", color: "from-purple-900/30 to-purple-950/20", badge: "bg-purple-900/30 text-purple-300 border-purple-700/30", path: "/UL.jpeg" },
    { name: "GST Registration", body: "Government of India", desc: "GST registration certificate officially verifying tax compliance and financial reliability for commercial trading across India.", color: "from-orange-900/30 to-orange-950/20", badge: "bg-orange-900/30 text-orange-300 border-orange-700/30", path: "/AMPPERE CABLE GST CERTIFICATE.pdf" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {certs.map((c, i) => (
        <a 
          key={i} 
          href={c.path}
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-up" 
          data-aos-delay={i * 60}
          className={`p-5 block text-left rounded-xl bg-gradient-to-br ${c.color} border border-white/10 hover:border-red-500/50 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] transition-all duration-300 cursor-pointer no-underline`}
        >
          <div className="flex items-start gap-3 mb-3">
            <img src="/icons/quality-white.png" alt="Certified" className="w-7 h-7 object-contain flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold text-base font-coolvetica flex items-center gap-2">
                {c.name}
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${c.badge} font-semibold`}>{c.body}</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-open-sans">{c.desc}</p>
        </a>
      ))}
    </div>
  );
};

const VisionTab = () => (
  <div className="mt-6 space-y-6">
    <div data-aos="fade-right" className="flex gap-5 p-6 rounded-xl bg-gradient-to-r from-red-950/40 to-transparent border border-red-900/30 hover:border-red-600/50 transition-all duration-300">
      <div className="w-14 h-14 flex-shrink-0">
        <Telescope className="w-3/4 h-3/4 text-white mx-auto mt-1" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-2 font-coolvetica">Our Vision</h3>
        <p className="text-gray-300 leading-relaxed font-open-sans">To be India's most trusted manufacturer of specialty cables — recognized globally for quality, innovation, and our unwavering commitment to safety-critical applications. We envision a world where every fire alarm, every emergency system, and every industrial installation is protected by cables that simply never fail.</p>
      </div>
    </div>
    <div data-aos="fade-right" data-aos-delay="100" className="flex gap-5 p-6 rounded-xl bg-gradient-to-r from-blue-950/40 to-transparent border border-blue-900/30 hover:border-blue-600/50 transition-all duration-300">
      <div className="w-14 h-14 flex-shrink-0">
        <Target className="w-3/4 h-3/4 text-white mx-auto mt-1" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-2 font-coolvetica">Our Mission</h3>
        <p className="text-gray-300 leading-relaxed font-open-sans">To manufacture and supply high-performance, certified wire and cable solutions that protect lives, enable industry, and power India's infrastructure — backed by decades of expertise, continuous innovation, and a customer-first philosophy that goes beyond the order to the long-term partnership.</p>
      </div>
    </div>
    <div data-aos="fade-right" data-aos-delay="200" className="flex gap-5 p-6 rounded-xl bg-gradient-to-r from-green-950/40 to-transparent border border-green-900/30 hover:border-green-600/50 transition-all duration-300">
      <div className="w-14 h-14 flex-shrink-0">
        <img src="/icons/12.svg" alt="Promise" className="w-full h-full object-contain" />
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-2 font-coolvetica">Our Promise</h3>
        <p className="text-gray-300 leading-relaxed font-open-sans">Every drum that leaves our Maharashtra facility carries with it a Certificate of Conformance, third-party test results, and the full weight of 30+ years of manufacturing integrity. We don't just sell cables — we sell the assurance that they will perform when it matters most.</p>
      </div>
    </div>
  </div>
);

// --- Manufacturing Process Section ---
const ManufacturingSection = () => {
  const processes = [
    {
      name: "Insulation",
      videoPath: O.video3,
      step: "01",
      desc: "High-grade PVC or XLPE compound is melted and extruded over raw copper conductors to build basic electrical resistance and prevent leakage."
    },
    {
      name: "Laying",
      videoPath: O.video4,
      step: "02",
      desc: "Insulated cores are systematically stranded together in precise configurations to form the multi-core cable structure and optimize overall flexibility."
    },
    {
      name: "Shielding",
      videoPath: O.frame,
      step: "03",
      desc: "Aluminium-mylar foil or copper wire braiding is applied as a protective screen to block electromagnetic interference (EMI) and preserve clean signals."
    },
    {
      name: "Armouring",
      videoPath: O.video2,
      step: "04",
      desc: "Steel wire or steel tape armouring is helically wrapped to supply high mechanical strength, crush resistance, and protection in harsh environments."
    },
    {
      name: "Outer Sheathing",
      videoPath: O.video5,
      step: "05",
      desc: "A final outer jacket of specialized FR (Flame Retardant) or LSZH (Low Smoke Zero Halogen) compound is applied to insulate, protect, and fireproof."
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);

  // Synchronize play/pause with video player state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPaused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [isPaused, activeIdx]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleVideoEnded = () => {
    setProgress(0);
    setActiveIdx((prevIdx) => (prevIdx + 1) % processes.length);
  };

  const handleSelectStep = (idx) => {
    setActiveIdx(idx);
    setProgress(0);
    setIsPaused(false); // Reset pause when switching steps
  };

  const handleVideoClick = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section className="relative bg-[#050505] py-20 lg:py-28 px-4 overflow-hidden border-t border-white/5">
      {/* Decorative background lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1a1a6e]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-left mb-12 md:mb-16">
          <p className="text-xs font-semibold text-red-500 tracking-[0.3em] uppercase mb-2">How We Make It</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight font-coolvetica">
            Manufacturing Process
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-xl">
            Take a deep dive into our state-of-the-art manufacturing flow. Each cable is crafted through precise steps ensuring absolute safety and performance.
          </p>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Stepper list (Click to change process) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-4">
            {processes.map((proc, index) => {
              const isActive = index === activeIdx;
              return (
                <div
                  key={proc.name}
                  onClick={() => handleSelectStep(index)}
                  className={`group relative cursor-pointer text-left p-5 rounded-2xl border transition-all duration-500 flex items-start gap-4 ${
                    isActive
                      ? "bg-gradient-to-br from-red-950/40 via-red-950/20 to-transparent border-red-600/40 shadow-[0_4px_30px_rgba(239,68,68,0.1)]"
                      : "bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Step indicator dot/number */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-red-600 text-white shadow-[0_0_15px_#ef4444]"
                          : "bg-white/10 text-gray-400 group-hover:bg-white/25 group-hover:text-white"
                      }`}
                    >
                      {proc.step}
                    </div>
                    {/* Vertical connecting line between steps */}
                    {index < processes.length - 1 && (
                      <div
                        className={`w-0.5 h-12 my-2 transition-all duration-300 ${
                          isActive ? "bg-red-600" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold font-coolvetica transition-all duration-300 ${
                        isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {proc.name}
                    </h3>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isActive ? "max-h-[150px] opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-400 text-sm leading-relaxed font-open-sans">
                        {proc.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Immersive Video Player */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div 
              onClick={handleVideoClick}
              className="relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] aspect-video w-full flex-grow flex items-center justify-center group cursor-pointer"
            >
              {/* Outer frame gradient accents */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-10 pointer-events-none" />
              
              {/* Video Player */}
              <video
                ref={videoRef}
                key={processes[activeIdx].videoPath}
                src={processes[activeIdx].videoPath}
                autoPlay
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-[1.01]"
              />

              {/* Play Overlay Icon when paused (No dark background screen, crystal clear view!) */}
              {isPaused && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.7)] backdrop-blur-sm transform scale-100 animate-pulse">
                    <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Top corner status badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm transition-colors duration-300 ${
                  isPaused ? "bg-amber-600/90 text-white" : "bg-red-600/90 text-white"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-amber-200" : "bg-white animate-pulse"}`} />
                  {isPaused ? "Paused (Click to play)" : "Live View"}
                </span>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <div className="text-left">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-1">
                    Process Step {processes[activeIdx].step}
                  </span>
                  <h4 className="text-xl font-extrabold text-white font-coolvetica">
                    {processes[activeIdx].name}
                  </h4>
                </div>
                <div className="text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 font-mono text-sm">
                  {processes[activeIdx].step} / 05
                </div>
              </div>
            </div>

            {/* Video Auto-Play Progress Bar */}
            <div className="mt-4 bg-white/5 rounded-full h-1 w-full overflow-hidden border border-white/5">
              <div
                className={`h-full transition-all duration-75 ease-linear shadow-[0_0_8px_#ef4444] ${
                  isPaused ? "bg-amber-500" : "bg-red-600"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Manual Controls indicator */}
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500 px-1">
              <span>{isPaused ? "⏸️ Playback Paused (Click video to resume)" : "Click process on left to change video • Click video to pause/play"}</span>
              <div className="flex gap-2">
                {processes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectStep(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIdx ? "bg-red-600 w-6" : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main About Page ---
const About = () => {
  useSEO(
    "Wire & Cable Manufacturer in Maharashtra | Amppere Cable",
    "Amppere Cable is a trusted wire and cable manufacturer based in Maharashtra, delivering quality-tested electrical cables for industrial, commercial and domestic use."
  );

  const [activeTab, setActiveTab] = useState('values');
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  useEffect(() => {
    AOS.init({ duration: 600, once: false, mirror: true, offset: 60 });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsStarted(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'values', label: 'Core Values', icon: <Diamond className="w-5 h-5 text-white" strokeWidth={2} /> },
    { id: 'certifications', label: 'Certifications', icon: '/icons/quality-white.png' },
    { id: 'vision', label: 'Vision & Mission', icon: <Telescope className="w-5 h-5 text-white" strokeWidth={2} /> },
  ];

  const stats = [
    { value: 30, suffix: '+', label: 'Years of Expertise', icon: '/icons/3.svg' },
    { value: 8, suffix: '+', label: 'Product Categories', icon: <Layers className="w-3/4 h-3/4 text-white" strokeWidth={1.5} /> },
    { value: 50, suffix: '+', label: 'Clients Nationwide', icon: <Map className="w-3/4 h-3/4 text-white" strokeWidth={1.5} /> },
    { value: 100, suffix: '%', label: 'In-House Testing', icon: '/icons/6.svg' },
  ];

  return (
    <div className="w-full bg-[#000000] pt-[64px] md:pt-[76px]">
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "About Us", path: null }]} isDarkTheme={true} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#120a0a] to-black">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-900/20 blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-16 md:py-28 text-center">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 bg-red-950/40 border border-red-800/30 text-red-400 text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Est. 1993 · Maharashtra, India
          </div>
          <h1 data-aos="fade-up" className="text-4xl md:text-6xl lg:text-7xl font-coolvetica font-bold text-white mb-6 leading-tight">
            Built on <span className="text-red-500">30 Years</span><br />of Cable Expertise
          </h1>
          <p data-aos="fade-up" data-aos-delay="100" className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-open-sans mb-10">
            Amppere Cable is a leading manufacturer of Low Tension Copper Conductor Wires and Cables, operating from our state-of-the-art facility in Maharashtra. CE and RoHS certified, trusted by industries across India.
          </p>
          <div data-aos="fade-up" data-aos-delay="200" className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-red-900/30">
              Explore Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-full border border-white/10 hover:border-white/25 transition-all duration-300">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Stats */}
      <div ref={statsRef} className="border-t border-b border-white/5 bg-black/40">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} startCounting={statsStarted} />
            ))}
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div data-aos="fade-right">
            <p className="text-xs font-semibold text-red-500 tracking-[0.3em] uppercase mb-3">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-coolvetica font-bold text-white mb-5 leading-tight">A One-Stop Shop for All Wire &amp; Cable Needs</h2>
            <p className="text-gray-400 leading-relaxed mb-4 font-open-sans">Amppere Cable combines technical prowess with a commitment to meeting our customers' unique requirements. From Fire Alarm Cables to Instrumentation Signal Cables, every product we manufacture is built to perform in the most demanding conditions.</p>
            <p className="text-gray-400 leading-relaxed font-open-sans">Equipped with international-standard machinery and comprehensive in-house testing facilities, we are a well-knitted team that delivers high-quality, reliable products — consistently, every time.</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { name: 'ISO 9001', path: '/AMPPERE-CABLE-ISO-9001-2015-Final.pdf' },
                { name: 'CE Certified', path: '/CE.jpeg' },
                { name: 'RoHS Compliant', path: '/RoHS AMPPERE CABLE.pdf' }
              ].map(tag => (
                <a 
                  key={tag.name} 
                  href={tag.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 hover:text-white transition-all cursor-pointer no-underline"
                >
                  {tag.name}
                </a>
              ))}
            </div>
          </div>
          <div data-aos="fade-left" className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={O.aboutCables} alt="Amppere Cable Products" className="w-full h-72 md:h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-red-600 text-white rounded-xl px-5 py-3 shadow-lg">
              <p className="text-2xl font-coolvetica font-bold">30+</p>
              <p className="text-xs font-open-sans">Years of Trust</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Section */}
      <div id="deep-dive-section" className="bg-gradient-to-b from-black to-[#0a0505] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="text-center mb-10" data-aos="fade-up">
            <p className="text-xs font-semibold text-red-500 tracking-[0.3em] uppercase mb-3">Deep Dive</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">What Drives Us</h2>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-8" data-aos="fade-up" data-aos-delay="100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 font-open-sans ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {typeof tab.icon === 'string' ? (
                  <img src={tab.icon} alt={tab.label} className="w-5 h-5 object-contain" />
                ) : (
                  <div className="flex items-center justify-center">{tab.icon}</div>
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div key={activeTab}>
            {activeTab === 'values' && (
              <ValuesTab 
                onCertificatesClick={() => {
                  setActiveTab('certifications');
                  setTimeout(() => {
                    const el = document.getElementById('deep-dive-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }} 
              />
            )}
            {activeTab === 'certifications' && <CertificationsTab />}
            {activeTab === 'vision' && <VisionTab />}
          </div>
        </div>
      </div>

      {/* Manufacturing Process */}
      <ManufacturingSection />

      {/* CTA Banner */}
      <div className="bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-coolvetica font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-gray-400 mb-8 font-open-sans max-w-xl mx-auto">Whether you need fire-rated cables for a new facility or a custom instrumentation cable solution, our team is ready to help.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-red-900/30">
              Send an Enquiry
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full border border-white/10 hover:border-white/25 transition-all duration-300">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
