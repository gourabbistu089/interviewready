import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        blog:null,
        isLoading: true,
    },
    reducers: {
       setBlogs: (state, action) => {
            state.blogs = action.payload;
            state.isLoading = false;
        },
        setBlog: (state, action) => {
            state.blog = action.payload;
            state.isLoading = false;
        },
        toggleLike: (state, action) => {
            let blog = state.blogs.find((blog) => blog._id === action.payload.blog._id);
            blog.likes = action.payload.likes;
            state.isLoading = false;
        },
        addComment: (state, action) => {
            let blog = state.blogs.find((blog) => blog._id === action.payload.blog._id);
            blog.comments = action.payload.comments;
            state.isLoading = false;
        },
    },
})

export const { setBlogs, setBlog, toggleLike, addComment} = blogSlice.actions

export default blogSlice.reducer