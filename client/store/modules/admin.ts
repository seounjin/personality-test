import { createSlice } from '@reduxjs/toolkit';
import selectItemCombine from '../../utils/selectItemCombine';
import { AdminInitialState } from '../types';

const initialState: AdminInitialState = {
  userItem: {
    title: '',
    id: '',
    password: '',
  },
  items: [
    { question: '', select_1: '', select_2: '' },
    { question: '', select_1: '', select_2: '' },
    { question: '', select_1: '', select_2: '' },
  ],
  isVisible: [true, true, true],
  isResultScreen: false,
  resultItems: [],
  resultContent: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reduxHandleUser: (state, action) => {
      state.userItem = {
        ...state.userItem,
        [action.payload.name]: action.payload.value,
      };
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
});
export const {
  handlerSelectInput,
  transSelectItem,
  deleteSelectItem,
  reduxHandleUser,
  addSelectItem,
  approveSelectItem,
  setResultContent,
  excuteResultItem,
} = adminSlice.actions;
export default adminSlice.reducer;
