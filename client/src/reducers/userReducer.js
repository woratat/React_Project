import { createReducer } from '@reduxjs/toolkit';
import { fetchUser } from '../actions/userAction';

export default createReducer([], {
    [fetchUser]: (state, action) => {
        return action.payload
    }
})