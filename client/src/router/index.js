import { createRouter, createWebHistory } from "vue-router";
import AddProduct from "@/pages/AddProduct.vue";
import Cart from "@/pages/Cart.vue";
import EditProduct from "@/pages/EditProduct.vue";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Logout from "@/pages/Logout.vue";
import NotFound from "@/pages/NotFound.vue";
import Products from "@/pages/Products.vue";
import ProductDetail from "@/pages/ProductDetail.vue"; // 1. Added Import
import Profile from "@/pages/Profile.vue";
import Register from "@/pages/Register.vue";
import Orders from "@/pages/Orders.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/products",
      name: "Products",
      component: Products,
    },
    {
      path: "/products/:id",
      name: "ProductDetail",
      component: ProductDetail,
    },
    {
      path: "/add-product",
      name: "AddProduct",
      component: AddProduct,
    },
    {
      path: "/edit-product/:id",
      name: "EditProduct",
      component: EditProduct,
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;