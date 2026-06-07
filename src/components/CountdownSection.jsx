import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CountdownSection() {
  // Target: Tuesday, 28 July 2026
  const targetDate = new Date('2026-07-28T00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  const [prevValues, setPrevValues] = useState({ days: -1, hours: -1, minutes: -1, seconds: -1 });
  const [pulseKey, setPulseKey] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(prev => {
        setPulseKey(pk => ({
          days: prev.days !== days ? pk.days + 1 : pk.days,
          hours: prev.hours !== hours ? pk.hours + 1 : pk.hours,
          minutes: prev.minutes !== minutes ? pk.minutes + 1 : pk.minutes,
          seconds: prev.seconds !== seconds ? pk.seconds + 1 : pk.seconds,
        }));
        return { days, hours, minutes, seconds, isCompleted: false };
      });
    };
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days, key: pulseKey.days },
    { label: 'Hours', value: timeLeft.hours, key: pulseKey.hours },
    { label: 'Minutes', value: timeLeft.minutes, key: pulseKey.minutes },
    { label: 'Seconds', value: timeLeft.seconds, key: pulseKey.seconds },
  ];

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Great+Vibes&family=Cinzel:wght@400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --color-kraft:    #B5813A;
          --color-ivory:    #F5F0E8;
          --color-bronze:   #8B5E2A;
          --color-gold:     #C49A4A;
          --color-espresso: #3D2610;
          --color-taupe:    #A08060;
          --color-beige:    #D4C4A8;
          --color-cream:    #FAF6EE;
          --color-lavender: #E8E0F0;
          --color-lavender-mid: #C9B8E8;
        }

        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(20px, -15px) scale(1.05); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-15px, 20px) scale(1.08); }
        }
        @keyframes tickPulse {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @keyframes drawLine {
          from { width: 0; }
          to   { width: 100%; }
        }

        .countdown-section {
          position: relative;
          background: var(--color-cream);
          padding: 96px 24px;
          text-align: center;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Lavender + gold background orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(70px);
        }
        .orb-1 {
          width: 360px; height: 360px;
          background: rgba(232,224,240,0.55);
          top: -80px; left: -80px;
          animation: drift1 14s ease-in-out infinite;
        }
        .orb-2 {
          width: 280px; height: 280px;
          background: rgba(196,154,74,0.12);
          bottom: -60px; right: -60px;
          animation: drift2 18s ease-in-out infinite;
        }
        .orb-3 {
          width: 200px; height: 200px;
          background: rgba(232,224,240,0.35);
          top: 50%; left: 60%;
          animation: drift1 20s ease-in-out infinite reverse;
        }

        .inner {
          position: relative;
          z-index: 10;
          max-width: 860px;
          margin: 0 auto;
        }

        /* Gold thin line ornament */
        .ornament-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .ornament-line span.line {
          display: block;
          height: 1px;
          width: 60px;
          background: var(--color-gold);
          opacity: 0.5;
        }
        .ornament-diamond {
          width: 7px; height: 7px;
          background: var(--color-gold);
          transform: rotate(45deg);
          opacity: 0.7;
        }

        /* Headings */
        .section-label {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          color: var(--color-taupe);
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }
        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 600;
          color: var(--color-espresso);
          margin: 0 0 8px;
          letter-spacing: 0.02em;
        }
        .section-date {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.75rem, 2vw, 0.9rem);
          color: var(--color-gold);
          letter-spacing: 0.18em;
          margin-bottom: 48px;
          display: block;
        }

        /* Glassmorphism card */
        .glass-card {
          background: rgba(245, 240, 232, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--color-beige);
          border-radius: 24px;
          padding: 48px 32px;
          box-shadow:
            0 8px 40px rgba(160,128,96,0.12),
            0 2px 12px rgba(160,128,96,0.06),
            inset 0 1px 0 rgba(255,255,255,0.6);
          position: relative;
          overflow: hidden;
        }
        .glass-card::before {
          content: '';
          position: absolute;
          inset: 10px;
          border: 1px solid rgba(196,154,74,0.12);
          border-radius: 16px;
          pointer-events: none;
        }

        /* Units grid */
        .units-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 600px) {
          .units-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }

        /* Unit box */
        .unit-box {
          position: relative;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(196,154,74,0.18);
          border-radius: 16px;
          padding: 24px 12px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Gold divider between units — desktop only */
        .unit-box:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -7px;
          top: 25%; bottom: 25%;
          width: 1px;
          background: var(--color-gold);
          opacity: 0.35;
        }
        @media (max-width: 600px) {
          .unit-box:not(:last-child)::after { display: none; }
        }

        .unit-number {
          font-family: 'Playfair Display', 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 6vw, 3.5rem);
          font-weight: 700;
          color: var(--color-espresso);
          line-height: 1;
          margin-bottom: 8px;
          display: block;
          transition: transform 0.15s ease;
        }
        .unit-number.tick {
          animation: tickPulse 0.35s ease-out;
        }
        .unit-label {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          color: var(--color-taupe);
          text-transform: uppercase;
        }

        /* Completed state */
        .completed-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--color-kraft);
          grid-column: 1 / -1;
          padding: 24px 0;
        }

        /* Bottom note */
        .bottom-note {
          margin-top: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .bottom-note-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(0.88rem, 2.2vw, 1.05rem);
          color: var(--color-bronze);
          letter-spacing: 0.04em;
        }
        .dot-gold {
          width: 5px; height: 5px;
          background: var(--color-gold);
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.7;
        }
      `}</style>

      <section id="countdown" className="countdown-section">
        {/* Background orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="inner">
          {/* Ornament */}
          <div className="ornament-line">
            <span className="line" />
            <div className="ornament-diamond" />
            <div className="ornament-diamond" style={{ opacity: 0.4, transform: 'rotate(45deg) scale(0.6)' }} />
            <div className="ornament-diamond" />
            <span className="line" />
          </div>

          {/* Heading block */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <span className="section-label">The Countdown</span>
            <h2 className="section-heading">Our Forever Begins In</h2>
            <span className="section-date">Tuesday, 28 July 2026 &nbsp;·&nbsp; Safar 14 1448</span>
          </motion.div>

          {/* Glassmorphism countdown card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="glass-card"
          >
            <div className="units-grid">
              {timeLeft.isCompleted ? (
                <p className="completed-text">The Celebration Has Begun!</p>
              ) : (
                units.map((unit) => (
                  <div className="unit-box" key={unit.label}>
                    <span
                      className="unit-number"
                      key={unit.key}
                      style={{ animation: unit.key > 0 ? 'tickPulse 0.35s ease-out' : 'none' }}
                    >
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="unit-label">{unit.label}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Bottom note */}
          <motion.div
            className="bottom-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="dot-gold" />
            <p className="bottom-note-text">
              Green Land Auditorium, Athanipadi — Wedding and lunch thereafter
            </p>
            <div className="dot-gold" />
          </motion.div>
        </div>
      </section>
    </>
  );
}