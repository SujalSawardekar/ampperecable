import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogs } from '../blogs';
import Breadcrumbs from '../components/Breadcrumbs';
import useSEO from '../hooks/useSEO';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogs.find(b => String(b.id) === String(id));

  useSEO(
    post?.fullContent?.metaTitle || `${post?.title} | Amppere Cable Blog`,
    post?.cardSummary || post?.fullContent?.intro || "Read the latest wire and cable industry article from Amppere Cable."
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#04040c] flex flex-col items-center justify-center text-white gap-4">
        <p className="text-2xl font-coolvetica">Blog post not found</p>
        <Link to="/blog" className="text-red-400 hover:text-red-300 underline font-open-sans">← Back to Blogs</Link>
      </div>
    );
  }

  const { fullContent, tags, badge, readTime, date, title } = post;

  // Related posts (exclude current)
  const related = blogs.filter(b => b.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#04040c] text-white">
      <Breadcrumbs items={[
        { label: "Home", path: "/" },
        { label: "Blogs", path: "/blog" },
        { label: title, path: null }
      ]} />

      {/* Hero / Banner */}
      <div className="relative w-full aspect-[21/7] max-h-[480px] overflow-hidden">
        <div className="absolute inset-0">{post.thumbnail}</div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#04040c]" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-0">
          <div className="max-w-3xl mx-auto w-full pb-8 md:pb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-red-600/20 border border-red-600/40 text-red-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {badge}
              </span>
              <span className="text-gray-400 text-xs uppercase tracking-widest">{date}</span>
              <span className="text-gray-500 text-xs">·</span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {readTime}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-coolvetica font-bold text-white leading-tight drop-shadow-lg">
              {fullContent.metaTitle.split('|')[0].trim()}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Article Body */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">

        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-10 transition-colors group font-open-sans"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to all blogs
        </button>

        {/* Intro paragraph */}
        <div className="border-l-4 border-red-600 pl-5 mb-10">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-open-sans italic">
            {fullContent.intro}
          </p>
        </div>

        {/* Article Sections */}
        <div className="space-y-12">
          {fullContent.sections.map((section, idx) => (
            <div key={idx} className="group">
              {/* Section Header */}
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600/15 border border-red-600/30 text-red-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-coolvetica font-bold text-white leading-snug">
                  {section.heading}
                </h2>
              </div>

              {/* Section Body */}
              <div className="pl-12 space-y-4">
                {section.body.split('\n').filter(p => p.trim()).map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-400 leading-[1.9] text-base font-open-sans">
                    {para}
                  </p>
                ))}
              </div>

              {idx < fullContent.sections.length - 1 && (
                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/5">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-xs uppercase tracking-wider text-gray-500 border border-white/10 rounded-full px-3 py-1 hover:border-white/20 hover:text-gray-300 transition-colors cursor-default font-open-sans">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-10 rounded-2xl bg-gradient-to-br from-red-950/40 via-black to-black border border-red-900/30 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Amppere Cable</p>
            <h3 className="text-white font-coolvetica font-bold text-xl mb-1">Need cables for your project?</h3>
            <p className="text-gray-400 text-sm font-open-sans">Our team helps you specify, size, and source the right cable for any application.</p>
          </div>
          <Link to="/contact" className="flex-shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-red-900/40">
            Contact Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-coolvetica font-bold text-white mb-6">More Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(relPost => (
                <Link key={relPost.id} to={`/blog/${relPost.id}`}
                  className="group flex flex-col rounded-xl overflow-hidden border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-red-600/30 transition-all duration-300">
                  <div className="relative aspect-[2/1] overflow-hidden">
                    {relPost.thumbnail}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <span className="absolute top-3 left-3 bg-red-600/20 border border-red-600/40 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {relPost.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1 font-open-sans">{relPost.date}</p>
                    <h4 className="text-white font-coolvetica font-bold text-base leading-snug group-hover:text-red-400 transition-colors">{relPost.title}</h4>
                    <span className="inline-flex items-center gap-1 text-red-500 text-xs font-bold mt-3 group-hover:gap-2 transition-all">
                      Read Article
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
