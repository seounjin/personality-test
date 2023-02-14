import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  currentPanel: number;
}

const initialState: CommonState = {
  currentPanel: 0,
};

export const myPageSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCurrentPanel: (state: CommonState, action: PayloadAction<number>) => {
      state.currentPanel = action.payload;
    },
  },
});

export const { setCurrentPanel } = myPageSlice.actions;
export default myPageSlice.reducer;
