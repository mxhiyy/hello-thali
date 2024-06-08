import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if(existingItem){
                existingItem.quantity += 1;
                existingItem.totalPrice += newItem.sellingPrice;
            }else{
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.sellingPrice,
                })
            }

            state.totalQuantity += 1;
            state.totalPrice += newItem.sellingPrice;
        },

        removeItem(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem){
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;
                state.items = state.items.filter(item => item.id !== id);
            }
        },

        decrementItem(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem){
                if(existingItem.quantity > 1){
                    existingItem.quantity -= 1;
                    existingItem.totalPrice -= existingItem.sellingPrice;
                    state.totalQuantity -= 1;
                    state.totalPrice -= existingItem.sellingPrice;
                }else {
                    state.items  = state.items.filter(item => item.id !== id);
                    state.totalQuantity -= 1;
                    state.totalPrice -= existingItem.sellingPrice;
                }
            }
        },

        updateCustomisation(state, action){
            const { id, customisation } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem){
                existingItem.customisation = customisation;
            }
        },

    }
});

export const { addItem, removeItem, decrementItem, updateCustomisation } = cartSlice.actions;
export default cartSlice.reducer;