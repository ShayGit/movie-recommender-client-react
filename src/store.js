import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice'
import userReducer from './slices/userSlice'

 const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer
  },
});
export default store;
