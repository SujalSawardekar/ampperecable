import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../blogs';
import Breadcrumbs from '../components/Breadcrumbs';
import useSEO from '../hooks/useSEO';

// Blog Card Component
const BlogCard = ({ post }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/blog/${post.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px",
        border: hovered ? "1px solid rgba(234,34,34,0.3)" : "1px solid rgba(255,255,255,0.08)",
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        cursor: "pointer",
        textDecoration: "none"
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "2/1", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {post.thumbnail}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, #04040c 100%)" }} />
        
        <span style={{ position: "absolute", top: 16, left: 16, background: "rgba(234,34,34,0.12)", border: "1px solid rgba(234,34,34,0.25)", color: "#ea2222", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {post.badge}
        </span>
        
        <span style={{ position: "absolute", top: 16, right: 16, color: "rgba(255,255,255,0.35)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {post.readTime}
        </span>
      </div>

      <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "left" }}>
        <div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {post.date}
          </span>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "8px 0 12px", lineHeight: 1.3 }}>
            {post.title}
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>
            {post.cardSummary}
          </p>
        </div>

        <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#ea2222", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Read Article
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea2222" strokeWidth="2.5" style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.2s" }}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

// Full Article Detail Overlay Modal (ty)
const BlogDetailModal = ({ post, onClose }) => {
  if (!post) return null;
  const { fullContent } = post;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "32px 16px"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 760,
          borderRadius: 28,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "#0a0a16",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          margin: "auto"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          className="hover:bg-white/15 focus:outline-none"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal Header Image */}
        <div style={{ borderRadius: "28px 28px 0 0", overflow: "hidden", aspectRatio: "21/9" }}>
          {post.thumbnail}
        </div>

        {/* Modal Content */}
        <div style={{ padding: "36px 40px 40px", textAlign: "left" }}>
          
          {/* Metadata Row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.2)", color: "#ea2222", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {post.badge}
            </span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              {post.date}
            </span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 18 }}>
            {fullContent.metaTitle.split("|")[0].trim()}
          </h1>

          {/* Intro Paragraph */}
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 36, paddingLeft: 16, borderLeft: "3px solid #ea2222" }}>
            {fullContent.intro}
          </p>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {fullContent.sections.map((section, idx) => (
              <div key={idx}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.2)", color: "#ea2222", fontSize: 11, fontFamily: "monospace", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    {idx + 1}
                  </span>
                  {section.heading}
                </h3>
                <div style={{ paddingLeft: 36 }}>
                  {section.body.split('\n').filter(p => p.trim()).map((para, pIdx) => (
                    <p key={pIdx} style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
                      {para}
                    </p>
                  ))}
                </div>
                {idx < fullContent.sections.length - 1 && (
                  <div style={{ marginTop: 24, height: "1px", background: "rgba(255,255,255,0.05)" }} />
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {post.tags.map((tag, idx) => (
              <span key={idx} style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "4px 10px" }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Call to action card */}
          <div style={{ marginTop: 28, borderRadius: 18, background: "rgba(74,158,255,0.05)", border: "1px solid rgba(74,158,255,0.12)", padding: "24px 28px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ textAlign: "left" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4, margin: 0 }}>
                Need certified cables for your project?
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0, marginTop: 4 }}>
                Our team helps you specify, size, and source the right cable for any application.
              </p>
            </div>
            <Link
              to="/contact"
              onClick={onClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#ea2222",
                color: "#04040c",
                fontSize: 13,
                fontWeight: 700,
                padding: "11px 22px",
                borderRadius: 100,
                textDecoration: "none",
                transition: "background 0.15s",
                flexShrink: 0
              }}
              className="hover:bg-blue-500 hover:text-white"
            >
              Contact Us
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

// Main Blog List Page
const Blog = () => {
  useSEO(
    "Wires & Cables Insights Blog | Amppere Cable",
    "Read the latest industry insights, technical articles, and updates on electrical safety, fire-survival cables, and instrumentation wires from Amppere Cable."
  );

  return (
    <div style={{ background: "#04040c", color: "#fff", minHeight: "100vh" }}>
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Blogs", path: null }
        ]}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        
        {/* Header section */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.35em", color: "#ea2222", marginBottom: 14 }}>
            Insights & Resources
          </p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 18 }}>
            Expert Blogs on <span style={{ color: "#ea2222" }}>Cables & Wiring</span>
          </h1>
          <p style={{ maxWidth: 580, margin: "0 auto", fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
            In-depth technical guidance on fire-rated cables, copper conductor selection, and industrial wiring standards for engineers and project teams across India.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
            {["Certified Products", "IEC / IS Standards", "Industrial Grade"].map((tag, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#ea2222", opacity: 0.6 }} />
                )}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.18em" }}>
                  {tag}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Call to action footer section */}
        <div
          style={{
            marginTop: 64,
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            padding: "40px 44px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            textAlign: "left"
          }}
        >
          <div>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.25em", color: "#ea2222", marginBottom: 8, margin: 0 }}>
              Amppere Cable · Maharashtra, India
            </p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8, marginTop: 4 }}>
              Looking for certified cables for your next project?
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              Fire alarm, fire survival, and instrumentation cables — all tested in-house and ready to supply across India.
            </p>
          </div>
          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#ea2222",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              padding: "13px 26px",
              borderRadius: 100,
              textDecoration: "none",
              flexShrink: 0,
              transition: "background 0.15s"
            }}
            className="hover:bg-blue-600"
          >
            Request a Quote
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Blog;
