import {
  createReducer
} from '@reduxjs/toolkit';
import * as actionTypes from '../redux/actionTypes';

const INITIAL_STATE = {
  number: 0,
  subject: '',
  subjects: [],
  institute: '',
  institutes: [{
      name: 'Insights',
      subjects: {
        'Modern_History': 21,
        'Geography': 18,
        'Ethics': 12,
        'Science_And_Technology': 23,
        'Environment': 20,
        'Economics': 9,
      },
    },
    {
      name: 'Laex_NCERTs',
      subjects: {
        'Polity': 20,
        'Geography': 23,
        'Economics': 23,
        'History': 20,
      }
    },
  ],
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
      actionTypes.SET_SUBJECTS, (state, action) => ({
        ...state,
        subjects: action.payload,
      }))
    .addCase(
      actionTypes.SET_INSTITUTE, (state, action) => ({
        ...state,
        institute: action.payload,
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