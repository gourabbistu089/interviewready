import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import topicReducer from './features/topicSlice';
import blogReducer from './features/blogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicReducer,
    blogs: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
