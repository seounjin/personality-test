import {
  ADD_ITEM,
  DELETE_ITEM,
  APPROVE_ITEM,
  CHANGE_ITEM,
  CHANGE_INPUT,
  SET_RESULT_CONTENT,
  CHANGE_USER_INPUT,
  WRITE_IMG,
  EXCUTE_ITEM,
} from '../_actions/adminAction';
import { InitialState, Action } from '../components/SelectContainer/type';
import selectItemCombine from '../utils/selectItemCombine';

const selectReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { question: '', select_1: '', select_2: '' }],
        isVisible: [...state.isVisible, true],
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.index),
        isVisible: state.isVisible.filter((_, index) => index !== action.index),
      };

    case CHANGE_ITEM: {
      state.items[action.index][action.name] = action.value;
      const tempItems = [...state.items];
      return { ...state, items: tempItems };
    }

    case APPROVE_ITEM: {
      const itemLength = state.items.length;
      const { resultItems, resultContent } = selectItemCombine(
        itemLength,
        state.items,
      );

      return {
        ...state,
        isResultScreen: !state.isResultScreen,
        resultItems: resultItems,
        resultContent: resultContent,
      };
    }

    case CHANGE_INPUT: {
      const isVisible = state.isVisible.map((data, index) =>
        index === action.index ? !data : data,
      );
      return { ...state, isVisible: isVisible };
    }

    case SET_RESULT_CONTENT: {
      state.resultContent[action.index][action.name] = action.value;
      const resultContent = [...state.resultContent];
      return { ...state, resultContent: resultContent };
    }

    case CHANGE_USER_INPUT: {
      return {
        ...state,
        userItem: {
          ...state.userItem,
          [action.name]: action.value,
        },
      };
    }

    case WRITE_IMG:
      return { ...state, imgFile: action.imgFile };

    case EXCUTE_ITEM:
      return {
        ...state,
        isResultScreen: !state.isResultScreen,
        isVisible: state.isVisible.map(() => {
          return false;
        }),
      };

    default:
      return state;
  }
};

export default selectReducer;
