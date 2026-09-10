/**
 * Centralized cart price calculation logic
 */
export const calculateCartTotals = (items = [], appliedCoupon = null, deliveryFeeOverride = null) => {
  // 1. Calculate Raw Subtotal & Product Level Savings
  let subtotal = 0;
  let totalProductSavings = 0;

  items.forEach((item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    const qty = item.quantity || 1;
    subtotal += itemPrice * qty;

    if (item.discountPercentage && item.discountPercentage > 0) {
      const originalPrice = itemPrice / (1 - item.discountPercentage / 100);
      totalProductSavings += (originalPrice - itemPrice) * qty;
    }
  });

  // 2. Calculate Coupon Discount Amount
  let couponDiscount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = (subtotal * appliedCoupon.discount) / 100;
    } else if (appliedCoupon.type === 'flat') {
      couponDiscount = Math.min(appliedCoupon.discount, subtotal);
    }
  }

  const taxableSubtotal = Math.max(0, subtotal - couponDiscount);

  // 3. Tax Calculation (18% GST on net taxable subtotal)
  const tax = taxableSubtotal > 0 ? Math.round(taxableSubtotal * 0.18 * 100) / 100 : 0;

  // 4. Shipping Calculation (Free above ₹499 subtotal, else ₹50 fixed charge)
  let shipping = 0;
  if (deliveryFeeOverride !== null && deliveryFeeOverride !== undefined) {
    shipping = deliveryFeeOverride;
  } else if (subtotal > 0 && subtotal < 499) {
    shipping = 50;
  } else {
    shipping = 0;
  }

  // 5. Grand Total Calculation
  const grandTotal = Math.max(0, taxableSubtotal + tax + shipping);

  return {
    subtotal,
    totalProductSavings,
    couponDiscount,
    taxableSubtotal,
    tax,
    shipping,
    grandTotal,
    totalItemCount: items.reduce((acc, i) => acc + (i.quantity || 1), 0),
  };
};
