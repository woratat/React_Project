import { createReducer } from '@reduxjs/toolkit';
import { fetchComment, addComment, updateComment, deleteComment } from '../actions/CommentAction';

export default createReducer([], {
    [fetchComment]: (state, action) => {
        return action.payload;
    },
    [addComment]: (state, action) => {
        state.push({ ...action.payload });
    },
    [updateComment]: (state, action) => {

    },
    [deleteComment]: (state, action) => {
        const index = state.findIndex((value) => {
            
        });
    }
});