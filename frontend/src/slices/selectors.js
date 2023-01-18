/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';
import { selectors as channelsSelectors } from './channelsSlice.js';
import { selectors as messagesSelectors } from './messagesSlice.js';

export const getAllChannels = (state) => channelsSelectors.selectAll(state);

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getCurrentChannel = createSelector(
  (state) => state.channels.entities,
  getCurrentChannelId,
  (channels, currentChannelId) => channels[currentChannelId],
);

export const isDataFetching = (state) => state.channels.isFetching;

export const getAllMessages = (state) => messagesSelectors.selectAll(state);

export const getModalType = (state) => state.modals.modalType;

export const getItemId = (state) => state.modals.itemId;
