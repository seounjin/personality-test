import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import selectItemCombine from '../../utils/selectItemCombine';
import { AdminInitialState } from '../types';
import fetcher from '../../api/fetcher';

const initialState: AdminInitialState = {
  userItem: [
    { label: '제목', input: 'title', defaultValue: '' },
    { label: '아이디', input: 'id', defaultValue: '' },
    { label: '비밀번호', input: 'password', defaultValue: '' },
  ],
  items: [
    { question: '', select_1: '', select_2: '' },
    { question: '', select_1: '', select_2: '' },
    { question: '', select_1: '', select_2: '' },
  ],
  isVisible: [true, true, true],
  isResultScreen: false,
  resultItems: [],
  resultContent: [],
  imgUrl: '',
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

    handleUser: (state, action) => {
      const { index, name, value } = action.payload;
      console.log('state', name, value);
      state.userItem[index] = { ...state.userItem[index], defaultValue: value };
    },

    handlerSelectInput: (state, action) => {
      const { index, name, value } = action.payload;
      state.items[index][name] = value;
    },

    transSelectItem: (state, action) => {
      state.isVisible = state.isVisible.map((data, index) =>
        index === action.payload.index ? !data : data,
      );
    },

    deleteSelectItem: (state, action) => {
      state.items = state.items.filter(
        (_, index) => index !== action.payload.index,
      );
      state.isVisible = state.isVisible.filter(
        (_, index) => index !== action.payload.index,
      );
    },

    addSelectItem: (state) => {
      state.items = [
        ...state.items,
        { question: '', select_1: '', select_2: '' },
      ];
      state.isVisible = [...state.isVisible, true];
    },
    approveSelectItem: (state) => {
      const itemLength = state.items.length;
      const { resultItems, resultContent } = selectItemCombine(
        itemLength,
        state.items,
      );
      state.isResultScreen = !state.isResultScreen;
      state.resultItems = resultItems;
      state.resultContent = resultContent;
    },

    setResultContent: (state, action) => {
      const { index, name, value } = action.payload;
      state.resultContent[index][name] = value;
    },

    excuteResultItem: (state) => {
      state.isResultScreen = !state.isResultScreen;
      state.isVisible = state.isVisible.map(() => {
        return false;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminData.fulfilled, (state, action) => {
      const { userItem, items, imgUrl, resultContent } = action.payload;
      const { resultItems } = selectItemCombine(items.length, items);
      state.userItem = state.userItem.map((data, index) => {
        return { ...data, defaultValue: userItem[data.input] };
      });

      state.items = items;
      state.resultContent = resultContent;
      state.imgUrl = imgUrl;
      state.isResultScreen = true;
      state.resultItems = resultItems;

      state.isVisible = [...Array(items.length)].map(() => {
        return false;
      });
    });
  },
});

export const {
  reSetAdminData,
  handlerSelectInput,
  transSelectItem,
  deleteSelectItem,
  handleUser,
  addSelectItem,
  approveSelectItem,
  setResultContent,
  excuteResultItem,
} = adminSlice.actions;
export default adminSlice.reducer;
