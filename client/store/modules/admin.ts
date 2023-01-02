import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { AdminInitialState } from '../types';
import fetcher from '../../api/fetcher';

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
      const weightCheckboxes = action.payload.typeFormItems.map(
        ({ typeContent }) => ({
          isChecked: false,
          value: typeContent,
        }),
      );
      state.selectFormItems = [
        {
          question: '',
          optionItems: [
            { option: '', weightCheckboxes: weightCheckboxes },
            { option: '', weightCheckboxes: weightCheckboxes },
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
} = adminSlice.actions;
export default adminSlice.reducer;
