import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  isAuth: boolean;
  userId: string;
}

const initialState: CommonState = {
  isAuth: false,
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (
      state: CommonState,
      action: PayloadAction<{ isAuth: boolean; userId: string }>,
    ) => {
      state.isAuth = action.payload.isAuth;
      state.userId = action.payload.userId;
    },
  },
});

export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
