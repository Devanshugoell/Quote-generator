export const calculateGrandTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const price = Number(item.Unit_Price) || 0;
    return total + price * item.quantity;
  }, 0);
};

export const calculateCartCount = (cartItems) => {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};