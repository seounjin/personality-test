import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../components/CardList/CardList.type';

interface CommonState {
  cards: Card[];
  user: string;
}

const initialState: CommonState = {
  cards: [],
  user: '',
};

export const myPageSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCards: (state: CommonState, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    setUser: (state: CommonState, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const { setCards, setUser } = myPageSlice.actions;
export default myPageSlice.reducer;
