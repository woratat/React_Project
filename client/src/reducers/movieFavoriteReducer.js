import { createReducer } from '@reduxjs/toolkit';
import { fetchMovieFavorite, addMovieFavorite, removeMovieFavorite } from '../actions/MovieFavoriteAction';

export default createReducer([], {
    [fetchMovieFavorite]: (state, action) => {
        return action.payload;
    },
    [addMovieFavorite]: (state, action) => {
        return state.push({ ...action });
    },
    [removeMovieFavorite]: (state, action) => {
        const index = state.findIndex((favorite) => {
            return favorite.favorite_id === action.payload.favorite_id
        });

        state.splice(index, 1);
    }
});