import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
    books: [],
    cart: [],
};

export const dataSlice = createSlice({
    name: "Data store",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : " light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setBooks: (state, action) => {
            state.books = action.payload.books;
        },
        setAddtoCart: (state, action) => {
            state.cart = action.payload.cart;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setSavePosts: (state, action) => {
            if (state.user) {
                state.user.saveposts = action.payload.saveposts;
            }
        },
        setUpdatePost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post
                }
                return post;
            })
            state.posts = updatedPost;
        }
    }
});

export const { setMode, setLogin, setLogout,
    setPosts, setSavePosts, setUser,
    setUpdatePost, setBooks, setAddtoCart } = dataSlice.actions;

export default dataSlice.reducer;