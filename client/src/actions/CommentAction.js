import { createAction } from '@reduxjs/toolkit';

const fetchComment = createAction('FETCH_COMMENT');
const addComment = createAction('ADD_COMMENT');
const updateComment = createAction('UPDATE_COMMENT');
const deleteComment = createAction('DELETE_COMMENT');

export { fetchComment, addComment, updateComment, deleteComment };