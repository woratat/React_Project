import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import MovieFavoriteReducer from './reducers/movieFavoriteReducer';

export default configureStore({
    reducer: {
        user: userReducer,
        movie_favorite: MovieFavoriteReducer
    }
});