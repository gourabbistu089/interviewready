import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BlogState, Blog } from '@/types';

const initialState: BlogState = {
  blogs: [],
  blog: null,
  isLoading: true,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
      state.isLoading = false;
    },
    setBlog(state, action: PayloadAction<Blog | null>) {
      state.blog = action.payload;
      state.isLoading = false;
    },
    toggleLike(state, action: PayloadAction<{ blog: Blog; likes: Blog['likes'] }>) {
      const blog = state.blogs.find((b) => b._id === action.payload.blog._id);
      if (blog) {
        blog.likes = action.payload.likes;
      }
      state.isLoading = false;
    },
    addComment(state, action: PayloadAction<{ blog: Blog; comments: Blog['comments'] }>) {
      const blog = state.blogs.find((b) => b._id === action.payload.blog._id);
      if (blog) {
        blog.comments = action.payload.comments;
      }
      state.isLoading = false;
    },
  },
});

export const { setBlogs, setBlog, toggleLike, addComment } = blogSlice.actions;
export default blogSlice.reducer;
