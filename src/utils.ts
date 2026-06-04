/**
 * Formats a number to PKR currency format with commas.
 */
export const formatPKR = (amount: number): string => {
  return `PKR ${amount.toLocaleString('en-US')}`;
};

/**
 * Calculates discount percentage between original price and current price.
 */
export const calculateDiscount = (originalPrice: number, price: number): number => {
  if (originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
