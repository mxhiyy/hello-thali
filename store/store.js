import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import feedbackReducer from './slices/feedbackSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
        cart: cartReducer,
    }
});

export default store;