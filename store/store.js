import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import feedbackReducer from './slices/feedbackSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
        cart: cartReducer,
        order: orderReducer,
        user: userReducer,
    }
});

export default store;