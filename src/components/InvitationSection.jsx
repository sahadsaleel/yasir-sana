import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/invitation.css';

export default function InvitationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="invitation"
      className="invitation-section"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="invitation-inner">
        <motion.h2 className="invitation-heading" variants={containerVariants}>
          You Are Invited
        </motion.h2>

        <motion.p className="invitation-description" variants={containerVariants}>
          We would be honored by your presence as we celebrate our love and commitment.
          Please join us for a day filled with joy, blessings, and cherished memories.
        </motion.p>

        <motion.div
          className="invitation-buttons"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <button className="btn-invitation btn-invitation-primary">
            RSVP
          </button>
          <button className="btn-invitation btn-invitation-outline">
            View Details
          </button>
        </motion.div>

        <motion.p
          className="invitation-note"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          "A wedding is a celebration of love, and we want to share this joy with our loved ones."
        </motion.p>
      </div>
    </motion.section>
  );
}
