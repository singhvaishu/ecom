import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/components/authSlice';
import productReducer from '../features/product/ProductListSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/components/userSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
