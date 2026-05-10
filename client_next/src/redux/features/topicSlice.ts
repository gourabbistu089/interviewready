import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TopicState, Topic } from '@/types';

const initialState: TopicState = {
  topics: [],
};

const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setTopics(state, action: PayloadAction<Topic[]>) {
      state.topics = action.payload;
    },
  },
});

export const { setTopics } = topicSlice.actions;
export default topicSlice.reducer;
