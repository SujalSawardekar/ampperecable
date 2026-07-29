import React, { useState, useEffect, useRef, useTransition } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Flame,
  ShieldCheck,
  Layers,
  Award,
  CheckCircle2,
  ArrowRight,
  RotateCw,
  Play,
  Pause,
  Download,
  Maximize2,
  ChevronDown,
  Sliders,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  X,
  FileText,
  Shield,
  Cpu,
  Activity,
  Check
} from 'lucide-react';

const TOTAL_FRAMES = 240;
const BACKGROUND_COLOR = '#390609';

const padFrame = (num) => String(num).padStart(3, '0');

const ProductScrollLanding = () => {
  // Canvas and Scroll Refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameIdRef = useRef(null);

  // Animation Frame State
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  // React State
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledNav, setIsScrolledNav] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Quote Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cableType: 'Fire Survival Cable (11kV)',
    quantity: '1000m',
    message: ''
  });

  // 1. Preload Frame Sequence
  useEffect(() => {
    let loaded = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${padFrame(i)}.webp`;

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsPreloaded(true);
        }
      };

      img.onerror = () => {
        // Fallback for missing frame to keep counter advancing
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsPreloaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    // Allow interaction if at least 30 frames are ready for fast startup
    const timer = setTimeout(() => {
      setIsPreloaded(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // 2. Scroll Listener & Progress Calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      let progress = currentScroll / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
      setIsScrolledNav(window.scrollY > 30);

      if (!autoPlay) {
        targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoPlay]);

  // 3. Auto-Play Loop (Optional 360° auto-rotation)
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      targetFrameRef.current = (targetFrameRef.current + 1) % TOTAL_FRAMES;
    }, 40);

    return () => clearInterval(interval);
  }, [autoPlay]);

  // 4. Render Canvas & Eased Interpolation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const render = () => {
      // Easing interpolation for buttery scroll feel
      const easeFactor = 0.09;
      const delta = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += delta * easeFactor;

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      setCurrentFrameDisplay(frameIndex);

      // Handle HiDPI Canvas Scaling
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear Canvas with Exact #BACKGROUND (#390609)
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Draw Loaded Image Frame
      const img = imagesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth !== 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = displayWidth / displayHeight;

        let drawW, drawH;
        // Scale to fit comfortably with elegant padding
        if (canvasRatio > imgRatio) {
          drawH = displayHeight * 0.82;
          drawW = drawH * imgRatio;
        } else {
          drawW = displayWidth * 0.85;
          drawH = drawW / imgRatio;
        }

        const drawX = (displayWidth - drawW) / 2;
        const drawY = (displayHeight - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }

      ctx.restore();
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Jump to specific landmark frames
  const jumpToPreset = (targetPct) => {
    setAutoPlay(false);
    targetFrameRef.current = targetPct * (TOTAL_FRAMES - 1);
    
    // Smooth scroll to container position
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      const scrollToY = containerTop + targetPct * containerHeight;
      window.scrollTo({ top: scrollToY, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
    }, 2500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#390609] text-white selection:bg-red-500 selection:text-white font-sans overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. Sleek Preloader Overlay */}
      {/* ========================================================================= */}
      {!isPreloaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#390609] transition-opacity duration-700">
          <div className="relative flex flex-col items-center max-w-md px-6 text-center">
            {/* Spinning Brand Badge */}
            <div className="w-20 h-20 mb-8 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin" />
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 font-bold text-xl">
                A
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-wider mb-2 text-white">
              AMPPERE CABLE
            </h2>
            <p className="text-xs uppercase tracking-widest text-red-300/70 mb-6">
              Loading 3D Product Visualizer
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-1.5 bg-red-950/60 rounded-full overflow-hidden mb-3 p-0.5 border border-red-500/20 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-400 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>

            <div className="text-xs font-mono text-gray-400">
              {Math.round((loadedCount / TOTAL_FRAMES) * 100)}% ({loadedCount}/{TOTAL_FRAMES} Frames)
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. Minimal Fixed Top Nav (Transparent at top, Blur on Scroll) */}
      {/* ========================================================================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 ${
          isScrolledNav
            ? 'bg-[#390609]/80 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform border border-red-400/30">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-widest text-lg leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                AMPPERE <span className="text-red-500">CABLE</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-red-300/80 uppercase font-semibold">
                Fire Survival Tech
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-gray-300">
            <button
              onClick={() => jumpToPreset(0.0)}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Overview
            </button>
            <button
              onClick={() => jumpToPreset(0.25)}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Conductor
            </button>
            <button
              onClick={() => jumpToPreset(0.5)}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Fire Shield
            </button>
            <button
              onClick={() => jumpToPreset(0.75)}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Armoring
            </button>
            <a
              href="#specifications"
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Tech Specs
            </a>
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-500 to-red-600 rounded-full animate-gradient-x" />
              <span className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#390609] text-xs font-semibold uppercase tracking-wider text-white group-hover:bg-opacity-80 transition-all">
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. Main Sticky Canvas Scrolltelling Section (550vh Tall) */}
      {/* ========================================================================= */}
      <div ref={containerRef} className="relative h-[550vh] w-full bg-[#390609]">
        {/* Sticky Canvas Container */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#390609]">
          {/* Background Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* The Full-Screen 3D Frame Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block bg-[#390609] z-10 cursor-grab active:cursor-grabbing"
          />

          {/* --------------------------------------------------------------------- */}
          {/* Overlay Text Cards - Phase Timed to Scroll Progress */}
          {/* --------------------------------------------------------------------- */}

          {/* PHASE 1: HERO OVERVIEW (0% - 16% Progress) */}
          <div
            className={`absolute z-20 max-w-xl text-center px-6 transition-all duration-700 pointer-events-none ${
              scrollProgress < 0.16
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-10 scale-95'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300">
                360° Interactive Product Experience
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
              AMPPERE ULTRA <span className="text-red-500">CABLE</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-lg mx-auto mb-8">
              High-voltage continuous-cast copper conductor cable engineered for extreme flame survival, zero-halogen toxicity, and heavy industrial power grids.
            </p>
            <div className="inline-flex items-center gap-3 text-xs font-mono text-red-300/80 animate-bounce">
              <div className="w-4 h-7 rounded-full border-2 border-red-400/40 flex items-start justify-center p-1">
                <div className="w-1 h-2 bg-amber-400 rounded-full animate-ping" />
              </div>
              <span>Scroll down to deconstruct cable engineering</span>
            </div>
          </div>

          {/* PHASE 2: CORE CONDUCTOR (20% - 38% Progress) */}
          <div
            className={`absolute z-20 left-6 sm:left-16 md:left-24 max-w-md transition-all duration-700 pointer-events-none ${
              scrollProgress >= 0.2 && scrollProgress <= 0.38
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="p-6 rounded-2xl bg-[#390609]/80 backdrop-blur-xl border border-red-500/20 shadow-2xl shadow-black/80">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>PHASE 01 // CONDUCTIVITY CORE</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                99.99% Electrolytic Pure Copper
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Continuous-cast oxygen-free copper core delivering optimal current density with minimal line resistance and zero power dissipation.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Purity</span>
                  <span className="font-mono font-bold text-amber-300">99.99% ETP</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Resistivity</span>
                  <span className="font-mono font-bold text-amber-300">&lt; 0.01724 Ω·mm²</span>
                </div>
              </div>
            </div>
          </div>

          {/* PHASE 3: INSULATION & FIRE BARRIER (42% - 60% Progress) */}
          <div
            className={`absolute z-20 right-6 sm:right-16 md:right-24 max-w-md transition-all duration-700 pointer-events-none ${
              scrollProgress >= 0.42 && scrollProgress <= 0.6
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="p-6 rounded-2xl bg-[#390609]/80 backdrop-blur-xl border border-amber-500/20 shadow-2xl shadow-black/80">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-2">
                <Flame className="w-4 h-4 text-red-400" />
                <span>PHASE 02 // THERMAL FIRE SHIELD</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Mica Glass Barrier &amp; XLPE Insulation
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Dual-layer synthetic Phlogopite Mica tape coupled with Cross-Linked Polyethylene (XLPE) guarantees 3-hour continuous survival under 950°C flames.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Flame Rating</span>
                  <span className="font-mono font-bold text-red-400">950°C / 180 Min</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Toxicity</span>
                  <span className="font-mono font-bold text-red-400">Zero Halogen (LSZH)</span>
                </div>
              </div>
            </div>
          </div>

          {/* PHASE 4: STEEL ARMORING (64% - 80% Progress) */}
          <div
            className={`absolute z-20 left-6 sm:left-16 md:left-24 max-w-md transition-all duration-700 pointer-events-none ${
              scrollProgress >= 0.64 && scrollProgress <= 0.8
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="p-6 rounded-2xl bg-[#390609]/80 backdrop-blur-xl border border-red-500/20 shadow-2xl shadow-black/80">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-300 mb-2">
                <ShieldCheck className="w-4 h-4 text-gray-300" />
                <span>PHASE 03 // MECHANICAL ARMOR</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Galvanized Steel Wire Armoring (SWA)
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Heavy-duty GI steel armor layer protects against direct mechanical crushing, severe impact loads, underground rodent attacks, and tensile strain.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Protection</span>
                  <span className="font-mono font-bold text-gray-200">Heavy Mechanical</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Burial</span>
                  <span className="font-mono font-bold text-gray-200">Direct Underground</span>
                </div>
              </div>
            </div>
          </div>

          {/* PHASE 5: CERTIFIED SPECS & MASTERY (84% - 100% Progress) */}
          <div
            className={`absolute z-20 max-w-lg text-center px-6 transition-all duration-700 pointer-events-none ${
              scrollProgress >= 0.84
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="p-8 rounded-3xl bg-[#390609]/90 backdrop-blur-2xl border border-red-500/30 shadow-2xl shadow-black/90">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 mb-3">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-300">
                  ISO 9001:2015 | CE | RoHS CERTIFIED
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3">
                Ready for Critical Infrastructure
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Trusted across Metro Railways, Nuclear Power Plants, High-Rise Complexes, and Heavy Chemical Refineries worldwide.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/50 hover:scale-105 transition-transform"
                >
                  Get Custom Quote
                </button>
                <a
                  href="#specifications"
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                >
                  View Datasheet
                </a>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* Interactive Bottom Control HUD */}
          {/* --------------------------------------------------------------------- */}
          <div className="absolute bottom-6 left-6 right-6 z-30 max-w-4xl mx-auto flex items-center justify-between p-3 rounded-2xl bg-[#390609]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            {/* Frame & Progress Info */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title={autoPlay ? "Pause Auto Rotation" : "Play Auto 360° Rotation"}
              >
                {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase">3D Frame</span>
                <span className="text-amber-400 font-bold">
                  {padFrame(currentFrameDisplay + 1)} / {TOTAL_FRAMES}
                </span>
              </div>
            </div>

            {/* Quick Perspective Presets */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[
                { label: '0° Intro', pct: 0.0 },
                { label: '90° Core', pct: 0.25 },
                { label: '180° Shield', pct: 0.5 },
                { label: '270° Armor', pct: 0.75 },
                { label: '360° End', pct: 1.0 }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToPreset(preset.pct)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    Math.abs(scrollProgress - preset.pct) < 0.12
                      ? 'bg-red-600 text-white font-bold shadow-md'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Interactive Progress Slider */}
            <div className="w-24 sm:w-36 flex items-center gap-2">
              <input
                type="range"
                min="0"
                max={TOTAL_FRAMES - 1}
                value={currentFrameDisplay}
                onChange={(e) => {
                  setAutoPlay(false);
                  const val = parseInt(e.target.value, 10);
                  targetFrameRef.current = val;
                }}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Deep Dive Technical Specifications Section */}
      {/* ========================================================================= */}
      <section id="specifications" className="relative z-30 py-24 px-6 md:px-12 bg-[#390609] border-t border-red-500/20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-300 uppercase tracking-widest mb-3">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Engineering Specifications
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Built to Exceed International Fire Standards
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light">
              Full technical breakdown of conductors, insulation barriers, armoring parameters, and compliance standards.
            </p>
          </div>

          {/* Specs Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { id: 'overview', label: 'General Overview' },
              { id: 'conductor', label: 'Conductor & Core' },
              { id: 'fire', label: 'Fire & Insulation' },
              { id: 'armor', label: 'Armoring & Sheath' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/50 scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Specs Table Container */}
          <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
            {activeTab === 'overview' && (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Operating Parameters
                  </h3>
                  {[
                    { key: 'Voltage Rating', val: '600/1000V up to 33kV High Voltage' },
                    { key: 'Temperature Rating', val: '-40°C to +90°C (Normal), 250°C (Short Circuit)' },
                    { key: 'Flame Resistance Standard', val: 'IEC 60331-21 (950°C for 180 Mins)' },
                    { key: 'Smoke Emission', val: 'IEC 61034-2 (Light Transmittance > 80%)' },
                    { key: 'Acid Gas Generation', val: 'IEC 60754-1 (Zero Halogen < 0.5% HCl)' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-white/5 text-sm">
                      <span className="text-gray-400">{item.key}</span>
                      <span className="font-semibold text-white text-right">{item.val}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Quality Certifications
                  </h3>
                  {[
                    { key: 'ISO Standard', val: 'ISO 9001:2015 Quality Management System' },
                    { key: 'European Compliance', val: 'CE Marked (EN 50200 & EN 50363)' },
                    { key: 'Environmental Safety', val: 'RoHS 3 (2015/863/EU) Compliant' },
                    { key: 'National Certification', val: 'BIS / IS 7098 Part 1 & IS 1554' },
                    { key: 'Warranty Period', val: '10 Years Performance Guarantee' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-white/5 text-sm">
                      <span className="text-gray-400">{item.key}</span>
                      <span className="font-semibold text-white text-right">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'conductor' && (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-amber-400 mb-4">Conductor Metallurgy</h3>
                  {[
                    { key: 'Material Grade', val: 'Electrolytic Tough Pitch (ETP) Copper' },
                    { key: 'Copper Purity', val: '99.99% Continuous Cast Pure Copper' },
                    { key: 'Stranding Class', val: 'Class 2 Stranded / Class 5 Flexible' },
                    { key: 'DC Resistance', val: '0.01724 Ω·mm²/m @ 20°C' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-white/5 text-sm">
                      <span className="text-gray-400">{item.key}</span>
                      <span className="font-semibold text-white">{item.val}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-white mb-2">High Efficiency Conductor</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    High purity copper minimizes thermal degradation under continuous peak power loads while facilitating effortless flexibility during tight conduit installations.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                    <CheckCircle2 className="w-4 h-4" /> Zero Oxygen Inclusions
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fire' && (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Fire Barrier System</h3>
                  {[
                    { key: 'Primary Fire Barrier', val: 'Phlogopite Mica Glass Tape Wrap' },
                    { key: 'Insulation Layer', val: 'Cross-Linked Polyethylene (XLPE)' },
                    { key: 'Flame Temperature Resistance', val: 'Up to 950°C' },
                    { key: 'Direct Flame Survival Time', val: '180 Minutes Continuous' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-white/5 text-sm">
                      <span className="text-gray-400">{item.key}</span>
                      <span className="font-semibold text-white">{item.val}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/20 flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-white mb-2">Life-Safety Emergency Power</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    Ensures vital power continuity for fire smoke evacuation fans, emergency exit illumination, and fire suppression pumps during critical structural fires.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-red-400 font-mono">
                    <Flame className="w-4 h-4" /> BS 6387 Category CWZ Rated
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'armor' && (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Armor &amp; Sheathing</h3>
                  {[
                    { key: 'Armor Type', val: 'Galvanized Steel Wire Armor (SWA)' },
                    { key: 'Inner Bedding', val: 'Extruded Flame-Retardant PVC' },
                    { key: 'Outer Sheath', val: 'LSZH Low-Smoke Zero-Halogen Compound' },
                    { key: 'Impact & Crush Resistance', val: 'Heavy Duty Structural Underground' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-white/5 text-sm">
                      <span className="text-gray-400">{item.key}</span>
                      <span className="font-semibold text-white">{item.val}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-white mb-2">Direct Burial Protection</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    Impervious to sharp rock pressure, heavy earth movement, chemical soil acidity, moisture ingress, and rodent infestation.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                    <ShieldCheck className="w-4 h-4" /> Heavy Industry Approved
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. Industrial Applications Grid */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 bg-[#2d0507] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-3">
              Mission-Critical Deployments
            </h2>
            <p className="text-xs text-gray-300">
              Trusted by infrastructure giants, electrical contractors, and government utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Metro Rail & Tunnels',
                desc: 'Zero-smoke halogen free cables for underground transit systems.',
                icon: Cpu
              },
              {
                title: 'High-Rise Towers',
                desc: 'Life-safety emergency elevator and sprinkler power lines.',
                icon: Zap
              },
              {
                title: 'Chemical Refineries',
                desc: 'Oil & chemical resistant heavy steel armored cables.',
                icon: ShieldCheck
              },
              {
                title: 'Power Substations',
                desc: 'High-voltage grid transmission with minimal dielectric loss.',
                icon: Flame
              }
            ].map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-red-500/40 hover:bg-black/60 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. Quote / Inquiry Modal */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#390609] border border-red-500/30 p-8 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                <p className="text-xs text-gray-300 max-w-xs mx-auto">
                  Thank you. Our senior technical engineer will contact you with factory pricing and lead time within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="text-left mb-6">
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
                    Direct Factory Pricing
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">Request Product Quote</h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Get custom cable estimates, reel dimensions, and test certificates.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Cable Specification</label>
                  <select
                    value={formData.cableType}
                    onChange={(e) => setFormData({ ...formData, cableType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 transition-colors"
                  >
                    <option value="Fire Survival Cable (11kV)">Fire Survival Cable (11kV / 33kV)</option>
                    <option value="Low Tension Copper Cable">Low Tension Copper Cable</option>
                    <option value="Armored Control Cable">Armored Control Cable</option>
                    <option value="Instrumentation Cable">Instrumentation Cable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Project Details / Length Required</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide required reel meter length, delivery location, or special specs..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-red-950/60 hover:scale-[1.02] transition-transform"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. Footer */}
      {/* ========================================================================= */}
      <footer className="py-12 px-6 md:px-12 bg-[#200305] border-t border-white/10 text-xs text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 font-bold">
              A
            </div>
            <span className="font-bold text-white tracking-widest">
              AMPPERE CABLE MANUFACTURING PVT. LTD.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="tel:+919370946510" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 9370946510
            </a>
            <a href="mailto:infoampperecable@gmail.com" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" /> infoampperecable@gmail.com
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} Amppere Cable. ISO 9001:2015, CE &amp; RoHS Certified.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductScrollLanding;
