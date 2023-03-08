import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  selectCard: string;
  selectAction: string;
  isAuth: boolean;
}

const initialState: CommonState = {
  selectCard: '',
  selectAction: '',
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
    setIsAuth: (state: CommonState, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setSelectCard, setSelectAction, setIsAuth } = homeSlice.actions;
export default homeSlice.reducer;
