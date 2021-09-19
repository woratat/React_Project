import { createReducer } from '@reduxjs/toolkit';
import { fetchUser, deleteUser } from '../actions/userAction';


export default createReducer([], {
    [fetchUser]: (state, action) => {
        return action.payload;
    },
    [deleteUser]: (state, action) => {
        return action.payload = [];
    }
})