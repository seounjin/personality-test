import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { TestsInitialState } from '../types';
import fetcher from '../../api/fetcher';
import {
  MBTI_DATA,
  MBTI_SELECT_COUNT,
  MBTI_TYPE_FORM_ITEMS,
  MIN_NUMBER_OF_ITEMS_COUNT,
  MIN_TYPE_ITEMS_COUNT,
} from '../../features/tests/tests.const';

const initialState: TestsInitialState = {
  mode: 'create',
  title: '',
  subTitle: '',
  explain: '',
  typeFormItems: [
    {
      typeContent: '',
      explanationContent: '',
    },
    {
      typeContent: '',
      explanationContent: '',
    },
  ],
  selectFormItems: [],
  typeDictionary: {},
  typeItemsCount: MIN_TYPE_ITEMS_COUNT,
  numberOfItemsCount: MIN_NUMBER_OF_ITEMS_COUNT,
  isPublic: true,
  testType: '',
  isSelectedTest: false,
  mbtiTypeFormItems: MBTI_TYPE_FORM_ITEMS,
  mbtiSelectFormItems: [],
};

interface FetchParms {
  cardId: string | string[];
  cookie: string;
}
export const fetchTestsData = createAsyncThunk(
  'tests/fetchTestsDataStatus',
  async (
    { cardId, cookie }: FetchParms,
    { rejectWithValue, getState, requestId },
  ) => {
    try {
      const res = await fetcher('get', `/tests/${cardId}/edit`, {
        headers: {
          Cookie: cookie,
        },
      });
      if (res) {
        const { status } = res;
        if (status) {
          throw new Error(status);
        }
      }

      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    reSetTestsData: () => initialState,
    setMode: (state, action) => {
      state.mode = action.payload.mode;
    },
    setBasicInformationForm: (state, action) => {
      state.title = action.payload.title;
      state.subTitle = action.payload.subTitle;
      state.explain = action.payload.explain;
    },
    setTypeFormItems: (state, action) => {
      state.typeFormItems = action.payload.typeFormItems.map((data) => ({
        ...data,
      }));
    },
    setMbtiTypeFormItems: (state, action) => {
      state.mbtiTypeFormItems = action.payload.mbtiTypeFormItems.map(
        (data) => ({
          ...data,
        }),
      );
    },
    setSelctFormItems: (state, action) => {
      const weightedScoreItems = action.payload.typeFormItems.map(
        ({ typeContent }) => ({
          typeContent: typeContent,
          score: 0,
        }),
      );
      state.selectFormItems = [
        {
          question: '',
          optionItems: [
            { option: '', weightedScoreItems: weightedScoreItems },
            { option: '', weightedScoreItems: weightedScoreItems },
          ],
        },
      ];
    },
    setTypeDictionary: (state, action) => {
      state.typeDictionary = action.payload.typeFormItems.reduce(
        (dic, { typeContent }) => ({ ...dic, [typeContent]: 0 }),
        {},
      );
    },
    setTypeItemsCount: (state, action) => {
      state.typeItemsCount += action.payload.count;
    },
    handleChangeTypeDictionary: (state, action) => {
      const type = action.payload.type;
      const count = action.payload.count;
      state.typeDictionary[type] += count;
    },
    setNumberOfItemsCount: (state, action) => {
      state.numberOfItemsCount += action.payload.count;
    },
    setSelectFormItems: (state, action) => {
      state.selectFormItems = action.payload.selectFormItems;
    },
    setPersonalityTestItems: (state, action) => {
      state.title = action.payload.title;
      state.subTitle = action.payload.subTitle;
      state.explain = action.payload.explain;
      state.typeFormItems = action.payload.typeFormItems;
      state.selectFormItems = action.payload.selectFormItems;
      state.isPublic = action.payload.isPublic;
    },
    setScoreTypeTestItems: (state, action) => {
      const {
        basicInformationItems: { title, subTitle, explain },
        selectItems,
        resultItems,
        isPublic,
        testType,
      } = action.payload.data;

      state.title = title;
      state.subTitle = subTitle;
      state.explain = explain;
      state.typeFormItems = resultItems;
      state.selectFormItems = selectItems;
      state.isPublic = isPublic;
      state.testType = testType;
    },
    setMbtiTypeTestItems: (state, action) => {
      const {
        basicInformationItems: { title, subTitle, explain },
        selectItems,
        resultItems,
        isPublic,
        testType,
      } = action.payload.data;

      state.title = title;
      state.subTitle = subTitle;
      state.explain = explain;
      state.mbtiTypeFormItems = resultItems;
      state.mbtiSelectFormItems = selectItems;
      state.isPublic = isPublic;
      state.testType = testType;
    },
    setTestType: (state, action) => {
      state.testType = action.payload.testType;
    },
    setIsSelectedTest: (state, action) => {
      state.isSelectedTest = action.payload.isSelectedTest;
    },
    setMbtiSelctFormItems: (state) => {
      const weightedScoreItems = (array, score) =>
        array.map((item, index) => ({
          typeContent: item,
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

      state.mbtiSelectFormItems = Array(MBTI_SELECT_COUNT)
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

    setFinalMbtiSelctFormItems: (state, action) => {
      state.mbtiSelectFormItems = action.payload.mbtiSelectFormItems;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTestsData.fulfilled, (state, action) => {
      // const { userItem, items, imgUrl } = action.payload;
      // state.userItem = state.userItem.map((data) => {
      //   return { ...data, defaultValue: userItem[data.type] };
      // });
      // state.selectItems = items;
      // state.imgUrl = imgUrl;
    });
  },
});

export const {
  setMode,
  reSetTestsData,
  setBasicInformationForm,
  setTypeFormItems,
  setSelctFormItems,
  setTypeDictionary,
  handleChangeTypeDictionary,
  setTypeItemsCount,
  setNumberOfItemsCount,
  setSelectFormItems,
  setPersonalityTestItems,
  setTestType,
  setIsSelectedTest,
  setMbtiSelctFormItems,
  setFinalMbtiSelctFormItems,
  setScoreTypeTestItems,
  setMbtiTypeTestItems,
  setMbtiTypeFormItems,
} = testsSlice.actions;
export default testsSlice.reducer;