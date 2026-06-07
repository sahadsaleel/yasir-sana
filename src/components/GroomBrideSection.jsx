import React from 'react';
import { motion } from 'framer-motion';

export default function GroomBrideSection() {
  const ease = [0.22, 1, 0.36, 1];

  /* ── Botanical SVG ornament ── */
  const BotanicalOrnament = () => (
    <svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 18 C30 8, 10 10, 4 18 C10 26, 30 28, 40 18Z" stroke="#C49A4A" strokeWidth="0.8" fill="rgba(196,154,74,0.07)" />
      <path d="M40 18 C50 8, 70 10, 76 18 C70 26, 50 28, 40 18Z" stroke="#C49A4A" strokeWidth="0.8" fill="rgba(196,154,74,0.07)" />
      <circle cx="40" cy="18" r="3" fill="#C49A4A" opacity="0.5" />
      <circle cx="40" cy="18" r="1.2" fill="#C49A4A" opacity="0.9" />
      <line x1="4" y1="18" x2="0" y2="18" stroke="#C49A4A" strokeWidth="0.8" opacity="0.5" />
      <line x1="76" y1="18" x2="80" y2="18" stroke="#C49A4A" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );

  /* ── Portrait placeholder frame (renders image when provided) ── */
  const PortraitFrame = ({ initials, image, name }) => (
    <div style={{
      width: '100%',
      aspectRatio: '3/4',
      borderRadius: '24px',
      border: '2px solid var(--color-gold)',
      background: 'linear-gradient(135deg, var(--color-ivory) 0%, var(--color-beige) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 4px 24px rgba(160,128,96,0.10), 0 8px 32px rgba(160,128,96,0.14)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Corner ornament lines */}
      {[['top-3 left-3', 'border-t border-l'], ['top-3 right-3', 'border-t border-r'],
      ['bottom-3 left-3', 'border-b border-l'], ['bottom-3 right-3', 'border-b border-r']].map(([pos, border], i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 20, height: 20,
          borderColor: 'var(--color-gold)',
          borderStyle: 'solid',
          borderWidth: 0,
          ...(pos.includes('top') ? { top: 12 } : { bottom: 12 }),
          ...(pos.includes('left') ? { left: 12 } : { right: 12 }),
          ...(border.includes('border-t') ? { borderTopWidth: 1 } : { borderBottomWidth: 1 }),
          ...(border.includes('border-l') ? { borderLeftWidth: 1 } : { borderRightWidth: 1 }),
          opacity: 0.5,
        }} />
      ))}

      {image ? (
        <img src={image} alt={name || 'portrait'} style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block'
        }} />
      ) : (
        <>
          <span style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '4rem',
            color: 'var(--color-taupe)',
            opacity: 0.35,
            lineHeight: 1,
            userSelect: 'none',
          }}>{initials}</span>
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '8px',
            letterSpacing: '0.25em',
            color: 'var(--color-taupe)',
            opacity: 0.5,
            marginTop: 8,
            textTransform: 'uppercase',
          }}>Photo</span>
        </>
      )}
    </div>
  );

  const PersonCard = ({ person, direction, isGroom }) => (
    <motion.div
      initial={{ opacity: 0, x: direction, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px 32px',
        background: 'var(--color-ivory)',
        border: '1px solid var(--color-beige)',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(160,128,96,0.08)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Gold top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, background: 'var(--color-gold)',
      }} />

      {/* Botanical ornament */}
      <div style={{ marginBottom: 16 }}>
        <BotanicalOrnament />
      </div>

      {/* Role label */}
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '10px',
        letterSpacing: '0.28em',
        color: 'var(--color-taupe)',
        textTransform: 'uppercase',
        marginBottom: 8,
        display: 'block',
      }}>
        {person.role}
      </span>

      {/* Name */}
      <h3 style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: 'clamp(2.4rem, 5vw, 3rem)',
        color: 'var(--color-espresso)',
        margin: '0 0 24px',
        lineHeight: 1.1,
      }}>
        {person.name}
      </h3>

      {/* Portrait frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        style={{ width: '80%', maxWidth: 240, marginBottom: 28 }}
      >
        <PortraitFrame initials={person.initials} image={person.image} name={person.name} />
      </motion.div>

      {/* Description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
        {person.lines.map((line, i) => (
          <p key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: i === 0 ? '0.9rem' : '0.8rem',
            color: i === 0 ? 'var(--color-bronze)' : 'var(--color-taupe)',
            fontWeight: i === 0 ? 500 : 400,
            lineHeight: 1.6,
            margin: 0,
          }}>
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );

  const groom = {
    role: 'The Groom',
    name: 'Yasir Shan',
    initials: 'Y',
    image: '/groom-bride/groom.jpeg',
    lines: [
      'Son of Mr. Yahkoob & Mrs. Zainaba Yahkoob',
      'Poonthala House, Purathur, Kavilakkad',
    ],
  };

  const bride = {
    role: 'The Bride',
    name: 'Sana Nasrin',
    initials: 'S',
    image: '/groom-bride/bride.jpeg',
    lines: [
      'Daughter of Mr. Abdul Samad & Mrs. Safeera Abdul Samad',
      'Puthuparambil House, Thavanur',
    ],
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Great+Vibes&family=Cinzel:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
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
        }
        @keyframes driftA {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(18px,-14px) scale(1.06); }
        }
        @keyframes driftB {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-14px,18px) scale(1.07); }
        }
        #couple-section { position: relative; background: var(--color-cream); padding: 96px 24px; overflow: hidden; }
        .couple-orb {
          position: absolute; border-radius: 50%; pointer-events: none; filter: blur(72px);
        }
        .couple-orb-1 { width: 320px; height: 320px; background: rgba(232,224,240,0.55); top: -60px; left: -60px; animation: driftA 16s ease-in-out infinite; }
        .couple-orb-2 { width: 260px; height: 260px; background: rgba(196,154,74,0.1); bottom: -40px; right: -40px; animation: driftB 20s ease-in-out infinite; }
        .couple-orb-3 { width: 180px; height: 180px; background: rgba(232,224,240,0.35); top: 45%; left: 55%; animation: driftA 22s ease-in-out infinite reverse; }

        .couple-heading-section { text-align: center; margin-bottom: 64px; }
        .couple-main-heading {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(2.6rem, 6vw, 3.8rem);
          color: var(--color-espresso);
          margin: 0 0 8px;
          line-height: 1.1;
        }
        .couple-sub-heading {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: var(--color-taupe);
          margin: 0 0 24px;
        }
        .beige-line { height: 1px; background: var(--color-beige); width: 80px; margin: 0 auto; }

        .couple-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0 32px;
          align-items: center;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .couple-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .center-divider { display: none; }
        }
        .center-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .ampersand {
          font-family: 'Great Vibes', cursive;
          font-size: 4rem;
          color: var(--color-gold);
          line-height: 1;
        }
        .divider-thin {
          width: 1px; height: 60px;
          background: var(--color-beige);
        }
      `}</style>

      <section id="couple-section">
        {/* Background orbs */}
        <div className="couple-orb couple-orb-1" />
        <div className="couple-orb couple-orb-2" />
        <div className="couple-orb couple-orb-3" />

        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Heading */}
          <motion.div
            className="couple-heading-section"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            <h2 className="couple-main-heading">With Joyful Hearts</h2>
            <p className="couple-sub-heading">Two souls. One destiny.</p>
            <div className="beige-line" />
          </motion.div>

          {/* 3-column grid: Groom | & | Bride */}
          <div className="couple-grid">
            <PersonCard person={groom} direction={-50} isGroom={true} />

            {/* Center ampersand divider */}
            <div className="center-divider">
              <div className="divider-thin" />
              <span className="ampersand">&</span>
              <div className="divider-thin" />
            </div>

            <PersonCard person={bride} direction={50} isGroom={false} />
          </div>
        </div>
      </section>
    </>
  );
}