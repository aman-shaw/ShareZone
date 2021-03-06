import axios from 'axios';
import { FETCH_USER } from './types';
// import googleBooksApi from '../apis/googleBooksApi';


export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data });
};

const fetchBooksList = (searchTerm) => {
    return async (dispatch) => {
        console.log('sT:', searchTerm)
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes',
            {
                params: { q: searchTerm }
            }
        )
        dispatch({ type: 'FETCH_BOOKS', payload: response.data.items })
    };
}

const selectBook = (isbn, title) => {
    console.log(isbn, title);
    const config = {
        'Content-Type': 'application/json'
    }
    const body = {
        isbn: isbn,
        name: title
    };
    console.log('body:', body);
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/library/select', body, config);
            dispatch({
                type: 'SELECT_BOOK',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

const myBookList = userID => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/library/getbooks/${userID}`);
            dispatch({
                type: 'MY_BOOKS',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}


// const searchBook = async () => {
//     const booksData = await axios.get(baseURL,
//         {
//             params: { q: searchTerm }
//         }
//     )
//     setBooks(booksData.data.items);
// }

// const selectBook = (isbn, title) => {
//     console.log('select book action creator:', isbn, title)
//     return {
//         type: 'SELECT_BOOK',
//         payload: { isbn: isbn, title: title }
//     }
// };



const searchTerm = (term) => {
    return {
        type: 'SEARCH_TERM',
        payload: term
    }
}

const clearSearchTerm = () => {
    return {
        type: 'CLEAR_SEARCH_TERM',
        payload: ''
    }
}

const getAllBooks = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/library/getAll`);
            dispatch({
                type: 'ALL_BOOKS',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}


const AddBlogPost = (data) => {
    console.log('FROM ACTION CREATOR', data);
    const config = {
        'Content-Type': 'application/json'
    }
    const body = data;
    console.log('body:', body);
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/blog', body, config);
            dispatch({
                type: 'ADD_POST',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}


const FetchBlogPost = () => {
    console.log('FROM FETCH_BLOG_ACTION CREATOR');
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/getblogs');
            dispatch({
                type: 'GET_ALL_POSTS',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}


const fetchMyBlogs = userID => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/getblogs/${userID}`);
            dispatch({
                type: 'MY_BLOGS',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

const deletePost = postID => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/deleteblogs/${postID}`);
            dispatch({
                type: 'DELETE_BLOG',
                payload: postID
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

const fetchSingleBlogs = postID => {
    console.log('postId', postID)
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/getSingleBlog/${postID}`);
            dispatch({
                type: 'SINGLE_BLOG',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

const likeBlog = postID => {
    console.log('LIKES BLOG CALLED', postID);
    return async (dispatch) => {
        try {
            const res = await axios.put(`/api/like/${postID}`);
            console.log('finished');
            console.log(res);
            dispatch({
                type: 'LIKE_POST',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

const addComment = (postID, value) => {
    console.log('FROM addComment action creator', postID, value);
    const config = {
        'Content-Type': 'application/json'
    }
    const body = { value };
    console.log('body:', body);
    return async (dispatch) => {
        try {
            const res = await axios.post(`/api/post/comment/${postID}`, body, config);
            dispatch({
                type: 'ADD_POST',
                payload: res.data
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
}


export {
    fetchBooksList, selectBook, searchTerm,
    clearSearchTerm, myBookList,
    getAllBooks, AddBlogPost, FetchBlogPost, fetchMyBlogs,
    deletePost, fetchSingleBlogs, likeBlog, addComment
}