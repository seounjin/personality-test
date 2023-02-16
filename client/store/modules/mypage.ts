import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../components/CardList/CardList.type';

interface CommonState {
  currentPanel: number;
  cards: Card[];
}

const initialState: CommonState = {
  currentPanel: 0,
  cards: [],
};

export const myPageSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCurrentPanel: (state: CommonState, action: PayloadAction<number>) => {
      state.currentPanel = action.payload;
    },
    setCards: (state: CommonState, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
  },
});

export const { setCurrentPanel, setCards } = myPageSlice.actions;
export default myPageSlice.reducer;
