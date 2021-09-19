import { createAction } from '@reduxjs/toolkit';

const fetchUser = createAction('FETCH_USER');
const deleteUser = createAction('DELETE_USER');

export { fetchUser, deleteUser };