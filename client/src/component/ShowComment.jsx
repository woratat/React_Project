import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, addComment } from '../actions/CommentAction';
import axios from 'axios';

function ShowComment({ className }) {
    const comments = useSelector((state) => state.comment);
    const dispatch = useDispatch();

    useEffect(() => {
        const getComment = () => {
            try {
                
            } catch (error) {
                console.log(error.response);
            }
        }
    }, []);

    useEffect(() => {
        const response = () => {
            const socket = socketIOClient('http://localhost:5050');
            socket.on('new-message', (newMessage) => {
                dispatch(addComment(newMessage));
            });
        }
    }, [dispatch]);

    return (
        <div>
            
        </div>
    )
}

ShowComment.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(ShowComment)`

`;