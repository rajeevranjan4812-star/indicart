import { combineReducers } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/productsApi';
import productsReducer from '../features/products/productsSlice';

const appStatusReducer = (state = { initialized: true }) => state;

const rootReducer = combineReducers({
  appStatus: appStatusReducer,
  products: productsReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export default rootReducer;
