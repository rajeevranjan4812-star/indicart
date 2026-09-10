/**
 * Central currency formatting utility for Indicart E-Commerce
 * Formats numerical values into Indian Rupee (₹) representation.
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  const num = Number(amount);
  return `₹${num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatPriceShort = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  const num = Number(amount);
  return `₹${Math.round(num)}`;
};
