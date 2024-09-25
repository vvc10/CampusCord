import { createSlice } from '@reduxjs/toolkit';

export const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channel: {
            channelName: '',
            channelType: '' 
        }
    },
    reducers: {
        setChannel: (state, action) => {
            state.channel = action.payload;
        }
    }
});

export const { setChannel } = channelSlice.actions;

export const selectChannel = (state) => state.channel;


export default channelSlice.reducer;
