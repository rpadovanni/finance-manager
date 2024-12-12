import { createSlice } from '@reduxjs/toolkit';
import { userMock } from '@/utils/user.mock';

const userSlice = createSlice({
  name: 'user',
  initialState: userMock,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
