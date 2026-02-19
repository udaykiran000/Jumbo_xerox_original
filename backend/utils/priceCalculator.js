/* 
  BACKEND PRICE CALCULATOR (Node.js)
  Synchronized with PHP pricing rules and Frontend logic.
*/

const DELIVERY_CHARGE = 90;

const PRICING_DATA = {
  quickPrint: {
    grayscale: {
      A4: {
        "75gsm": { single: 1.0, double: 0.65 },
        "100gsm": { single: 1.5, double: 1.0 },
        bond_100: { single: 1.5, double: 1.0 },
      },
      fls: {
        "75gsm": { single: 1.3, double: 1.0 },
        green_90: { single: 2.0, double: 1.5 },
      },
      A3: {
        "75gsm": { single: 3.0, double: 2.0 },
        "100gsm": { single: 4.0, double: 3.0 },
      },
    },
    color: {
      A4: {
        "100gsm": { single: 8.0, double: 6.0 },
        "130gsm": { single: 9.0, double: 7.0 },
        "170gsm": { single: 10.0, double: 8.0 },
        "270gsm": { single: 12.0, double: 8.0 },
        photo_180: { single: 12.0, double: 0 },
        gold_300: { single: 22.0, double: 15.0 },
      },
      A3: {
        "75gsm": { single: 11.0, double: 8.0 },
        "100gsm": { single: 11.0, double: 8.0 },
        "130gsm": { single: 11.0, double: 8.5 },
        "170gsm": { single: 12.0, double: 9.0 },
        "270gsm": { single: 14.0, double: 10.0 },
      },
      "Sticker 12x18": {
        "130gsm": { single: 12.0, double: 9.0 },
        "170gsm": { single: 13.0, double: 9.5 },
        "270gsm": { single: 14.0, double: 10.0 },
        sticker_170: { single: 14.0, double: 0 },
      },
      "Sticker 13x19": {
        "130gsm": { single: 13.0, double: 9.0 },
        "170gsm": { single: 14.0, double: 10.5 },
        "270gsm": { single: 15.0, double: 11.5 },
        sticker_170: { single: 15.0, double: 0 },
        sticker_clear: { single: 30.0, double: 0 },
        sticker_pvc: { single: 30.0, double: 0 },
        non_tearable: { single: 45.0, double: 0 },
        sticker_gold: { single: 45.0, double: 0 },
        sticker_silver: { single: 45.0, double: 0 },
      },
      // Large format plans within Quick Print logic (PHP structure)
      A2: {
        line_90: { single: 40.0, double: 0 },
        img_90: { single: 80.0, double: 0 },
        cloth: { single: 175.0, double: 0 },
        non_tear: { single: 175.0, double: 0 },
        glossy: { single: 200.0, double: 0 },
      },
      A1: {
        line_90: { single: 80.0, double: 0 },
        img_90: { single: 160.0, double: 0 },
        cloth: { single: 375.0, double: 0 },
        non_tear: { single: 375.0, double: 0 },
        glossy: { single: 400.0, double: 0 },
      },
      A0: {
        line_90: { single: 160.0, double: 0 },
        img_90: { single: 290.0, double: 0 },
        cloth: { single: 700.0, double: 0 },
        non_tear: { single: 700.0, double: 0 },
        glossy: { single: 800.0, double: 0 },
      },
      LAMINATION: {
        lam_a3_125: { single: 30.0, double: 0 },
        lam_12x18_125: { single: 40.0, double: 0 },
        lam_a2_125: { single: 100.0, double: 0 },
        lam_a1_125: { single: 14.0, double: 0 },
        lam_a4_125: { single: 15.0, double: 0 },
        lam_fs_125: { single: 20.0, double: 0 },
      },
    },
    binding: {
      none: { cost: 0 },
      corner: { cost: 0 },
      spiral_binding: { cost: 40 },
      wiro: { cost: 60 },
      soft: { cost: 30 },
      hard_morocco: { cost: 100 },
      perfect: { cost: 100 },
      hard_lam: { cost: 100 },
      rexin: { cost: 250 },
    },
  },

  planPrinting: {
    A2: {
      line_90: { single: 40.0 },
      img_90: { single: 80.0 },
      cloth: { single: 175.0 },
      non_tear: { single: 175.0 },
      glossy: { single: 200.0 },
    },
    A1: {
      line_90: { single: 80.0 },
      img_90: { single: 160.0 },
      cloth: { single: 375.0 },
      non_tear: { single: 375.0 },
      glossy: { single: 400.0 },
    },
    A0: {
      line_90: { single: 160.0 },
      img_90: { single: 290.0 },
      cloth: { single: 700.0 },
      non_tear: { single: 700.0 },
      glossy: { single: 800.0 },
    },
  },

  businessCard: {
    papers: {
      art_paper: { price: 1.0 },
      ice_gold: { price: 1.5 },
      ice_silver: { price: 1.5 },
    },
    lamination: {
      none: { price: 0 },
      gloss: { price: 0.4 },
      matte: { price: 0.5 },
    },
    multiplier: { single: 1.0, double: 1.6 },
  },
};

/**
 * Re-calculates order price on server-side to prevent manipulation.
 */
const calculateBackendPrice = (serviceType, pages, qty, details) => {
  try {
    const { size, media, paper, lamination, sides, binding, printType, cover } =
      details;

    // 1. Plan Printing Logic
    if (serviceType === "Plan Printing") {
      const rate = PRICING_DATA.planPrinting[size]?.[media]?.single || 0;
      if (rate === 0) return -1;
      return Number((pages * rate * qty).toFixed(2));
    }

    // 2. Business Card Logic
    if (serviceType === "Business Card") {
      const pPrice = PRICING_DATA.businessCard.papers[paper]?.price || 0;
      const lPrice =
        PRICING_DATA.businessCard.lamination[lamination]?.price || 0;
      const mult = PRICING_DATA.businessCard.multiplier[sides] || 1.0;
      if (pPrice === 0) return -1;
      return Number(((pPrice + lPrice) * mult * qty).toFixed(2));
    }

    // 3. Quick Print Logic (Matches PHP)
    if (serviceType === "Quick Print") {
      const categoryData = PRICING_DATA.quickPrint[printType];
      if (!categoryData) return -1;

      const mediaData = categoryData[size]?.[media];
      if (!mediaData) return -1;

      // Logic: If double selected and available, use double rate, else single
      const pageRate =
        sides === "double" && mediaData.double > 0
          ? mediaData.double
          : mediaData.single;
      let total = pages * pageRate * qty;

      // Restriction Check (No binding for A0-A3, Stickers, etc. as per PHP)
      const restrictedSizes = [
        "A0",
        "A1",
        "A2",
        "A3",
        "fls",
        "Sticker 12x18",
        "Sticker 13x19",
        "LAMINATION",
      ];
      const isRestricted = restrictedSizes.some(
        (s) => s.toLowerCase() === size?.toLowerCase()
      );

      if (!isRestricted) {
        // Add Binding
        const bindCost = PRICING_DATA.quickPrint.binding[binding]?.cost || 0;
        total += bindCost * qty;

        // Add Extras (Lamination +20, Cover +50 from PHP)
        if (binding && binding !== "none" && binding !== "corner") {
          if (lamination && lamination !== "None") total += 20 * qty;
          if (cover && cover !== "No Cover Page") total += 50 * qty;
        }
      }
      return Number(total.toFixed(2));
    }

    return -1; // Unknown service
  } catch (err) {
    console.error("Calculation Error:", err);
    return -1;
  }
};

module.exports = {
  calculateBackendPrice,
  DELIVERY_CHARGE,
};
