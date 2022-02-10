import {
  createReducer
} from '@reduxjs/toolkit';
import * as actions from '../redux/actions';
import * as actionTypes from '../redux/actionTypes';

const INITIAL_STATE = {
  number: 0,
  subjects: {
    'Modern_History': 21,
    'Geography': 18,
    'Ethics': 12,
    'Science_And_Technology': 23,
    'Environment': 21,
    'Economics': 9,
  },
  videos: [],
  activeVideo: 0,
}

const Reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(
      actionTypes.SET_SUBJECT, (state, action) => ({
        ...state,
        subject: action.payload,
      }))
    .addCase(
      actionTypes.SET_NUMBER, (state, action) => ({
        ...state,
        number: action.payload,
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