import { createSlice } from '@reduxjs/toolkit';

export const channelTypeSlice = createSlice({
    name: 'channelType',
    initialState: {
        channelType: '',
        currentChannel: null,
        currentServer: null,
    },
    reducers: {
        setChannelType: (state, action) => {
            state.channelType = action.payload.channelType;
            state.currentChannel = action.payload.currentChannel;
            state.currentServer = action.payload.currentServer;
        },
    },
});

export const { setChannelType } = channelTypeSlice.actions;

export const selectChannelType = (state) => state.channelType.channelType;
export const selectCurrentChannel = (state) => state.channelType.currentChannel;
export const selectCurrentServer = (state) => state.channelType.currentServer;

export default channelTypeSlice.reducer;
