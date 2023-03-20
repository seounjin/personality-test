import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import tests from './tests';
import auth from './auth';
import mypage from './mypage';
import scoreTest from '../../features/tests/container/ScoreTestTypeContainer/ScoreTestTypeContainer.slice';

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    tests,
    auth,
    mypage,
    scoreTest,
  })(state, action);
};
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
