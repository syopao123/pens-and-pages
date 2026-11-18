import { defineStore } from "pinia";
import api from "@/api";

export const useProductStore = defineStore("product", {
  actions: {

    async getProductName(productId) {
      let response = await api.get(`/products/${productId}`);
      return response.data.name;
    },

    async getProductDetails(productId) {
      let response = await api.get(`/products/${productId}`);
      return response.data;
    },
    
  },
});
