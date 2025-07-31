
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import topicReducer from './features/topicSlice';
import blogReducer from './features/blogSlice';

const store = configureStore({
  reducer: {
    auth : authReducer,
    topics: topicReducer,
    blogs: blogReducer,
    
  },
});
export default store;