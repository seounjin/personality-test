import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { AdminInitialState } from '../types';
import fetcher from '../../api/fetcher';
import {
  createResultContents,
  createResultItems,
} from '../../features/admin/admin.utils';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MIN_OPTION_ITEMS_COUNT,
} from '../../features/admin/admin.const';

const initialState: AdminInitialState = {
  userItem: [
    { label: '아이디', type: 'id', defaultValue: '' },
    { label: '비밀번호', type: 'password', defaultValue: '' },
  ],
  titleItems: [
    { label: '제목', type: 'title', defaultValue: '' },
    { label: '설명', type: 'explain', defaultValue: '' },
  ],
  typeItems: [
    {
      firstLabel: '유형',
      firstContent: '',
      secondLabel: '설명',
      secondContent: '',
    },
  ],
  selectItems: [],
  isResultScreen: false,
  resultItems: [],
  resultContents: [],
  optionItemsCount: MIN_OPTION_ITEMS_COUNT,
  numberOfItemsCount: MIN_NUMBER_OF_ITEMS_COUNT,
  imgUrl: 'imageholder.png',
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
      const { index, value } = action.payload;
      state.userItem[index] = { ...state.userItem[index], defaultValue: value };
    },
    handleTitle: (state, action) => {
      const { index, value } = action.payload;
      state.titleItems[index] = {
        ...state.titleItems[index],
        defaultValue: value,
      };
    },
    handlerSelectInput: (state, action) => {
      const { index, optionIndex, name, value } = action.payload;
      if (name === 'question') {
        state.selectItems[index][name] = value;
      } else {
        const optionItems = state.selectItems[index]['optionItems'];
        optionItems[optionIndex]['option'] = value;
      }
    },

    createSelectItems: (state) => {
      const numberOfItemsCount = state.numberOfItemsCount;
      const optionItemsCount = state.optionItemsCount;
      state.selectItems = new Array(numberOfItemsCount).fill(0).map(() => ({
        type: 'question',
        label: '질문',
        question: '',
        optionItems: new Array(optionItemsCount).fill(0).map((_, index) => ({
          type: `select_${index + 1}`,
          label: `${index + 1}번 선택지`,
          option: '',
        })),
      }));
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
    },
    setImageUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
    addTypeItems: (state) => {
      state.typeItems = [
        ...state.typeItems,
        {
          firstLabel: '유형',
          firstContent: '',
          secondLabel: '설명',
          secondContent: '',
        },
      ];
    },
    removeTypeItems: (state) => {
      const copyTypeItems = [...state.typeItems];
      copyTypeItems.pop();
      state.typeItems = copyTypeItems;
    },
    setTypeItems: (state, action) => {
      const { index, name, value } = action.payload;
      state.typeItems[index][name] = value;
    },
    setOptionCount: (state, action) => {
      state.optionItemsCount += action.payload.count;
    },
    setNumberOfItemsCount: (state, action) => {
      state.numberOfItemsCount += action.payload.count;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminData.fulfilled, (state, action) => {
      const { userItem, items, imgUrl, resultContents } = action.payload;
      const resultItems = createResultItems(items.length, items);
      state.userItem = state.userItem.map((data) => {
        return { ...data, defaultValue: userItem[data.type] };
      });

      state.selectItems = items;
      state.resultContents = resultContents;
      state.imgUrl = imgUrl;
      state.isResultScreen = true;
      state.resultItems = resultItems;
    });
  },
});

export const {
  reSetAdminData,
  handlerSelectInput,
  handleUser,
  handleTitle,
  createSelectItems,
  approveSelectItem,
  setResultContent,
  excuteResultItem,
  setImageUrl,
  addTypeItems,
  removeTypeItems,
  setTypeItems,
  setOptionCount,
  setNumberOfItemsCount,
} = adminSlice.actions;
export default adminSlice.reducer;
