import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Users, Home } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Lucide-style SVG icons in gold ── */
const RingIcon = () => (
  <svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="12" stroke="#C49A4A" strokeWidth="2.2" />
    <circle cx="24" cy="24" r="7" stroke="#C49A4A" strokeWidth="1.4" strokeDasharray="3 2" />
    <path d="M18 14 C20 10 28 10 30 14" stroke="#C49A4A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="10" r="2.2" fill="#C49A4A" opacity="0.7" />
  </svg>
);

const CelebrationIcon = () => (
  <svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 38 L20 14 L28 14 L40 38 Z" stroke="#C49A4A" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 28 H34" stroke="#C49A4A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M24 8 V12" stroke="#C49A4A" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 10 L18 13" stroke="#C49A4A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 10 L30 13" stroke="#C49A4A" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="7" r="1.8" fill="#C49A4A" />
  </svg>
);

const FamilyIcon = () => (
  <svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="14" r="4" stroke="#C49A4A" strokeWidth="2" />
    <circle cx="32" cy="14" r="4" stroke="#C49A4A" strokeWidth="2" />
    <circle cx="24" cy="18" r="3" stroke="#C49A4A" strokeWidth="1.5" />
    <path d="M6 36 C6 28 10 24 16 24 C19 24 21 25 24 27 C27 25 29 24 32 24 C38 24 42 28 42 36"
      stroke="#C49A4A" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 36 C18 32 20 30 24 30 C28 30 30 32 30 36"
      stroke="#C49A4A" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── Detail row inside a card ── */
const DetailRow = ({ icon, children }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: 12,
    padding: '10px 14px',
    background: 'rgba(245,240,232,0.7)',
    borderRadius: 12,
    border: '1px solid rgba(212,196,168,0.4)',
  }}>
    <span style={{ color: 'var(--color-gold)', marginTop: 1, flexShrink: 0 }}>{icon}</span>
    <span style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '0.78rem',
      color: 'var(--color-bronze)',
      lineHeight: 1.6,
      textAlign: 'left',
    }}>{children}</span>
  </div>
);

export default function WeddingDetailsSection() {
  const cards = [
    {
      icon: <RingIcon />,
      title: 'Wedding Ceremony',
      rows: [
        { icon: <Calendar size={14} />, text: 'Tuesday, 28 July 2026' },
        { icon: <Clock size={14} />, text: 'Safar 14 1448' },
        { icon: <MapPin size={14} />, text: 'Green Land Auditorium, Athanipadi' },
      ],
      mapUrl: 'https://maps.app.goo.gl/ZCQB9CUjGQFE52Pi7?g_st=iw',
    },
    {
      icon: <CelebrationIcon />,
      title: 'Wedding & Lunch',
      rows: [
        { icon: <Calendar size={14} />, text: 'Tuesday, 28 July 2026' },
        { icon: <Clock size={14} />, text: 'Wedding and lunch thereafter' },
        { icon: <MapPin size={14} />, text: 'Green Land Auditorium, Athanipadi' },
      ],
      mapUrl: 'https://maps.app.goo.gl/ZCQB9CUjGQFE52Pi7?g_st=iw',
    },
    {
      icon: <FamilyIcon />,
      title: 'Family Details',
      rows: [
        { icon: <Home size={14} />, text: "Groom's Family: Mr. Yahkoob & Mrs. Zainaba Yahkoob\nPoonthala House, Purathur, Kavilakkad\nMob: 9746226371" },
        { icon: <Home size={14} />, text: "Bride's Family: Mr. Abdul Samad & Mrs. Safeera Abdul Samad\nPuthuparambil House, Thavanur\nMob: 9946800867 / 8138880867" },
      ],
      mapUrl: null,
    },
  ];

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
        @keyframes driftA { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(20px,-15px) scale(1.06);} }
        @keyframes driftB { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-15px,20px) scale(1.07);} }

        #details { position:relative; background:var(--color-ivory); padding:96px 24px; text-align:center; overflow:hidden; }

        .details-orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(72px); }
        .dorb-1 { width:300px;height:300px;background:rgba(232,224,240,0.5);top:-60px;right:-60px;animation:driftA 16s ease-in-out infinite; }
        .dorb-2 { width:280px;height:280px;background:rgba(196,154,74,0.09);bottom:-50px;left:-50px;animation:driftB 20s ease-in-out infinite; }

        .details-heading { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,5vw,3rem); font-weight:600; color:var(--color-espresso); margin:0 0 8px; }
        .details-sub     { font-family:'Great Vibes',cursive; font-size:clamp(1.3rem,3vw,1.7rem); color:var(--color-taupe); margin:0 0 48px; }
        .details-label   { font-family:'Cinzel',serif; font-size:10px; letter-spacing:.28em; color:var(--color-taupe); text-transform:uppercase; display:block; margin-bottom:12px; }

        .cards-grid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:24px;
          max-width:1000px;
          margin:0 auto;
        }
        @media(max-width:900px){ .cards-grid{ grid-template-columns:1fr; max-width:480px; } }

        .detail-card {
          background: var(--color-ivory);
          border: 1px solid var(--color-beige);
          border-top: 3px solid var(--color-gold);
          border-radius: 20px;
          padding: 36px 28px 28px;
          box-shadow: 0 4px 24px rgba(160,128,96,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        .detail-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-kraft);
          box-shadow: 0 14px 40px rgba(181,129,58,0.13);
        }

        /* icon circle */
        .icon-circle {
          width: 68px; height: 68px;
          border-radius: 50%;
          background: rgba(196,154,74,0.08);
          border: 1px solid rgba(196,154,74,0.25);
          display: flex; align-items:center; justify-content:center;
          margin-bottom: 18px;
          transition: background 0.3s;
        }
        .detail-card:hover .icon-circle { background: rgba(196,154,74,0.15); }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-espresso);
          margin: 0 0 20px;
          letter-spacing: 0.02em;
        }

        .rows-stack { display:flex; flex-direction:column; gap:10px; width:100%; }

        .locate-link {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-kraft);
          text-decoration: none;
          margin-top: 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.25s;
        }
        .locate-link:hover { color: var(--color-bronze); }

        .gold-divider { height:1px; background:var(--color-beige); width:48px; margin:0 auto 40px; }

        /* Ornament row */
        .orn-row { display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:28px; }
        .orn-row .orn-line { height:1px;width:50px;background:var(--color-gold);opacity:.4; }
        .orn-dia { width:7px;height:7px;background:var(--color-gold);transform:rotate(45deg);opacity:.65; }
        .orn-dia-sm { width:4px;height:4px;background:var(--color-gold);transform:rotate(45deg);opacity:.4; }
      `}</style>

      <section id="details">
        <div className="details-orb dorb-1" />
        <div className="details-orb dorb-2" />

        <div style={{ position: 'relative', zIndex: 10 }}>

          {/* Ornament */}
          <div className="orn-row">
            <span className="orn-line" />
            <div className="orn-dia-sm" /><div className="orn-dia" /><div className="orn-dia-sm" />
            <span className="orn-line" />
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="details-label">The Celebration</span>
            <h2 className="details-heading">Wedding Details</h2>
            <p className="details-sub">Join us as we begin our forever</p>
            <div className="gold-divider" />
          </motion.div>

          {/* Cards */}
          <div className="cards-grid">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                className="detail-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="icon-circle">{card.icon}</div>
                <h3 className="card-title">{card.title}</h3>

                <div className="rows-stack">
                  {card.rows.map((row, i) => (
                    <DetailRow key={i} icon={row.icon}>
                      {row.text.split('\n').map((line, j) => (
                        <span key={j} style={{ display: 'block' }}>{line}</span>
                      ))}
                    </DetailRow>
                  ))}
                </div>

                {card.mapUrl && (
                  <a
                    href={card.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="locate-link"
                  >
                    Locate Venue <span>→</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}