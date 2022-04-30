import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import admin from './admin';

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    admin,
  })(state, action);
};
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
