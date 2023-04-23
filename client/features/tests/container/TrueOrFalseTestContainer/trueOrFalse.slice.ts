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
  imageBase64DataArray: [''],
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
      const { selectItems, resultItems, isPublic } = action.payload.data;

      state.trueOrFalseTestResultFormItems = resultItems
        ? resultItems
        : state.trueOrFalseTestResultFormItems;

      state.trueOrFalseTestSelectFormItems = selectItems
        ? selectItems
        : state.trueOrFalseTestSelectFormItems;

      state.numberOfItemsCount = selectItems
        ? selectItems.length
        : state.trueOrFalseTestSelectFormItems.length;
      state.isPublic = isPublic;
    },
    setImageBase64DataArray: (state, action) => {
      const { index, imageBase64Data } = action.payload;
      state.imageBase64DataArray[index] = imageBase64Data;
    },
    setInitImageBase64DataArray: (state, action) => {
      const arrayLength = action.payload.arrayLength;
      state.imageBase64DataArray = Array.from(
        { length: arrayLength },
        (_, index) => {
          return index < state.imageBase64DataArray.length
            ? state.imageBase64DataArray[index]
            : '';
        },
      );
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
  setNumberOfItemsCount,
  setTrueOrFalseTestSelectFormItems,
  setTrueOrFalseTestResultFormItems,
  setTrueOrFalseTestItems,
  setImageBase64DataArray,
  popImageBase64Data,
  pushImageBase64Data,
  setInitImageBase64DataArray,
} = trueOrFalseSlice.actions;

export default trueOrFalseSlice.reducer;
