import { defineStore } from "pinia";
import api from "@/api";

export const useOrdersStore = defineStore("orders", {
  actions: {

    async fetchMyOrders() {
      let response = await api.get("/orders/my-orders");
      return response.data.orders;
    },

    async fetchAllOrders() {
      let response = await api.get("/orders/all-orders");
      return response.data.orders;
    },
    
  },
});