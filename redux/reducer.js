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
      subjects: [
        'Modern_History',
        'Geography',
        'Ethics',
        'Science_And_Technology',
        'Environment',
        'Economics',
      ],
    },
    {
      name: 'Laex_NCERTs',
      subjects: [
        'Polity',
        'Geography',
        'Economics',
        'History',
      ]
    },
  ],
  videos: [],
  activeVideo: 0,
  theme: true,
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
      actionTypes.SET_INSTITUTES, (state, action) => ({
        ...state,
        institutes: action.payload,
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
      actionTypes.SET_THEME, (state, action) => ({
        ...state,
        theme: action.payload,
      })
    )
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