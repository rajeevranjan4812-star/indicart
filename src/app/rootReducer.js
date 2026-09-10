import { combineReducers } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/productsApi';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import authReducer from '../features/auth/authSlice';
import couponReducer from '../features/coupons/couponSlice';
import ordersReducer from '../features/orders/ordersSlice';

const appStatusReducer = (state = { initialized: true }) => state;

const rootReducer = combineReducers({
  appStatus: appStatusReducer,
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  auth: authReducer,
  coupons: couponReducer,
  orders: ordersReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export default rootReducer;
