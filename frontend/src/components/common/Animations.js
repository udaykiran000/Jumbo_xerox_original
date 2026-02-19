// Standard Animation Variants for Jumbo Xerox

// 1. Fade In Up (General Content Entry)
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// 2. Directional Reveals (for alternating content)
export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "backOut" }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "backOut" }
  }
};

export const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "backOut" }
  }
};

// 3. Stagger Container (For Grids and Lists)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// 4. Scale In (Elastic Pop - for Cards/Buttons)
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

// 5. Masked Text Reveal (For Section Headings)
export const maskedReveal = {
  hidden: { y: "100%" },
  visible: { 
    y: "0%",
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } 
  }
};

// 6. Page Transition (Standard Page Load)
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};
