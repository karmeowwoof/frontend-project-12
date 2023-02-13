/* eslint-disable no-param-reassign */

import axios from 'axios';
import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { getAuthHeader } from '../utils/index.js';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();
const defaultChannelId = 1;
const initialState = {
  ...channelsAdapter.getInitialState(),
  currentChannelId: defaultChannelId,
  isFetching: false,
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload.id);
      if (action.payload.id === state.currentChannelId) {
        state.currentChannelId = defaultChannelId;
      }
    },
    changeChannelName: channelsAdapter.updateOne,
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.isFetching = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error;
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export { fetchData };
