import { useCallback } from 'react';
import { useLocalStorage } from '../shared/useLocalStorage';

/**
 * useCart Hook
 * Manages shopping cart state
 * 
 * @returns {Object} Cart items, total, and cart operations
 */
export const useCart = () => {
  const [cart, setCart] = useLocalStorage('mummas-kitchen-cart', []);

  // Add item to cart
  const addToCart = useCallback((meal, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === meal.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...meal, quantity }];
    });
  }, [setCart]);

  // Remove item from cart
  const removeFromCart = useCallback((mealId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== mealId));
  }, [setCart]);

  // Update item quantity
  const updateQuantity = useCallback((mealId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(mealId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === mealId ? { ...item, quantity } : item
      )
    );
  }, [setCart, removeFromCart]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  // Get item quantity
  const getItemQuantity = useCallback((mealId) => {
    const item = cart.find(item => item.id === mealId);
    return item ? item.quantity : 0;
  }, [cart]);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const deliveryFee = cart.length > 0 ? 30 : 0;
  const total = subtotal + tax + deliveryFee;
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
    isEmpty: cart.length === 0
  };
};
