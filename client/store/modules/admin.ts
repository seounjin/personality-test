import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { AdminInitialState } from '../types';
import fetcher from '../../api/fetcher';
import {
  createResultContents,
  createResultItems,
} from '../../features/admin/admin.utils';

const initialState: AdminInitialState = {
  userItem: [
    { label: '제목', type: 'title', defaultValue: '' },
    { label: '아이디', type: 'id', defaultValue: '' },
    { label: '비밀번호', type: 'password', defaultValue: '' },
  ],
  selectItems: [
    { question: '', select_1: '', select_2: '' },
    { question: '', select_1: '', select_2: '' },
    { question: '', select_1: '', select_2: '' },
  ],
  selectItemsVisible: [false, false, false],
  isResultScreen: false,
  resultItems: [],
  resultContents: [],
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
      state.userItem[index] = { ...state.userItem[index], defaultValue: value };
    },

    handlerSelectInput: (state, action) => {
      const { index, name, value } = action.payload;
      state.selectItems[index][name] = value;
    },

    setSelectItemVisble: (state, action) => {
      state.selectItemsVisible[action.payload.index] =
        !state.selectItemsVisible[action.payload.index];
    },

    deleteSelectItem: (state, action) => {
      state.selectItems = state.selectItems.filter(
        (_, index) => index !== action.payload.index,
      );
      state.selectItemsVisible = state.selectItemsVisible.filter(
        (_, index) => index !== action.payload.index,
      );
    },

    addSelectItem: (state) => {
      state.selectItems = [
        ...state.selectItems,
        { question: '', select_1: '', select_2: '' },
      ];
      state.selectItemsVisible = [...state.selectItemsVisible, false];
    },
    approveSelectItem: (state) => {
      const itemLength = state.selectItems.length;
      const resultItems = createResultItems(state.selectItems, itemLength);
      const resultContents = createResultContents(itemLength);

      state.isResultScreen = !state.isResultScreen;
      state.resultItems = resultItems;
      state.resultContents = resultContents;
    },

    setResultContent: (state, action) => {
      const { index, name, value } = action.payload;
      state.resultContents[index][name] = value;
    },

    excuteResultItem: (state) => {
      state.isResultScreen = !state.isResultScreen;
      state.selectItemsVisible = state.selectItemsVisible.map(() => {
        return false;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminData.fulfilled, (state, action) => {
      const { userItem, items, imgUrl, resultContents } = action.payload;
      const resultItems = createResultItems(items.length, items);
      state.userItem = state.userItem.map((data, index) => {
        return { ...data, defaultValue: userItem[data.type] };
      });

      state.selectItems = items;
      state.resultContents = resultContents;
      state.imgUrl = imgUrl;
      state.isResultScreen = true;
      state.resultItems = resultItems;

      state.selectItemsVisible = [...Array(items.length)].map(() => {
        return false;
      });
    });
  },
});

export const {
  reSetAdminData,
  handlerSelectInput,
  setSelectItemVisble,
  deleteSelectItem,
  handleUser,
  addSelectItem,
  approveSelectItem,
  setResultContent,
  excuteResultItem,
} = adminSlice.actions;
export default adminSlice.reducer;
