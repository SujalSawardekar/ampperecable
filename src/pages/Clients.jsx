import React from 'react';
import { O } from '../assets';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import useSEO from '../hooks/useSEO';

const Clients = () => {
  useSEO(
    "Our Clients & Trusted Brands | Amppere Cable",
    "Amppere Cable is proud to be trusted by great brands and leading companies worldwide for certified, durable wires and cables."
  );

  const clientLogos = [
    { logo: O.comany1, name: "Schneider Electric" },
    { logo: O.comany2, name: "Genpact" },
    { logo: O.comany3, name: "Mindspace" },
    { logo: O.comany4, name: "Dell" },
    { logo: O.comany5, name: "Punjab National Bank" },
    { logo: O.comany6, name: "Kotak Mahindra Bank" },
    { logo: O.comany11, name: "Mahindra Aerospace" },
    { logo: O.nexus, name: "Nexus Engineering" },
    { logo: O.comany10, name: "Capgemini" },
    { logo: O.comany12, name: "BSE India" },
    { logo: O.comany13, name: "NXP Semiconductors" },
    { logo: O.review1, name: "Junani Group" },
    { logo: O.review3, name: "Kiam Services" }
  ].filter(item => Boolean(item.logo));

  const stats = [
    { val: "30+", label: "Years of Heritage" },
    { val: "50+", label: "Enterprise Customers" },
    { val: "100%", label: "Tested for Safety" },
    { val: "5M+", label: "Meters of Cable Delivered" }
  ];

  const projects = [
    {
      client: "Schneider Electric India",
      role: "Industrial Automation Partner",
      desc: "Supplied specialized high-integrity Instrumentation Shielded Signal Cables for their automated plant facility. Ensured perfect signal throughput and noise rejection under high EMF environments.",
      tag: "Instrumentation Cables"
    },
    {
      client: "Mahindra Aerospace",
      role: "Aviation Testing Facility",
      desc: "Provided high-performance zero-halogen Flame Retardant (FRLS) power and control cables for their precision testing laboratories, complying with rigorous aviation safety standards.",
      tag: "Flame Retardant Wires"
    },
    {
      client: "Capgemini IT Campus",
      role: "Commercial Enterprise Fitout",
      desc: "Fitted massive office workspace campuses in Pune and Mumbai with high-conductivity copper building wires, ensuring complete safety compliance under the National Building Code (NBC 2016).",
      tag: "House Wires"
    }
  ];

  return (
    <div className="bg-[#f5f3f3] min-h-screen text-black">
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Our Clients", path: null }
        ]}
      />

      {/* SECTION 1: Client Logo Grid & Left Text (At the very top, white background) */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* Left text description */}
            <div className="w-full lg:w-[35%] lg:sticky lg:top-24 text-center lg:text-left" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-5 leading-tight text-black">
                Trusted by <br/>
                <span className="text-[#E91F1F]">great brands</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6 font-open-sans">
                Amppere Cable is committed to delivering high-quality, reliable cable solutions. Our dedication to excellence has made us the preferred choice for leading enterprises worldwide.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed font-open-sans">
                From public institutions like BSE India and Kotak Mahindra Bank to engineering and tech companies like Capgemini and Schneider Electric, our cables deliver safety and stability.
              </p>
            </div>

            {/* Right Side: Logo Grid */}
            <div className="w-full lg:w-[65%]" data-aos="fade-left">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {clientLogos.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-100 h-32 md:h-36 flex justify-center items-center rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-red-500/30 transition-all duration-300 group cursor-pointer"
                  >
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: Stats Banner & counters (Moved downward, dark divider background for contrast) */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#120a0a] to-black py-20 lg:py-24 text-white text-center border-t border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-950/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 mb-12" data-aos="fade-down">
          <span className="text-xs font-semibold text-red-500 tracking-[0.3em] uppercase mb-3 inline-block">Enterprise Trust</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-outfit mb-4 text-white leading-tight">
            Trusted by the Reputable Brands
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-open-sans">
            We are proud to have earned the trust of some of India's most demanding industrial corporations and organizations.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              <p className="text-3xl md:text-4xl font-black text-red-500 font-outfit">{s.val}</p>
              <p className="text-xs text-gray-400 font-inter mt-1.5 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Case Studies Section (Light gray background at the very bottom) */}
      <section className="py-20 bg-[#f9fafb] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs font-semibold text-red-500 tracking-[0.3em] uppercase mb-3 inline-block">Real Impact</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-black">Project Case Studies</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto mt-3">
              Explore how we have engineered specialized solutions for critical infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-white border border-gray-150 rounded-3xl p-8 flex flex-col justify-between hover:border-red-500 transition-all duration-300 relative group shadow-sm hover:shadow-md"
              >
                <div className="absolute top-6 right-6 text-red-500/10 font-black text-6xl select-none group-hover:text-red-500/15 transition-colors">
                  0{idx + 1}
                </div>
                <div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-200">
                    {p.tag}
                  </span>
                  <h3 className="text-black font-bold text-xl font-outfit mt-6">
                    {p.client}
                  </h3>
                  <p className="text-xs text-gray-400 font-inter mt-1">
                    {p.role}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mt-6 font-open-sans">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-8 border-t border-gray-100 pt-4">
                  <Link to="/contact" className="text-xs text-red-500 font-bold group-hover:text-red-600 transition-colors hover:underline">
                    Partner With Us &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
