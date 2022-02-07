import {
  createAction
} from '@reduxjs/toolkit';
import * as actionTypes from './actionTypes';

export const setSubject = createAction(actionTypes.SET_SUBJECT);
export const setVideos = createAction(actionTypes.SET_VIDEOS);
export const setActiveVideo = createAction(actionTypes.SET_ACTIVE_VIDEO);
export const setNumber = createAction(actionTypes.SET_NUMBER);