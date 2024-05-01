import {createSlice} from '@reduxjs/toolkit'

export const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channel: {channelName:'create or join your first server'},
        blogChannelChecked: false,
    },
    reducers: {
        setChannel: (state, action) =>{
            state.channel = action.payload;
        },

        setBlogChannelChecked: (state, action) => {
            state.blogChannelChecked = action.payload;
    },
},
})
export const {setChannel} = channelSlice.actions; 
export const selectChannel = (state) =>state.channel;

export const { setBlogChannelChecked } = channelSlice.actions;

export const selectBlogChannelChecked = (state) => state.channel.blogChannelChecked;


export default channelSlice.reducer;