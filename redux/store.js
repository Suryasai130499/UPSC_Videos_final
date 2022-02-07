import {
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import Reducer from './reducer';

const store = configureStore({
  reducer: Reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => (process.env.NODE_ENV !== 'production' ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()),
})

export default store;