import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import tests from './tests';
import auth from './auth';
import mypage from './mypage';
import scoreTest from '../../features/tests/container/ScoreTestTypeContainer/scoreTestType.slice';
import mbtiTest from '../../features/tests/container/MbtiTestTypeContainer/mbtiTestType.slice';
import trueOrFalseTest from '../../features/tests/container/TrueOrFalseTestContainer/trueOrFalse.slice';
import basicForm from '../../features/tests/container/BasicInformationForm/BasicInformationForm.slice';

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    tests,
    auth,
    mypage,
    scoreTest,
    mbtiTest,
    trueOrFalseTest,
    basicForm,
  })(state, action);
};
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
