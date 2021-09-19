import { createAction } from '@reduxjs/toolkit';

const fetchMovieFavorite = createAction('FETCH_MOVIE_FAVORITE');
const addMovieFavorite = createAction('ADD_MOVIE_FAVORITE');
const removeMovieFavorite = createAction('REMOVE_MOVIE_FAVORITE');

export { fetchMovieFavorite, addMovieFavorite, removeMovieFavorite };