import { createSlice } from '@reduxjs/toolkit';
import { TF_MIN_NUMBER_OF_ITEMS_COUNT } from './trueOrFalse.const';
import { TrueOrFalseTestSliceInitialState } from './trueOrFalseTest.type';

const initialState: TrueOrFalseTestSliceInitialState = {
  numberOfItemsCount: TF_MIN_NUMBER_OF_ITEMS_COUNT,
  trueOrFalseTestSelectFormItems: [
    {
      question: '',
      optionItems: [
        { option: '', id: '0' },
        { option: '', id: '1' },
      ],
    },
  ],
  trueOrFalseTestResultFormItems: [],
  isPublic: true,
};

const trueOrFalseSlice = createSlice({
  name: 'trueOrFalseTest',
  initialState,
  reducers: {
    setNumberOfItemsCount: (state, action) => {
      state.numberOfItemsCount += action.payload.count;
    },

    setTrueOrFalseTestSelectFormItems: (state, action) => {
      state.trueOrFalseTestSelectFormItems =
        action.payload.trueOrFalseTestSelectFormItems;
    },
    setTrueOrFalseTestResultFormItems: (state, action) => {
      state.trueOrFalseTestResultFormItems =
        action.payload.trueOrFalseTestResultFormItems;
    },
    setTrueOrFalseTestItems: (state, action) => {
      const {
        trueOrFalseTestSelectFormItems,
        trueOrFalseTestResultFormItems,
        isPublic,
      } = action.payload.data;

      state.trueOrFalseTestResultFormItems = trueOrFalseTestResultFormItems
        ? trueOrFalseTestResultFormItems
        : state.trueOrFalseTestResultFormItems;

      state.trueOrFalseTestSelectFormItems = trueOrFalseTestSelectFormItems
        ? trueOrFalseTestSelectFormItems
        : state.trueOrFalseTestSelectFormItems;

      state.isPublic = isPublic;
    },
  },
});

export const {
  setNumberOfItemsCount,
  setTrueOrFalseTestSelectFormItems,
  setTrueOrFalseTestResultFormItems,
  setTrueOrFalseTestItems,
} = trueOrFalseSlice.actions;

export default trueOrFalseSlice.reducer;
