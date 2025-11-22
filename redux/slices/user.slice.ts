
import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { User } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {Setting} from '@/redux/slices/settings.slice';

export interface UserState {
  isAuthenticated: boolean
  userId: string | null
  email: string | null
  name: string | null
  verified: string | null
  loading: boolean
  isAdmin: boolean
}

const initialState: UserState = {
  isAuthenticated: false,
  userId: null,
  email: null,
  name: null,
  verified: null,
  isAdmin: false,
  loading: false
};

export const useCurrentUser: any = () => useSelector((state: RootState) => state.currentUser);

export const checkUserSession = createAsyncThunk('users/checkUserSession', async (user: User | null) => {
  try {
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem('userToken', token);

      const currentUser = await api.get('/users/current');
      return currentUser;
    } else {
      return null
    }

  } catch (err) {
    console.log(err);
  }
})

export const getCurrentUser = createAsyncThunk('users/getCurrentUser', async () => {
    try {
        console.log('get user')
        const user: User[] = await api.get('/users/current');
        return user;
    } catch (err) {
        console.log(err);
    }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // clearUser: (state) => {
    //   state.id = null;
    //   state.email = null;
    //   state.name = null;
    //   state.isAuthenticated = false;
    // },
    // updateUserName: (state, action: PayloadAction<string>) => {
    //   state.name = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserSession.fulfilled, (state: UserState, action: any) => {
        state.isAuthenticated = true
        state.userId = action.payload.userId
        state.email = action.payload.email
        state.name = action.payload.name
        state.verified = action.payload.verified
        state.isAdmin = action.payload.isAdmin
        state.loading = false
      })
      .addCase(getCurrentUser.fulfilled, (state: UserState, action: any) => {
        state.isAuthenticated = true
        state.userId = action.payload.userId
        state.email = action.payload.email
        state.name = action.payload.name
        state.verified = action.payload.verified
        state.isAdmin = action.payload.isAdmin
        state.loading = false
      })
  }
});

// export const { clearUser, updateUserName } = userSlice.actions;
export const { } = userSlice.actions;
export default userSlice.reducer;
