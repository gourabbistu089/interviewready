import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topics: [],
};

const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setTopics(state, action) {
      state.topics = action.payload;
    },
  },
});

export const { setTopics } = topicSlice.actions;
export default topicSlice.reducer;