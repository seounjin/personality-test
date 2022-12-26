import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { AdminInitialState } from '../types';
import fetcher from '../../api/fetcher';

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
      labelType: '유형',
      typeContent: '',
      labelExplanation: '설명',
      explanationContent: '',
    },
  ],
  selectItems: [
    {
      type: 'question',
      label: '질문',
      question: '',
      optionItems: [{ type: 'select_1', label: '1번선택지', option: '' }],
    },
  ],
  typeDictionary: {},
  typeList: [],
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

    setImageUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
    addTypeItems: (state) => {
      state.typeItems = [
        ...state.typeItems,
        {
          labelType: '유형',
          typeContent: '',
          labelExplanation: '설명',
          explanationContent: '',
        },
      ];
    },
    removeTypeItems: (state) => {
      const copyTypeItems = [...state.typeItems];
      copyTypeItems.pop();
      state.typeItems = copyTypeItems;
    },
    setTypeItems: (state, action) => {
      const { index, key, value } = action.payload;
      state.typeItems[index][key] = value;
    },

    addNumberOfItems: (state, action) => {
      const optionItemsCount = action.payload.optionItemsCount;

      state.selectItems = [
        ...state.selectItems,
        {
          type: 'question',
          label: '질문',
          question: '',
          optionItems: new Array(optionItemsCount).fill(0).map((_, index) => ({
            type: `select_${index + 1}`,
            label: `${index + 1}번 선택지`,
            option: '',
          })),
        },
      ];
    },
    removeNumberOfItems: (state) => {
      const copyNumberOfItems = [...state.selectItems];
      copyNumberOfItems.pop();
      state.selectItems = copyNumberOfItems;
    },

    addOptionItems: (state, action) => {
      const optionItemsCount = action.payload.optionItemsCount;
      state.selectItems = state.selectItems.map((data) => {
        return {
          ...data,
          optionItems: [
            ...data.optionItems,
            {
              type: `select_${optionItemsCount}`,
              label: `${optionItemsCount}번선택지`,
              option: '',
            },
          ],
        };
      });
    },
    removeOptionItems: (state) => {
      state.selectItems = state.selectItems.map((data) => {
        const copyOptionItems = data.optionItems;
        copyOptionItems.pop();
        return {
          ...data,
          optionItems: [...copyOptionItems],
        };
      });
    },
    setTypeItemList: (state) => {
      state.typeList = state.typeItems.map(({ typeContent }) => typeContent);
    },
    setTypeItemsDictionary: (state, action) => {
      state.typeDictionary = action.payload.typeFormItems.reduce(
        (dic, type) => ({ ...dic, [type]: 0 }),
        {},
      );
    },
    setTypeItemsCount: (state, action) => {
      const key = action.payload.key;
      const count = action.payload.count;
      state.typeDictionary[key] += count;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminData.fulfilled, (state, action) => {
      const { userItem, items, imgUrl } = action.payload;
      state.userItem = state.userItem.map((data) => {
        return { ...data, defaultValue: userItem[data.type] };
      });

      state.selectItems = items;
      state.imgUrl = imgUrl;
    });
  },
});

export const {
  reSetAdminData,
  handlerSelectInput,
  handleUser,
  handleTitle,
  setImageUrl,
  addTypeItems,
  removeTypeItems,
  setTypeItems,
  addNumberOfItems,
  removeNumberOfItems,
  addOptionItems,
  removeOptionItems,
  setTypeItemList,
  setTypeItemsDictionary,
  setTypeItemsCount,
} = adminSlice.actions;
export default adminSlice.reducer;
