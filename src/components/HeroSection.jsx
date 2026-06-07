import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import '../styles/hero.css';

const frameCount = 200;

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentFrame = (index) => {
    const safeIndex = Math.max(1, Math.min(frameCount, Math.round(index)));
    return `/animationimgs/ezgif-frame-${safeIndex.toString().padStart(3, '0')}.png`;
  };

  // Preload images
  useEffect(() => {
    let active = true;
    let count = 0;
    const loadedImages = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        if (!active) return;
        count++;
        setLoadedCount(count);
        if (i === 1) {
          renderFrame(1, [img]);
        }
        if (count === frameCount) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (!active) return;
        count++;
        setLoadedCount(count);
        if (count === frameCount) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    return () => {
      active = false;
    };
  }, []);

  // Scroll tracking for frame sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to frame index (1 to 200)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  const renderFrame = (index, imageArray = imagesRef.current) => {
    if (imageArray.length === 0 || !canvasRef.current) return;

    const safeIndex = Math.max(1, Math.min(frameCount, Math.round(index)));
    const img = imageArray[safeIndex - 1];

    if (img && img.complete) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      const targetW = Math.floor(displayWidth * dpr);
      const targetH = Math.floor(displayHeight * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      // Fill canvas background with cream color so empty sides blend naturally
      ctx.fillStyle = '#FAF6EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ── object-fit: contain scaled to HEIGHT ──────────────────────────────
      // Always scale so the full image height = viewport height.
      // This guarantees the bride & groom are visible head-to-toe on every
      // screen size. Empty space may appear on left/right (cream background).
      const ratio = canvas.height / img.height;

      const drawW = img.width * ratio;
      const drawH = img.height * ratio;          // always equals canvas.height
      const offsetX = (canvas.width - drawW) / 2; // center horizontally
      const offsetY = 0;                           // top-align (fills full height)

      ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawW, drawH);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      renderFrame(frameIndex.get());
    };
    window.addEventListener('resize', handleResize);

    // Trigger render after short delay to ensure canvas rect is ready
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [isLoaded]);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (!isLoaded) return;
    requestAnimationFrame(() => renderFrame(latest));
  });

  const handleScrollDown = () => {
    const nextSection = document.getElementById('countdown');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const progressPercent = Math.floor((loadedCount / frameCount) * 100);

  return (
    <div ref={containerRef} className="hero-scroll-container">
      {/* Premium loader overlay */}
      {!isLoaded && (
        <div className="hero-loader-overlay">
          <div className="hero-loader-spinner" />
          <span className="hero-loader-text">Preparing Experience</span>
          <span className="hero-loader-progress">{progressPercent}%</span>
        </div>
      )}

      <div className="hero-sticky-wrap">
        {/* Canvas Background */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Soft Background Orbs for atmospheric lighting */}
        <div className="hero-orb orb-lav-tl" style={{ opacity: 0.45 }} />
        <div className="hero-orb orb-lav-br" style={{ opacity: 0.35 }} />
        <div className="hero-orb orb-gold-tr" style={{ opacity: 0.1 }} />
        <div className="hero-orb orb-gold-bl" style={{ opacity: 0.07 }} />

        {/* Contrast Overlay Gradient */}
        <div className="hero-overlay-gradient" />

        {/* Hero Text Content (Z-indexed above overlay) */}
        <div className="hero-inner" style={{ pointerEvents: 'auto' }}>
          {/* Blessing Line */}
          <motion.div
            className="blessing-wrap"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="gold-rule w-16 mb-2" />
            <p className="bismillah">
              In the name of Allah, the most beneficent and the most merciful
            </p>
            <div className="gold-rule w-16 mt-2" />
          </motion.div>

          {/* Couple Names */}
          <motion.h1
            className="couple-names"
            initial={{ opacity: 0, y: 24 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            Yasir Shan <span className="amp">&amp;</span> Sana Nasrin
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="tagline"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            Two families. One blessing. Forever united.
          </motion.p>

          {/* Date */}
          <motion.p
            className="wedding-date"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 1.1 }}
          >
            Tuesday, 28 July 2026 &nbsp;·&nbsp; Safar 14 1448
          </motion.p>

          {/* Hosted By */}
          <motion.p
            className="hosted-by"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 1.3 }}
          >
            Hosted by Poonthala Family
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="btn-row"
            initial={{ opacity: 0, y: 12 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
          >
            <button
              onClick={() => {
                const rsvpSec = document.getElementById('invitation');
                if (rsvpSec) rsvpSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              Save the Date
            </button>
            <button
              onClick={() => {
                const detailsSec = document.getElementById('details');
                if (detailsSec) detailsSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline"
            >
              View Details
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          {isLoaded && (
            <button
              onClick={handleScrollDown}
              className="scroll-indicator bg-transparent border-none cursor-pointer focus:outline-none"
              aria-label="Scroll down to details"
              style={{ pointerEvents: 'auto' }}
            >
              <span className="scroll-label">Scroll to Begin</span>
              <div className="scroll-arrow" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
