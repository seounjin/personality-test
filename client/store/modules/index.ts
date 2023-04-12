import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import tests from './tests';
import auth from './auth';
import loading from './loading';
import scoreTest from '../../features/tests/container/ScoreTestContainer/scoreTest.slice';
import mbtiTest from '../../features/tests/container/MbtiTestContainer/mbtiTest.slice';
import trueOrFalseTest from '../../features/tests/container/TrueOrFalseTestContainer/trueOrFalse.slice';
import basicForm from '../../features/tests/container/BasicInformationForm/BasicInformationForm.slice';

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    tests,
    auth,
    scoreTest,
    mbtiTest,
    trueOrFalseTest,
    basicForm,
    loading,
  })(state, action);
};
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
