import React from 'react';
import { motion } from 'framer-motion';
import { maskedReveal } from './Animations';

const MaskedHeading = ({ children, className }) => (
  <div className="overflow-hidden relative inline-block">
    <motion.h2 
      variants={maskedReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.h2>
  </div>
);

export default MaskedHeading;
