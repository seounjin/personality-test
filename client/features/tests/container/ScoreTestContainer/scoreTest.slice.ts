import { createSlice } from '@reduxjs/toolkit';
import { IMAGE_HOLDER_PATH } from '../../tests.const';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MIN_TYPE_ITEMS_COUNT,
} from './scoreTest.const';
import { ScoreTestSliceInitialState } from './scoreTest.type';

const initialState: ScoreTestSliceInitialState = {
  scoreTestResultItemsCount: MIN_TYPE_ITEMS_COUNT,
  numberOfItemsCount: MIN_NUMBER_OF_ITEMS_COUNT,
  scoreTestResultFormItems: [
    {
      resultContent: '',
      explanationContent: '',
      resultImageUrl: IMAGE_HOLDER_PATH,
    },
    {
      resultContent: '',
      explanationContent: '',
      resultImageUrl: IMAGE_HOLDER_PATH,
    },
  ],
  imageBase64DataArray: ['', ''],
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
      const { selectItems, resultItems, isPublic } = action.payload.data;

      state.isPublic = isPublic;
      state.scoreTestResultFormItems = resultItems
        ? resultItems
        : state.scoreTestResultFormItems;
      state.scoreTestSelectFormItems = selectItems
        ? selectItems
        : state.scoreTestSelectFormItems;
    },
    setImageBase64DataArray: (state, action) => {
      const { index, imageBase64Data } = action.payload;
      state.imageBase64DataArray[index] = imageBase64Data;
    },
    popImageBase64Data: (state) => {
      state.imageBase64DataArray.pop();
    },
    pushImageBase64Data: (state) => {
      state.imageBase64DataArray.push('');
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
  setImageBase64DataArray,
  popImageBase64Data,
  pushImageBase64Data,
} = scoreTestSlice.actions;

export default scoreTestSlice.reducer;
