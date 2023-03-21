import { createSlice } from '@reduxjs/toolkit';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MIN_TYPE_ITEMS_COUNT,
} from './scoreTestType.const';
import { ScoreTestSliceInitialState } from './scoreTestType.type';

const initialState: ScoreTestSliceInitialState = {
  scoreTestResultItemsCount: MIN_TYPE_ITEMS_COUNT,
  numberOfItemsCount: MIN_NUMBER_OF_ITEMS_COUNT,
  scoreTestResultFormItems: [
    {
      resultContent: '',
      explanationContent: '',
    },
    {
      resultContent: '',
      explanationContent: '',
    },
  ],
  scoreTestSelectFormItems: [],
  isPublic: true,
};

const scoreTestSlice = createSlice({
  name: 'scoreTest',
  initialState,
  reducers: {
    setScoreTestResultItemsCount: (state, action) => {
      state.scoreTestResultItemsCount += action.payload.count;
    },
    setNumberOfItemsCount: (state, action) => {
      state.numberOfItemsCount += action.payload.count;
    },
    setScoreTestResultFormItems: (state, action) => {
      state.scoreTestResultFormItems =
        action.payload.scoreTestResultFormItems.map((data) => ({
          ...data,
        }));
    },
    setInitScoreTestSelectFormItems: (state, action) => {
      const weightedScoreItems = action.payload.scoreTestResultFormItems.map(
        ({ resultContent }) => ({
          resultContent: resultContent,
          score: 0,
        }),
      );
      state.scoreTestSelectFormItems = [
        {
          question: '',
          optionItems: [
            { option: '', weightedScoreItems: weightedScoreItems },
            { option: '', weightedScoreItems: weightedScoreItems },
          ],
        },
      ];
    },
    setScoreTestSelectFormItems: (state, action) => {
      state.scoreTestSelectFormItems = action.payload.scoreTestSelectFormItems;
    },
    setScoreTestItems: (state, action) => {
      const { scoreTestSelectFormItems, scoreTestResultFormItems, isPublic } =
        action.payload.data;

      state.isPublic = isPublic;
      state.scoreTestResultFormItems = scoreTestResultFormItems
        ? scoreTestResultFormItems
        : state.scoreTestResultFormItems;
      state.scoreTestSelectFormItems = scoreTestSelectFormItems
        ? scoreTestSelectFormItems
        : state.scoreTestSelectFormItems;
    },
  },
});

export const {
  setScoreTestResultFormItems,
  setInitScoreTestSelectFormItems,
  setScoreTestSelectFormItems,
  setScoreTestResultItemsCount,
  setNumberOfItemsCount,
  setScoreTestItems,
} = scoreTestSlice.actions;

export default scoreTestSlice.reducer;
