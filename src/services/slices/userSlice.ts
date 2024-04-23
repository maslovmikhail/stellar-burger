import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const fetchRegisterUser = createAsyncThunk(
  'register/fetchRegisterUser',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const fetchLoginUser = createAsyncThunk(
  'login/fetchLoginUser',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', getUserApi);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchLogout = createAsyncThunk('logout/fetchLogout', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

type TAuthState = {
  isAuthenticated: boolean;
  data: TUser;
  error: string | undefined;
  loginUserRequest: boolean;
};

const initialState: TAuthState = {
  isAuthenticated: false,
  data: {
    name: '',
    email: ''
  },
  error: undefined,
  loginUserRequest: false
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.error = '';
    }
  },
  selectors: {
    selectUser: (state) => state.data,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectError: (state) => state.error,
    selectloginRequest: (state) => state.loginUserRequest
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data.email = action.payload.user.email;
        state.data.name = action.payload.user.name;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data.email = action.payload.user.email;
        state.data.name = action.payload.user.name;
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isAuthenticated = false;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loginUserRequest = true;
        state.error = action.error.message;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error = action.error.message;
        state.loginUserRequest = true;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.data = {
          email: '',
          name: ''
        };
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      });
  }
});

export const { clearErrorMessage } = userSlice.actions;
export const { selectUser, selectError, selectIsAuthenticated } =
  userSlice.selectors;
export const userReducer = userSlice.reducer;
