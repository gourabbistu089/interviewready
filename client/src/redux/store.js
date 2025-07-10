
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import topicReducer from './features/topicSlice';

const store = configureStore({
  reducer: {
    auth : authReducer,
    topics: topicReducer,
    
  },
});
export default store;