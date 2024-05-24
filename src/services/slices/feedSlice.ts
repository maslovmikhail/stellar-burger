import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../../src/utils/burger-api';
import { TOrder } from '@utils-types';

export type TFeedSliceState = {
  feeds: TOrder[];
  feedIsLoading: boolean;
  total: number;
  totalToday: number;
  error: string | undefined;
};

export const initialState: TFeedSliceState = {
  feeds: [],
  feedIsLoading: false,
  total: 0,
  totalToday: 0,
  error: undefined
};

export const fetchFeedsApi = createAsyncThunk(
  'feed/fetchFeedsApi',
  getFeedsApi
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedIsLoading: (state) => state.feedIsLoading,
    selectFeeds: (state) => state.feeds,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeedsApi.pending, (state) => {
        state.feedIsLoading = true;
      })
      .addCase(fetchFeedsApi.rejected, (state, action) => {
        state.feedIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeedsApi.fulfilled, (state, action) => {
        state.feedIsLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  selectFeedIsLoading,
  selectFeeds,
  selectTotal,
  selectTotalToday
} = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
