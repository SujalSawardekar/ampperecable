import React, { useState } from 'react';
import { O } from '../assets';

// Social Icon Components
const LinkedInPlatformIcon = () => (
  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0A66C2", display: "flex", alignItems: "center", justifyCenter: "center", flexShrink: 0, justifyContent: "center" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  </div>
);

const InstagramPlatformIcon = () => (
  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", display: "flex", alignItems: "center", justifyCenter: "center", flexShrink: 0, justifyContent: "center" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  </div>
);

const FacebookPlatformIcon = () => (
  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1877F2", display: "flex", alignItems: "center", justifyCenter: "center", flexShrink: 0, justifyContent: "center" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  </div>
);

// Post Engagement Icons
const LikeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
  </svg>
);

const CommentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const SocialCard = ({ card }) => {
  const [hovered, setHovered] = useState(false);
  
  // Custom glow shadows depending on platform
  let glowColor = "rgba(239, 35, 52, 0.15)";
  if (card.platform === "linkedin") glowColor = "rgba(10, 102, 194, 0.25)";
  if (card.platform === "instagram") glowColor = "rgba(214, 36, 159, 0.25)";
  if (card.platform === "facebook") glowColor = "rgba(24, 119, 242, 0.25)";

  return (
    <a
      href={card.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(20px)",
        borderRadius: 24,
        border: hovered ? `1px solid ${card.color || "#ef2334"}` : "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
        width: "100%",
        maxWidth: 340,
        minWidth: 280,
        boxShadow: hovered ? `0 25px 50px -12px ${glowColor}` : "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        flexShrink: 0
      }}
    >
      {/* Top Brand Stripe */}
      <div 
        style={{ 
          height: 4, 
          width: "100%", 
          background: card.platform === "linkedin" ? "#0A66C2" : 
                      card.platform === "instagram" ? "linear-gradient(to right, #fdf497, #fd5949, #d6249f, #285AEB)" : 
                      "#1877F2" 
        }} 
      />

      {/* Header Info */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 18px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={O.logo}
            alt="Amppere Cable"
            style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "contain", background: "#ffffff", padding: 2, flexShrink: 0 }}
          />
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
              {card.handle}
            </p>
            <p style={{ margin: 0, fontSize: 11, color: "#9ca3af", lineHeight: 1.3, marginTop: 2 }}>
              {card.timestamp}
            </p>
          </div>
        </div>
        {card.platformIcon}
      </div>

      {/* Post Text */}
      <div style={{ padding: "0 18px 16px", flexGrow: 1 }}>
        <p className="font-inter" style={{ margin: 0, fontSize: 13, color: "#d1d5db", lineHeight: 1.6 }}>
          {card.text}
        </p>
      </div>

      {/* Post Image */}
      <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "rgba(255, 255, 255, 0.05)" }}>
        <img
          src={card.image}
          alt="Social Media Post"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            display: "block",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease"
          }}
        />
      </div>

      {/* Engagement bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "14px 18px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", color: "#9ca3af" }}>
        {card.engagement.map((item, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: hovered ? "#ffffff" : "#9ca3af", transition: "color 0.3s ease" }}>
            {item.icon}
            <span className="font-inter">{item.count}</span>
          </div>
        ))}
      </div>
    </a>
  );
};

const SocialShowcase = () => {
  const cards = [
    {
      handle: "Amppere Cable",
      platform: "linkedin",
      color: "#0A66C2",
      timestamp: "2 hours ago",
      platformIcon: <LinkedInPlatformIcon />,
      profileUrl: "https://www.linkedin.com/company/amppere-cable",
      text: "Thrilled to announce our new line of ultra-durable, high-conductivity copper cables designed for extreme industrial environments. 🔌 Engineered for safety and performance.",
      image: O.post1,
      engagement: [
        { icon: <LikeIcon />, count: 124 },
        { icon: <CommentIcon />, count: 18 },
        { icon: <ShareIcon />, count: 42 }
      ]
    },
    {
      handle: "amppere_cable",
      platform: "instagram",
      color: "#d6249f",
      timestamp: "5 hours ago",
      platformIcon: <InstagramPlatformIcon />,
      profileUrl: "https://www.instagram.com/ampperecable",
      text: "Behind the scenes at our testing facility! Precision matters when it comes to data transmission. 🔬 #AmppereCable #CableInnovation #Engineering #Tech",
      image: O.post2,
      engagement: [
        { icon: <LikeIcon />, count: 856 },
        { icon: <CommentIcon />, count: 34 },
        { icon: <ShareIcon />, count: 112 }
      ]
    },
    {
      handle: "Amppere Cable",
      platform: "facebook",
      color: "#1877F2",
      timestamp: "Yesterday at 10:30 AM",
      platformIcon: <FacebookPlatformIcon />,
      profileUrl: "https://www.facebook.com/people/Amppere-Cable/61566408188370/",
      text: "Join Amppere Cable this weekend at the International Builders' Show! We'll be showcasing our residential wiring solutions #wirecable#amppere 🎉",
      image: O.post3,
      engagement: [
        { icon: <LikeIcon />, count: 342 },
        { icon: <CommentIcon />, count: 28 },
        { icon: <ShareIcon />, count: 56 }
      ]
    }
  ];

  return (
    <section className="bg-black py-[72px] px-6 w-full box-border">
      <div className="text-center mb-12 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit tracking-tight text-center m-0 mb-3 text-white">
          CONNECT WITH US
        </h2>
        <p className="margin-0 font-inter text-sm md:text-base text-gray-400 max-w-lg text-center leading-relaxed">
          Follow our journey, stay updated with the latest wire and cable innovations, and join our professional community on your favorite networks.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {cards.map((card, idx) => (
          <SocialCard key={idx} card={card} />
        ))}
      </div>
    </section>
  );
};

export default SocialShowcase;
