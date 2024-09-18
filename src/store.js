import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Import your CartSlice

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
