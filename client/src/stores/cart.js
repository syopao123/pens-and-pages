import { defineStore } from "pinia";
import api from '../api';

export const useCartStore = defineStore("cart", {
  state: () => ({
    itemCount: 0,
    cart: {},
    isCartUpdating: false
  }),

  getters: {
    getCart: (state) => state.cart,

    // Total number of items iin the cart
    getCartCount: (state) => state.itemCount,

    // Number of order quantity for a specific item
    getCartItemQuantity: (state) => {
      return (productId) => {
        let item = state.cart.cartItems.find((p) => p.productId === productId);
        return item ? item.quantity : 0;
      };
    }
  },

  actions: {

    clearCartCount() {
      this.itemCount = 0;
    },

    async updateCartCount() {
      let response = await api.get("/cart/get-cart");

      let count = 0;

      if (response.data.cart) {
        response.data.cart.cartItems.forEach((item) => {
          count += item.quantity;
        });
      }

      this.itemCount = count;
    },

    async clearCart() {

      this.isCartUpdating = true;

      let response = await api.put("/cart/clear-cart");
      await this.updateCartCount();

      this.isCartUpdating = false;
      return response.data.message;
    },

    async fetchUserCart() {
      let response = await api.get("/cart/get-cart");
      this.cart = response.data.cart;
    },

    async addToCart(productId, quantity = 1, price) {
      let response = await api.post("/cart/add-to-cart", {
        productId: productId,
        quantity: quantity,
        subtotal: quantity * price,
        price: price,
      });
      this.cart = response.data.cart;
      await this.updateCartCount();
      return response.data.message;
    },

    async updateCartQuantity(productId, newQuantity) {

      this.isCartUpdating = true;

      let response = await api.patch("/cart/update-cart-quantity", {
        productId: productId,
        newQuantity,
        newQuantity,
      });

      this.cart = response.data.updatedCart;
      await this.updateCartCount();

      this.isCartUpdating = false;
      return response.data.message;
    },

    async removeFromCart(productId) {

      this.isCartUpdating = true;

      let response = await api.patch(`/cart/${productId}/remove-from-cart`);
      this.cart = response.data.updatedCart;
      await this.updateCartCount();

      this.isCartUpdating = false;
      return response.data.message;
    },

    async checkout() {

      this.isCartUpdating = true;

      let response = await api.post("/orders/checkout");
      this.cart = [];
      await this.updateCartCount();

      this.isCartUpdating = false;
      return response.data.message;
    },

    formatItemPrice(amount) {
      return `₱${Number(amount || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

  },
});