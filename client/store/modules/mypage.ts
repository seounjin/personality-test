import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../components/CardList/CardList.type';

interface CommonState {
  cards: Card[];
}

const initialState: CommonState = {
  cards: [],
};

export const myPageSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCards: (state: CommonState, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = myPageSlice.actions;
export default myPageSlice.reducer;
