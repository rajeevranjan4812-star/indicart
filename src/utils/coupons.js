/**
 * Local Coupon definitions and validator
 */
export const DEMO_COUPONS = {
  SAVE10: {
    code: 'SAVE10',
    type: 'percentage',
    discount: 10, // 10% off subtotal
    description: '10% off subtotal',
    minSubtotal: 0,
  },
  FLAT50: {
    code: 'FLAT50',
    type: 'flat',
    discount: 50, // ₹50 flat off
    description: '₹50 flat discount',
    minSubtotal: 299,
  },
  WELCOME: {
    code: 'WELCOME',
    type: 'percentage',
    discount: 15, // 15% off subtotal
    description: '15% off for new shoppers',
    minSubtotal: 0,
  },
};

export const validateCoupon = (code, subtotal = 0) => {
  if (!code || typeof code !== 'string') {
    return { valid: false, message: 'Please enter a coupon code.' };
  }

  const cleanCode = code.toUpperCase().trim();
  const coupon = DEMO_COUPONS[cleanCode];

  if (!coupon) {
    return { valid: false, message: `Invalid coupon code "${code}". Try SAVE10, FLAT50, or WELCOME.` };
  }

  if (subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      message: `Coupon ${cleanCode} requires a minimum cart subtotal of ₹${coupon.minSubtotal}.`,
    };
  }

  return { valid: true, coupon, message: `Coupon ${cleanCode} applied successfully!` };
};
