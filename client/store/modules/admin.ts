import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { AdminInitialState } from '../types';
import fetcher from '../../api/fetcher';
import { MIN_TYPE_ITEMS_COUNT } from '../../features/admin/admin.const';

const initialState: AdminInitialState = {
  title: '',
  explain: '',
  typeFormItems: [
    {
      typeContent: '',
      explanationContent: '',
    },
  ],
  selectFormItems: [],
  typeDictionary: {},
  typeItemsCount: MIN_TYPE_ITEMS_COUNT,
};

interface FetchParms {
  cardId: string | string[];
  cookie: string;
}
export const fetchAdminData = createAsyncThunk(
  'admin/fetchAdminDataStatus',
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

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reSetAdminData: () => initialState,
    setTitleFormItems: (state, action) => {
      state.title = action.payload.title;
      state.explain = action.payload.explain;
    },
    setTypeFormItems: (state, action) => {
      state.typeFormItems = action.payload.typeFormItems.map((data) => ({
        ...data,
      }));
    },
    setSelctFormItems: (state, action) => {
      const weightedScoreItems = action.payload.typeFormItems.map(
        ({ typeContent }) => ({
          type: typeContent,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminData.fulfilled, (state, action) => {
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
  reSetAdminData,
  setTitleFormItems,
  setTypeFormItems,
  setSelctFormItems,
  setTypeDictionary,
  handleChangeTypeDictionary,
  setTypeItemsCount,
} = adminSlice.actions;
export default adminSlice.reducer;
