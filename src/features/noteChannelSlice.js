// features/noteChannelSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const noteChannelSlice = createSlice({
  name: 'noteChannel',
  initialState: {
    notes: [], // Initial state for notes/blog channel
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = noteChannelSlice.actions;

export const selectNotes = state => state.noteChannel.notes;

export default noteChannelSlice.reducer;
