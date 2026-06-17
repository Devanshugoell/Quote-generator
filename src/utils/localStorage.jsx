const CART_STORAGE_KEY = 'zoho_crm_catalogue_cart';

export const getStoredCart = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage', error);
    return [];
  }
};

export const setStoredCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage', error);
  }
};