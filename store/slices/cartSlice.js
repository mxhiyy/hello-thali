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
  totalDisplyPrice: Cookies.get("totalDisplyPrice")
  ? JSON.parse(Cookies.get("totalDisplyPrice"))
  : 0,
};

const calculateItemTotal = (items) => {
  return items.reduce((total, item) => total + item.mrp * item.quantity, 0);
};

const calculateItemDiscount = (items) => {
  return items.reduce((total, item) => total + ( item.mrp - item.sellingPrice ) * item.quantity, 0);
}

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
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += newItem.sellingPrice;
      state.totalMRP = calculateItemTotal(state.items);
      state.totalDiscount = calculateItemDiscount(state.items);
      state.totalDisplyPrice = state.totalMRP - state.totalDiscount;

      Cookies.set("cartItems", JSON.stringify(state.items));
      Cookies.set("cartQuantity", JSON.stringify(state.totalQuantity));
      Cookies.set("cartTotalPrice", JSON.stringify(state.totalPrice));
      Cookies.set("totalDisplyPrice", JSON.stringify(state.totalDisplyPrice));
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
      state.totalDisplyPrice = state.totalMRP - state.totalDiscount;
      
      Cookies.set("cartItems", JSON.stringify(state.items));
      Cookies.set("cartQuantity", JSON.stringify(state.totalQuantity));
      Cookies.set("cartTotalPrice", JSON.stringify(state.totalPrice));
      Cookies.set("totalDisplyPrice", JSON.stringify(state.totalDisplyPrice));
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
      state.totalDisplyPrice = state.totalMRP - state.totalDiscount;

      Cookies.set("cartItems", JSON.stringify(state.items));
      Cookies.set("cartQuantity", JSON.stringify(state.totalQuantity));
      Cookies.set("cartTotalPrice", JSON.stringify(state.totalPrice));
      Cookies.set("totalDisplyPrice", JSON.stringify(state.totalDisplyPrice));
    },

    updateCustomisation(state, action) {
      const { id, customisation } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.customisation = customisation;
      }
    },
  },
});

export const { addItem, removeItem, decrementItem, updateCustomisation } =
  cartSlice.actions;
export default cartSlice.reducer;
