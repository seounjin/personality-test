import { createSlice } from '@reduxjs/toolkit';
import { TestsInitialState } from '../types';

const initialState: TestsInitialState = {
  mode: 'create',
  isSelectedTest: false,
  testType: '',
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    reSetTestsData: () => initialState,
    setMode: (state, action) => {
      state.mode = action.payload.mode;
    },

    setTestType: (state, action) => {
      state.testType = action.payload.testType;
    },

    setIsSelectedTest: (state, action) => {
      state.isSelectedTest = action.payload.isSelectedTest;
    },
  },
});

export const { setMode, reSetTestsData, setTestType, setIsSelectedTest } =
  testsSlice.actions;
export default testsSlice.reducer;
