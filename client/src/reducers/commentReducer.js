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
        const comment_index = state.findIndex((value) => {
            return value.comment_id === parseInt(action.payload.comment_id);
        });

        state[comment_index].message = action.payload.message;
    },
    [deleteComment]: (state, action) => {
        const index = state.findIndex((value) => {
            return value.comment_id === parseInt(action.payload.comment_id);
        });

        state.splice(index, 1);
    }
});