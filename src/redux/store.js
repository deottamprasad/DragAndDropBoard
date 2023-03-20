import { configureStore } from '@reduxjs/toolkit'
import { itemsApi } from './apiSlice';
import itemsObj from './itemsObj';

export const store = configureStore({
  reducer: {
    itemsObj,
    [itemsApi.reducerPath]: itemsApi.reducer
  },
  devTools:true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware)
})