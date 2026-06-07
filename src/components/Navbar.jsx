import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Countdown', href: '#countdown' },
    { name: 'Details', href: '#details' },
    { name: 'Couple', href: '#couple-section' },
    { name: 'Invitation', href: '#invitation' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e, href) => {
    e && e.preventDefault && e.preventDefault();
    setIsOpen(false);
    if (!href || !href.startsWith('#')) return;
    const id = href.replace(/^#/, '');
    const el = document.getElementById(id);
    if (!el) return;
    const navEl = document.querySelector('.navbar');
    const offset = (navEl && navEl.offsetHeight) ? navEl.offsetHeight : 72;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Great+Vibes&family=Cinzel:wght@400;500&family=DM+Sans:wght@400;500&display=swap');

        :root {
          --color-kraft:    #B5813A;
          --color-ivory:    #F5F0E8;
          --color-bronze:   #8B5E2A;
          --color-gold:     #C49A4A;
          --color-espresso: #3D2610;
          --color-taupe:    #A08060;
          --color-beige:    #D4C4A8;
          --color-cream:    #FAF6EE;
        }

        /* ── Nav base ── */
        .navbar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 50;
          transition: background 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease;
        }
        .navbar.transparent {
          background: transparent;
          padding: 20px 0;
        }
        .navbar.frosted {
          background: rgba(250, 246, 238, 0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--color-beige);
          padding: 12px 0;
          box-shadow: 0 2px 20px rgba(160,128,96,0.08);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo / monogram ── */
        .nav-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          gap: 2px;
        }
        .nav-monogram {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--color-espresso);
          line-height: 1;
          letter-spacing: 0.04em;
        }
        .nav-monogram .amp {
          font-family: 'Great Vibes', cursive;
          font-size: 1.7rem;
          font-weight: 400;
          color: var(--color-gold);
          margin: 0 4px;
        }
        .nav-sub {
          font-family: 'Cinzel', serif;
          font-size: 7px;
          letter-spacing: 0.28em;
          color: var(--color-taupe);
          text-transform: uppercase;
        }

        /* ── Desktop links ── */
        .nav-links {
          display: none;
          align-items: center;
          gap: 36px;
        }
        @media (min-width: 768px) { .nav-links { display: flex; } }

        .nav-link {
          font-family: 'Cinzel', serif;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-espresso);
          text-decoration: none;
          position: relative;
          padding: 4px 0;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--color-gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--color-kraft); }
        .nav-link:hover::after { width: 100%; }

        /* ── CTA button ── */
        .nav-cta {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-cream);
          background: var(--color-kraft);
          padding: 10px 22px;
          border-radius: 9999px;
          border: none;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .nav-cta:hover { background: var(--color-bronze); transform: translateY(-1px); }

        /* ── Hamburger ── */
        .hamburger {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-espresso);
          transition: color 0.2s;
        }
        .hamburger:hover { color: var(--color-kraft); }
        @media (min-width: 768px) { .hamburger { display: none; } }

        /* ── Mobile overlay ── */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: var(--color-cream);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 80px 32px 48px;
        }

        .mobile-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: var(--color-espresso);
          text-decoration: none;
          letter-spacing: 0.04em;
          padding: 12px 0;
          transition: color 0.25s ease;
          position: relative;
        }
        .mobile-link::after {
          content: '';
          position: absolute;
          bottom: 8px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 1px;
          background: var(--color-gold);
          transition: width 0.3s ease;
        }
        .mobile-link:hover { color: var(--color-kraft); }
        .mobile-link:hover::after { width: 60%; }

        .mobile-divider {
          width: 40px; height: 1px;
          background: var(--color-beige);
          margin: 8px 0;
        }

        .mobile-cta {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-cream);
          background: var(--color-kraft);
          padding: 14px 40px;
          border-radius: 9999px;
          text-decoration: none;
          margin-top: 32px;
          transition: background 0.3s ease;
        }
        .mobile-cta:hover { background: var(--color-bronze); }

        /* mobile ornament diamonds */
        .mobile-ornament {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
        }
        .dia { width:6px;height:6px;background:var(--color-gold);transform:rotate(45deg);opacity:0.5; }
        .dia-sm { width:4px;height:4px;background:var(--color-gold);transform:rotate(45deg);opacity:0.3; }
      `}</style>

      {/* ── Navbar ── */}
      <motion.nav
        className={`navbar ${isScrolled ? 'frosted' : 'transparent'}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <div className="nav-inner">

          {/* Monogram logo */}
          <a href="#home" className="nav-logo">
            <span className="nav-monogram">
              Y <span className="amp">&amp;</span> S
            </span>
            <span className="nav-sub">Wedding Invitation</span>
          </a>

          {/* Desktop links */}
          <div className="nav-links">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="nav-link" onClick={(e) => handleNavClick(e, link.href)}>
                {link.name}
              </a>
            ))}
            <a href="#invitation" className="nav-cta" onClick={(e) => handleNavClick(e, '#invitation')}>
              Invitation
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setIsOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Monogram at top */}
            <span style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '3rem',
              color: 'var(--color-gold)',
              marginBottom: 8,
              lineHeight: 1,
            }}>Y &amp; S</span>

            <div className="mobile-divider" style={{ marginBottom: 24 }} />

            {/* Nav links */}
            {navLinks.map((link, i) => (
              <React.Fragment key={link.name}>
                <motion.a
                  href={link.href}
                  className="mobile-link"
                  onClick={(e) => { closeMenu(); handleNavClick(e, link.href); }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.name}
                </motion.a>
                {i < navLinks.length - 1 && <div className="mobile-divider" />}
              </React.Fragment>
            ))}

            {/* CTA */}
            <a href="#invitation" className="mobile-cta" onClick={(e) => { closeMenu(); handleNavClick(e, '#invitation'); }}>
              View Invitation
            </a>

            {/* Diamond ornament */}
            <div className="mobile-ornament">
              <div className="dia-sm" />
              <div className="dia" />
              <div className="dia-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}