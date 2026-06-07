import React from 'react';
import { motion } from 'framer-motion';
import '../styles/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <motion.div
          className="footer-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Column 1: Couple Info */}
          <div className="footer-column">
            <h3>The Couple</h3>
            <p>
              Yasir Shan & Sana Nasrin are delighted to share their joy with you on this special occasion.
            </p>
            <p>
              Together, they embark on a beautiful journey of love, faith, and commitment.
            </p>
          </div>
        </motion.div>

        <div className="footer-divider" />

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="footer-logo">
            Y <span className="amp">&</span> S
          </div>

          <p className="footer-copyright">
            © {currentYear} LuxeWeds.sahad . All rights reserved.
          </p>

          <div className="footer-socials">
            <a href="https://www.instagram.com/_sah_ad___/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              📷
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
