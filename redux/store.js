import {
  configureStore
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import Reducer from './reducer';


const store = configureStore({
  reducer: Reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;