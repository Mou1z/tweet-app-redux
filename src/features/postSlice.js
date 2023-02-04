import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        authors: []
    },
    reducers: {
        addPost: (state, action) => {
            let payload = action.payload;
            state.posts.push({
                id: state.posts.length,
                author: payload.author,
                text: payload.text
            });
            if(!state.authors.includes(payload.author)) {
                state.authors.push(payload.author);
            }
        }
    }
});

export const { addPost } = postSlice.actions;

export const getPosts = (state) => state.post.posts;

export const getPostsLength = (state) => state.post.posts.length;
export const getAuthorsLength = (state) => state.post.authors.length;

export const getPostsByAuthor = postAuthor => state => {
    return state.post.posts.filter(({ author }) => postAuthor === author).length;
};

export default postSlice.reducer;