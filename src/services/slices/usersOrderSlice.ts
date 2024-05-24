import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../../src/utils/burger-api';
import { TOrder } from '@utils-types';

export type TFeedSliceState = {
  userOrders: TOrder[];
  userOrdersIsLoading: boolean;
  error: string | undefined;
};

export const initialState: TFeedSliceState = {
  userOrders: [],
  userOrdersIsLoading: false,
  error: undefined
};

export const fetchUserOrdersApi = createAsyncThunk(
  'userOrders/fetchUserOrdersApi',
  getOrdersApi
);

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrdersIsLoading: (state) => state.userOrdersIsLoading,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrdersApi.pending, (state) => {
        state.userOrdersIsLoading = true;
      })
      .addCase(fetchUserOrdersApi.rejected, (state, action) => {
        state.userOrdersIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserOrdersApi.fulfilled, (state, action) => {
        state.userOrdersIsLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { selectUserOrders } = userOrdersSlice.selectors;
export const userOrderReducer = userOrdersSlice.reducer;
