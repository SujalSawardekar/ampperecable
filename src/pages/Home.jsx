import React from 'react';
import useSEO from '../hooks/useSEO';
import HeroScroll3D, { FRAME_SCROLL_VH } from '../components/HeroScroll3D';
import Goals from '../components/Goals';
import ProductShowcase from '../components/ProductShowcase';
import WeCommit from '../components/WeCommit';
import AboutShowcase from '../components/AboutShowcase';
import Testimonials from '../components/Testimonials';
import ClientsSection from '../components/ClientsSection';
import SocialShowcase from '../components/SocialShowcase';

/**
 * Layout maths:
 *
 *  sticky pin range  =  spacerHeight - viewportHeight
 *
 *  We want the sticky hero to pin for exactly:
 *    FRAME_SCROLL_VH * vh   →  animation phase (no overlap)
 *    OVERLAP_VH * vh        →  overlap phase (content card slides up)
 *
 *  So:  spacerHeight - 1vh  =  (FRAME_SCROLL_VH + OVERLAP_VH) * vh
 *       spacerHeight        =  (FRAME_SCROLL_VH + OVERLAP_VH + 1) * vh
 *
 *  The content card sits directly below the spacer (no negative margin).
 *  During OVERLAP_VH, the card enters the viewport from the bottom while
 *  the hero is still pinned showing the final frame.
 *  When OVERLAP_VH is exhausted, sticky unpins — but by then the card
 *  already covers the full viewport, so the unpin is invisible.
 */

const OVERLAP_VH   = 1.0;   // vh of scroll during which card slides over hero
const SPACER_VH    = FRAME_SCROLL_VH + OVERLAP_VH + 1.0;  // total spacer height
// The card must be pulled up so its TOP enters the viewport exactly when
// the frame animation ends (not sooner).
// Content top = spacerHeight (natural DOM position)
// Content enters viewport when scrollY = spacerHeight - 1 (viewport height)
//             = (FRAME_SCROLL_VH + OVERLAP_VH) * vh
// That is FRAME_SCROLL_VH * vh after scroll starts → animation done ✓
// Pull-up margin = OVERLAP_VH * vh so the card starts overlapping the hero
// at the exact moment animation ends:
//   marginTop = -(OVERLAP_VH * 100)vh
const PULL_UP_VH   = OVERLAP_VH;

const Home = () => {
  useSEO(
    'Amppere Cable | Certified Fire Alarm & Survival Cable Manufacturers',
    'Amppere Cable is a leading manufacturer of certified Low Tension Copper Conductor Wires, Fire Alarm & Survival Cables, and Instrumentation Cables in Maharashtra, India. ISO 9001, CE, and RoHS certified.'
  );

  return (
    <main style={{ background: '#390609' }}>

      {/* ── SCROLL SPACER ─────────────────────────────────────────────────
          Height = (FRAME_SCROLL_VH + OVERLAP_VH + 1) * 100vh
          The sticky hero (100vh) inside it pins for FRAME_SCROLL + OVERLAP vh.
          Phase 1 (0 → FRAME_SCROLL_VH * vh): animation plays, no overlap.
          Phase 2 (FRAME_SCROLL_VH → (FRAME_SCROLL_VH + OVERLAP_VH) * vh):
            hero shows final frame, content card enters from below.
      */}
      <div style={{ height: `${SPACER_VH * 100}vh`, position: 'relative' }}>
        <HeroScroll3D />
      </div>

      {/* ── CONTENT CARD ──────────────────────────────────────────────────
          Negative margin pulls it up by PULL_UP_VH * 100vh.
          This makes its top edge enter the viewport exactly at
          scrollY = FRAME_SCROLL_VH * vh (animation complete).
          z-index 30 > hero z-index 20 → card renders on top.
          Rounded corners + shadow give a premium "lift" feel.
      */}
      <div
        style={{
          position: 'relative',
          zIndex: 30,
          marginTop: `-${PULL_UP_VH * 100}vh`,
        }}
        className="bg-white rounded-t-[2.5rem] md:rounded-t-[3.5rem] shadow-[0_-24px_64px_rgba(0,0,0,0.85)]"
      >
        <Goals />
        <ProductShowcase />
        <WeCommit />
        <ClientsSection />
        <AboutShowcase />
        <Testimonials />
        <SocialShowcase />
      </div>

    </main>
  );
};

export default Home;
