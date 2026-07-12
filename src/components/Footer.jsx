import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { O } from '../assets';

const Footer = React.memo(() => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const socialLinks = [
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Amppere-Cable/61566408188370/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ampperecable",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCUpTOAVXEGQzM34Eke8kNRA",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/amppere-cable",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="relative bg-[#0b0c10] text-white overflow-hidden font-inter border-t border-red-900/20">
      {/* Background visual texture if needed */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `url(${O.footerBg})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'luminosity'
        }} 
      />
       
      <div className="relative z-10 w-full pt-12 lg:pt-16 pb-6 flex flex-col items-center">
        {/* MIDDLE SECTION: Links & Contact Grid */}
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-12">
          
          {/* Column 1: Company */}
          <div data-aos="fade-right" data-aos-delay="50">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm font-outfit">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Our Products</Link></li>
              <li><Link to="/founder" className="hover:text-white transition-colors">Founder & MD</Link></li>
            </ul>
          </div>

          {/* Column 2: Links */}
          <div data-aos="fade-right" data-aos-delay="100">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm font-outfit">Links</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link to="/clients" className="hover:text-white transition-colors">Clients</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Enquiry</Link></li>
            </ul>
          </div>

          {/* Column 3 & 4: Contact & Socials */}
          <div className="sm:col-span-2" data-aos="fade-left" data-aos-delay="150">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm font-outfit">Contact Us</h4>
            <p className="text-sm text-gray-400 mb-6 max-w-md leading-relaxed">
              Shed no. 28 / A, 1&2, Survey no. 47, Hi-Tech Industrial Area, Village Alyali, Tal-Dist.Palghar, Palghar 401404, Maharashtra, India
            </p>
            <div className="space-y-3 text-sm text-gray-400 font-medium mb-8">
              <p className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:+919370946510">+91 9370946510</a>
              </p>
              <p className="flex items-center gap-3 hover:text-white transition-colors break-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <a href="mailto:infoampperecable@gmail.com">infoampperecable@gmail.com</a>
              </p>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((s, i) => (
                <a 
                  key={i} 
                  href={s.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#cc1111] hover:bg-[#cc1111] transition-all duration-300" 
                  title={s.label}
                >
                   {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Massive Brand Logo */}
        <div className="w-full text-center px-4 overflow-hidden mb-6" data-aos="flip-up" data-aos-delay="300" data-aos-duration="1000">
           <img src={O.bigLogo} alt="Amppere Cable" className="w-full max-w-5xl mx-auto h-auto object-contain" />
        </div>

        {/* Copyright & Legal Section */}
        <div className="w-full max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-medium">
           <div className="text-center lg:text-left">
              <p>© {new Date().getFullYear()} Amppere Cable. All rights reserved.</p>
           </div>
           
           <div className="text-center lg:text-right">
              <p className="flex items-center justify-center gap-2">
                Developed by 
                <a href="https://haloxion.com/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <img src={O.haloxion} alt="Haloxion" className="h-3 md:h-4" />
                </a>
              </p>
           </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
