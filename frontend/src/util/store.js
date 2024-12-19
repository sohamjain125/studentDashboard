import { configureStore } from '@reduxjs/toolkit';
// import studentReducer from './studentSlice.js';
import studentReducer from "../components/studentSlice"

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;
