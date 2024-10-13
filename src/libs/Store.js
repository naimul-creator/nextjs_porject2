import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './fetaures/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
  })
}