import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'John Doe',
    age: 30,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
  },
});

export const { setName, setAge } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
