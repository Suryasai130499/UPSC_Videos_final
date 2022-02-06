import {
  createReducer
} from '@reduxjs/toolkit';
import * as actions from '../redux/actions';
import * as actionTypes from '../redux/actionTypes';

const INITIAL_STATE = {
  subject: '',
  videos: [],
  activeVideo: 0,
}

const Reducer = createReducer(state = INITIAL_STATE, (builder) => {
  builder.addCase(
      actionTypes.SET_SUBJECT, (state, action) => ({
        ...state,
        subject: action.payload,
      }))
    .addCase(
      actionTypes.SET_VIDEOS, (state, action) => ({
        ...state,
        videos: action.payload,
      }))
    .addCase(
      actionTypes.SET_ACTIVE_VIDEO, (state, action) => ({
        ...state,
        activeVideo: action.payload,
      }))
    .addDefaultCase(
      (state, action) => ({
        ...state
      }))
});

export default Reducer;