import { createReducer } from '@reduxjs/toolkit';
import { fetchComment, addComment, updateComment, deleteComment } from '../actions/CommentAction';

export default createReducer([], {
    [fetchComment]: (state, action) => {
        return action.payload;
    },
    [addComment]: (state, action) => {
        return state.push({ ...action });
    },
    [updateComment]: (state, action) => {

    },
    [deleteComment]: (state, action) => {
        
    }
});