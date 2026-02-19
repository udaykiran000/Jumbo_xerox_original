// Import binding images from assets folder
import looseImg from "../assets/loose.jpg";
import cornerImg from "../assets/corner.jpg";
import spiralImg from "../assets/spiral.jpg";
import wiroImg from "../assets/wiro.jpg";
import softImg from "../assets/soft.jpg";
import moroccoImg from "../assets/morroco.jpg";
import fullsoftImg from "../assets/fullsoft.jpg";
import hardImg from "../assets/hard.jpg";
import rexinImg from "../assets/rexin.jpg";

export const PRICING_DATA = {
  quickPrint: {
    grayscale: {
      A4: {
        "75gsm": { name: "A4 Paper (75 GSM)", single: 1.0, double: 0.65 },
        "100gsm": { name: "A4 Paper (100 GSM)", single: 1.5, double: 1.0 },
        bond_100: { name: "A4 100 Bond (100 GSM)", single: 1.5, double: 1.0 },
      },
      fls: {
        "75gsm": { name: "FLS Standard (75 GSM)", single: 1.3, double: 1.0 },
        green_90: {
          name: "FLS Green Paper (90 GSM)",
          single: 2.0,
          double: 1.5,
        },
      },
      A3: {
        "75gsm": { name: "A3 Paper (75 GSM)", single: 3.0, double: 2.0 },
        "100gsm": { name: "A3 Paper (100 GSM)", single: 4.0, double: 3.0 },
      },
    },
    color: {
      A4: {
        "100gsm": { name: "A4 Paper (100 GSM)", single: 8.0, double: 6.0 },
        "130gsm": { name: "A4 Paper (130 GSM)", single: 9.0, double: 7.0 },
        "170gsm": { name: "A4 Paper (170 GSM)", single: 10.0, double: 8.0 },
        "270gsm": { name: "A4 Paper (270 GSM)", single: 12.0, double: 8.0 },
        photo_180: {
          name: "A4 Photo Paper (180 GSM)",
          single: 12.0,
          double: 0,
        },
        gold_300: {
          name: "A4 Special Board Gold (300 GSM)",
          single: 22.0,
          double: 15.0,
        },
      },
      A3: {
        "75gsm": { name: "A3 Paper (75 GSM)", single: 11.0, double: 8.0 },
        "100gsm": { name: "A3 Paper (100 GSM)", single: 11.0, double: 8.0 },
        "130gsm": {
          name: "A3 Art Paper 12x18 (130 GSM)",
          single: 11.0,
          double: 8.5,
        },
        "170gsm": {
          name: "A3 Art Paper 12x18 (170 GSM)",
          single: 12.0,
          double: 9.0,
        },
        "270gsm": {
          name: "A3 Art Paper 12x18 (270 GSM)",
          single: 14.0,
          double: 10.0,
        },
      },
      "Sticker 12x18": {
        "130gsm": {
          name: "A4 Art Paper 12x18 (130 GSM)",
          single: 12.0,
          double: 9.0,
        },
        "170gsm": {
          name: "A4 Art Paper 12x18 (170 GSM)",
          single: 13.0,
          double: 9.5,
        },
        "270gsm": {
          name: "A4 Art Paper 12x18 (270 GSM)",
          single: 14.0,
          double: 10.0,
        },
        sticker_170: {
          name: "Sticker 12x18 (170 GSM)",
          single: 14.0,
          double: 0,
        },
      },
      "Sticker 13x19": {
        "130gsm": {
          name: "Art Paper 13x19 (130 GSM)",
          single: 13.0,
          double: 9.0,
        },
        "170gsm": {
          name: "Art Paper 13x19 (170 GSM)",
          single: 14.0,
          double: 10.5,
        },
        "270gsm": {
          name: "Art Paper 13x19 (270 GSM)",
          single: 15.0,
          double: 11.5,
        },
        sticker_170: {
          name: "Sticker 13x19 (170 GSM)",
          single: 15.0,
          double: 0,
        },
        sticker_clear: {
          name: "Clear Sticker 13x19 (170 GSM)",
          single: 30.0,
          double: 0,
        },
        sticker_pvc: {
          name: "PVC White Sticker 13x19 (170 GSM)",
          single: 30.0,
          double: 0,
        },
        non_tearable: {
          name: "Non Tearable 13x19 (170 GSM)",
          single: 45.0,
          double: 0,
        },
        sticker_gold: {
          name: "Gold Sticker 13x19 (170 GSM)",
          single: 45.0,
          double: 0,
        },
        sticker_silver: {
          name: "Silver Sticker 13x19 (170 GSM)",
          single: 45.0,
          double: 0,
        },
      },
      A2: {
        line_90: {
          name: "A2 Plans Line Drawings (90 GSM)",
          single: 40.0,
          double: 0,
        },
        img_90: { name: "A2 Plans Images (90 GSM)", single: 80.0, double: 0 },
        cloth: { name: "A2 Plans Cloth (90 GSM)", single: 175.0, double: 0 },
        non_tear: {
          name: "A2 Plans Non Tearable (90 GSM)",
          single: 175.0,
          double: 0,
        },
        glossy: { name: "A2 Photo Glossy (90 GSM)", single: 200.0, double: 0 },
      },
      A1: {
        line_90: {
          name: "A1 Plans Line Drawings (90 GSM)",
          single: 80.0,
          double: 0,
        },
        img_90: { name: "A1 Plans Images (90 GSM)", single: 160.0, double: 0 },
        cloth: { name: "A1 Plans Cloth (90 GSM)", single: 375.0, double: 0 },
        non_tear: {
          name: "A1 Plans Non Tearable (90 GSM)",
          single: 375.0,
          double: 0,
        },
        glossy: { name: "A1 Photo Glossy (90 GSM)", single: 400.0, double: 0 },
      },
      A0: {
        line_90: {
          name: "A0 Plans Line Drawings (90 GSM)",
          single: 160.0,
          double: 0,
        },
        img_90: { name: "A0 Plans Images (90 GSM)", single: 290.0, double: 0 },
        cloth: { name: "A0 Plans Cloth (90 GSM)", single: 700.0, double: 0 },
        non_tear: {
          name: "A0 Plans Non Tearable (90 GSM)",
          single: 700.0,
          double: 0,
        },
        glossy: { name: "A0 Photo Glossy (90 GSM)", single: 800.0, double: 0 },
      },
      LAMINATION: {
        lam_a3_125: {
          name: "Lamination A3 (125 GSM)",
          single: 30.0,
          double: 0,
        },
        lam_12x18_125: {
          name: "Lamination 12x18(125 GSM)",
          single: 40.0,
          double: 0,
        },
        lam_a2_125: { name: "Lamination A2 (17x23)", single: 100.0, double: 0 },
        lam_a1_125: {
          name: "Lamination A1 (23x34 GSM)",
          single: 14.0,
          double: 0,
        },
        lam_a4_125: {
          name: "Lamination A4 (125 GSM)",
          single: 15.0,
          double: 0,
        },
        lam_fs_125: {
          name: "Lamination FS (125 GSM)",
          single: 20.0,
          double: 0,
        },
      },
    },
    binding: {
      none: {
        name: "Loose Sheets",
        cost: 0,
        img: looseImg,
        desc: "Standard loose pages",
      },
      corner: {
        name: "Corner Stapling",
        cost: 0,
        img: cornerImg,
        desc: "Stapled at top-left",
      },
      spiral_binding: {
        name: "Spiral Binding",
        cost: 40,
        img: spiralImg,
        desc: "Plastic coil with PVC cover",
      },
      wiro: {
        name: "Wiro Binding",
        cost: 60,
        img: wiroImg,
        desc: "Premium metal twin-loop wire",
      },
      soft: {
        name: "Soft Binding",
        cost: 30,
        img: softImg,
        desc: "Thick card cover with tape",
      },
      hard_morocco: {
        name: "Hard Binding (Morocco)",
        cost: 100,
        img: moroccoImg,
        desc: "Satin Morocco Cover",
      },
      perfect: {
        name: "Perfect Binding",
        cost: 100,
        img: fullsoftImg,
        desc: "Glued spine book finish",
      },
      hard_lam: {
        name: "Hard Binding (Lam)",
        cost: 100,
        img: hardImg,
        desc: "Gloss lamination cover",
      },
      rexin: {
        name: "Rexin Binding",
        cost: 250,
        img: rexinImg,
        desc: "Gold Emboss Rexin Hardcover",
      },
    },
  },

  planPrinting: {
    A2: {
      line_90: { name: "Line Drawings (90 GSM)", single: 40.0 },
      img_90: { name: "Images (90 GSM)", single: 80.0 },
      cloth: { name: "Cloth (90 GSM)", single: 175.0 },
      non_tear: { name: "Non Tearable (90 GSM)", single: 175.0 },
      glossy: { name: "Photo Glossy (90 GSM)", single: 200.0 },
    },
    A1: {
      line_90: { name: "Line Drawings (90 GSM)", single: 80.0 },
      img_90: { name: "Images (90 GSM)", single: 160.0 },
      cloth: { name: "Cloth (90 GSM)", single: 375.0 },
      non_tear: { name: "Non Tearable (90 GSM)", single: 375.0 },
      glossy: { name: "Photo Glossy (90 GSM)", single: 400.0 },
    },
    A0: {
      line_90: { name: "Line Drawings (90 GSM)", single: 160.0 },
      img_90: { name: "Images (90 GSM)", single: 290.0 },
      cloth: { name: "Cloth (90 GSM)", single: 700.0 },
      non_tear: { name: "Non Tearable (90 GSM)", single: 700.0 },
      glossy: { name: "Photo Glossy (90 GSM)", single: 800.0 },
    },
  },

  businessCard: {
    papers: {
      art_paper: { name: "Art Paper", price: 1.0 },
      ice_gold: { name: "Ice Metallic Gold", price: 1.5 },
      ice_silver: { name: "Ice Silver", price: 1.5 },
    },
    lamination: {
      none: { name: "None", price: 0 },
      gloss: { name: "Gloss Lamination", price: 0.4 },
      matte: { name: "Matte Lamination", price: 0.5 },
    },
    multiplier: { single: 1.0, double: 1.6 },
  },
};

export const calculateItemPrice = (type, config) => {
  const {
    pages,
    qty,
    size,
    media,
    paper,
    lamination,
    sides,
    binding,
    printType,
    cover,
  } = config;

  // 1. Plan Printing Logic
  if (type === "planPrinting") {
    const rate = PRICING_DATA.planPrinting[size]?.[media]?.single || 0;
    return Number((pages * rate * qty).toFixed(2));
  }

  // 2. Business Card Logic
  if (type === "businessCard") {
    const pPrice = PRICING_DATA.businessCard.papers[paper]?.price || 0;
    const lPrice = PRICING_DATA.businessCard.lamination[lamination]?.price || 0;
    const mult = PRICING_DATA.businessCard.multiplier[sides] || 1.0;
    return Number(((pPrice + lPrice) * mult * qty).toFixed(2));
  }

  // 3. Quick Print Logic (Synchronized with PHP)
  if (type === "quickPrint") {
    const categoryData = PRICING_DATA.quickPrint[printType];
    if (!categoryData) return 0;

    const mediaData = categoryData[size]?.[media];
    if (!mediaData) return 0;

    const pageRate =
      sides === "double" && mediaData.double > 0
        ? mediaData.double
        : mediaData.single;
    let total = pages * pageRate * qty;

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
      const bindCost = PRICING_DATA.quickPrint.binding[binding]?.cost || 0;
      total += bindCost * qty;

      if (binding && binding !== "none" && binding !== "corner") {
        if (lamination && lamination !== "None") {
          total += 20 * qty;
        }
        if (cover && cover !== "No Cover Page") {
          total += 50 * qty;
        }
      }
    }
    return Number(total.toFixed(2));
  }
  return 0;
};
