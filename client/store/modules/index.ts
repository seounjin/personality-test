import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import tests from './tests';
import home from './home';
import mypage from './mypage';

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    tests,
    home,
    mypage,
  })(state, action);
};
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
