import { createSlice } from '@reduxjs/toolkit';
import {
  MBTI_DATA,
  MBTI_TEST_RESULT_FORM_ITEMS,
  MBTI_SELECT_COUNT,
} from './mbtiTest.const';
import { MbtiTestSliceInitialState } from './mbtiTest.type';

const initialState: MbtiTestSliceInitialState = {
  isPublic: true,
  mbtiTestResultFormItems: MBTI_TEST_RESULT_FORM_ITEMS,
  mbtiTestSelectFormItems: [],
  imageBase64DataArray: [],
};

const mbtiTestSlice = createSlice({
  name: 'mbtiTest',
  initialState,
  reducers: {
    setmbtiTestResultFormItems: (state, action) => {
      state.mbtiTestResultFormItems =
        action.payload.mbtiTestResultFormItems.map((data) => ({
          ...data,
        }));
    },

    setMbtiSelctFormItems: (state, action) => {
      state.mbtiTestSelectFormItems = action.payload.mbtiTestSelectFormItems;
    },

    setInitMbtiSelctFormItems: (state) => {
      const weightedScoreItems = (array, score) =>
        array.map((item, index) => ({
          resultContent: item,
          score: score[index],
        }));

      const setRadioButtonItems = (array, mbtiItemsIndex) => {
        return array.map((item, index) => {
          const first = index === 0 ? array[0] : array[1];
          const second = index === 0 ? array[1] : array[0];
          return {
            text: `1번에 (${first}가중치 1) 2번에 (${second}가중치 1)`,
            id: `${first + second}${mbtiItemsIndex}`,
            htmlFor: `${first + second}${mbtiItemsIndex}`,
          };
        });
      };

      state.mbtiTestSelectFormItems = Array(MBTI_SELECT_COUNT)
        .fill(0)
        .map((_, index) => {
          return {
            question: '',
            radioButtonItems: setRadioButtonItems(
              MBTI_DATA[Math.floor(index / 3)],
              index,
            ),
            radioButtonIndex: '0',
            optionItems: [
              {
                option: '',
                weightedScoreItems: weightedScoreItems(
                  MBTI_DATA[Math.floor(index / 3)],
                  [1, 0],
                ),
              },
              {
                option: '',
                weightedScoreItems: weightedScoreItems(
                  MBTI_DATA[Math.floor(index / 3)],
                  [0, 1],
                ),
              },
            ],
          };
        });
    },

    setMbtiTestItems: (state, action) => {
      const { isPublic, selectItems, resultItems } = action.payload.data;

      state.isPublic = isPublic;
      state.mbtiTestResultFormItems = resultItems
        ? resultItems
        : state.mbtiTestResultFormItems;
      state.mbtiTestSelectFormItems = selectItems
        ? selectItems
        : state.mbtiTestSelectFormItems;
    },
    setImageBase64DataArray: (state, action) => {
      const { index, imageBase64Data } = action.payload;
      state.imageBase64DataArray[index] = imageBase64Data;
    },
  },
});

export const {
  setMbtiTestItems,
  setmbtiTestResultFormItems,
  setMbtiSelctFormItems,
  setInitMbtiSelctFormItems,
  setImageBase64DataArray,
} = mbtiTestSlice.actions;

export default mbtiTestSlice.reducer;
