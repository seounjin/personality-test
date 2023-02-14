import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  selectCard: string;
  selectAction: string;
  isOpenModal: boolean;
  isAuth: boolean;
}

const initialState: CommonState = {
  selectCard: '',
  selectAction: '',
  isOpenModal: false,
  isAuth: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSelectCard: (state: CommonState, action: PayloadAction<string>) => {
      state.selectCard = action.payload;
    },
    setSelectAction: (state: CommonState, action: PayloadAction<string>) => {
      state.selectAction = action.payload;
    },
    setIsOpenModal: (state: CommonState, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setIsAuth: (state: CommonState, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setSelectCard, setSelectAction, setIsOpenModal, setIsAuth } =
  homeSlice.actions;
export default homeSlice.reducer;
