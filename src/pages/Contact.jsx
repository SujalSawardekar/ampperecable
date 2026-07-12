import React, { useState } from 'react';
import { O } from '../assets';
import Breadcrumbs from '../components/Breadcrumbs';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill out all required fields");
      return;
    }

    setLoading(true);

    // Simulate API request to "/api/sendMail"
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 1200);
  };

  return (
    <div className="bg-black text-white min-h-screen font-inter pb-20">
      
      {/* Header Section */}
      <div className="pt-16 pb-12 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
      </div>

      {/* Main Content: 2-Column Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Column: Contact Information */}
        <div className="bg-[#111111] p-8 md:p-12 rounded-3xl shadow-xl border border-white/5 flex flex-col justify-center h-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Information</h2>
          <p className="text-gray-400 mb-10 leading-relaxed text-sm md:text-base">
            Have questions or need help with your digital project? Our team is always ready to assist you with professional solutions and reliable support. Feel free to contact us anytime and we will respond as quickly as possible.
          </p>
          
          <div className="space-y-8">
            {/* Phone */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                <a href="tel:+919370946510" className="text-gray-400 hover:text-white transition-colors">+91 9370946510</a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Address</h3>
                <a href="mailto:infoampperecable@gmail.com" className="text-gray-400 hover:text-white transition-colors break-all">infoampperecable@gmail.com</a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Opening Hour</h3>
                <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Our Location</h3>
                <p className="text-gray-400">Shed no. 28/A, 1&2, Survey no. 47, Hi-Tech Industrial Area, Alyali, Tal-Dist.Palghar, Palghar 401404, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Get In Touch Form */}
        <div className="bg-[#111111] p-8 md:p-12 rounded-3xl shadow-xl border border-white/5 h-full">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-medium">Get in Touch</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">
            We would love to hear about your project and help you grow your business online. Fill out the contact form and our team will get back to you soon with the best possible solution for your needs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name *"
                className="w-full bg-[#1a1a1a] border border-white/5 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-red-600 transition-colors"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className="w-full bg-[#1a1a1a] border border-white/5 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full bg-[#1a1a1a] border border-white/5 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-red-600 transition-colors"
              />
              <input
                type="text"
                name="service"
                placeholder="Service You're Interested"
                className="w-full bg-[#1a1a1a] border border-white/5 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message *"
              rows="4"
              className="w-full bg-[#1a1a1a] border border-white/5 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-red-600 transition-colors resize-none"
            ></textarea>

            {errorMsg && <p className="text-red-500 font-medium text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 font-medium text-sm">{successMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex items-center justify-center gap-2 bg-red-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-red-700 transition-all duration-300 shadow-md active:scale-95 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && (
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm font-medium">Our Location</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
          Visit Our Office For In-person Meetings And Consultations
        </h2>
        <p className="text-gray-400 mb-12 max-w-3xl text-lg">
          Locate us: Shed no. 28/A, 1&2, Survey no. 47, Hi-Tech Industrial Area, Alyali, Tal-Dist.Palghar, Palghar 401404, Maharashtra, India
        </p>

        <div className="w-full mt-10 overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-all duration-500">
          <iframe 
            src="https://maps.google.com/maps?q=Amppere%20Cable%2C%20Palghar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="500" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Amppere Cable Location Map"
            className="w-full h-[500px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
