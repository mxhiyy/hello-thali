import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  items: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
  totalQuantity: Cookies.get("cartQuantity")
    ? JSON.parse(Cookies.get("cartQuantity"))
    : 0,
  totalPrice: Cookies.get("cartTotalPrice")
    ? JSON.parse(Cookies.get("cartTotalPrice"))
    : 0,
  totalMRP: 0,
  totalDiscount: 0,
  totalDisplayPrice: Cookies.get("totalDisplayPrice")
    ? JSON.parse(Cookies.get("totalDisplayPrice"))
    : 0,
};

const calculateItemTotal = (items) => {
  return items.reduce((total, item) => total + item.mrp * item.quantity, 0);
};

const calculateItemDiscount = (items) => {
  return items.reduce(
    (total, item) => total + (item.mrp - item.sellingPrice) * item.quantity,
    0
  );
};

const updateCartCookies = (state) => {
  Cookies.set("cartItems", JSON.stringify(state.items));
  Cookies.set("cartQuantity", JSON.stringify(state.totalQuantity));
  Cookies.set("cartTotalPrice", JSON.stringify(state.totalPrice));
  Cookies.set("totalDisplayPrice", JSON.stringify(state.totalDisplayPrice));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.sellingPrice;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.sellingPrice,
          customisation: Cookies.get(`customisation-${newItem.id}`) || null,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += newItem.sellingPrice;
      state.totalMRP = calculateItemTotal(state.items);
      state.totalDiscount = calculateItemDiscount(state.items);
      state.totalDisplayPrice = state.totalMRP - state.totalDiscount;

      updateCartCookies(state);
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }

      state.totalMRP = calculateItemTotal(state.items);
      state.totalDiscount = calculateItemDiscount(state.items);
      state.totalDisplayPrice = state.totalMRP - state.totalDiscount;

      updateCartCookies(state);
    },

    decrementItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= existingItem.sellingPrice;
          state.totalQuantity -= 1;
          state.totalPrice -= existingItem.sellingPrice;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
          state.totalQuantity -= 1;
          state.totalPrice -= existingItem.sellingPrice;
        }
      }

      state.totalMRP = calculateItemTotal(state.items);
      state.totalDiscount = calculateItemDiscount(state.items);
      state.totalDisplayPrice = state.totalMRP - state.totalDiscount;

      updateCartCookies(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalMRP = 0;
      state.totalDiscount = 0;
      state.totalDisplayPrice = 0;

      Cookies.remove("cartItems");
      Cookies.remove("cartQuantity");
      Cookies.remove("cartTotalPrice");
      Cookies.remove("totalDisplayPrice");
    },

    updateCustomisation(state, action) {
      const { id, customisation } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.customisation = customisation;
        existingItem.description = `Serves 1 | Other Items: ${customisation}, Raiyeta, Salad, Pickel, Mouth Freshner`;
        Cookies.set(`customisation-${id}`, customisation);
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  decrementItem,
  updateCustomisation,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
