import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (
      state: InitialState,
      action: PayloadAction<{ isLoading: boolean }>,
    ) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
