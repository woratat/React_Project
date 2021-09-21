import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, addComment } from '../actions/CommentAction';
import axios from 'axios';

function ShowComment({ className, movie_token, id }) {
    const comments = useSelector((state) => state.comment);
    const dispatch = useDispatch();
    console.log(comments);

    useEffect(() => {
        const getComment = async () => {
            try {
                const res = await axios.get(`http://localhost:5050/api/get/comment/${movie_token}`, {
                    timeout: 2000
                });

                if (res.status === 200) {
                    dispatch(fetchComment(res.data));
                }
            } catch (error) {
                console.log(error.response);
            }
        }

        getComment();
    }, [dispatch, movie_token]);

    useEffect(() => {
        const response = () => {
            const socket = socketIOClient(`http://localhost:5050`);
            socket.emit('room', id);
            socket.on('message', (newMessage) => {
                console.log(newMessage);
                dispatch(addComment({ 
                    movie_id: newMessage.movie_id,
                    username: newMessage.username,
                    comment_reply: newMessage.comment_reply,
                    message: newMessage.message
                }));
            });
        }

        response();
    }, [dispatch, id]);

    return (
        <div className={className}>
            <h1>Comments</h1>
            { comments.length === 0 
            ?
                <div>

                </div>
            :
                <div className="show-comment">
                    { comments.map((value, index) => {
                        return (
                            <div key={index}>
                                { value.message }
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

ShowComment.propTypes = {
    className: PropTypes.string.isRequired,
    movie_token: PropTypes.string,
    id: PropTypes.number
}

export default styled(ShowComment)`
    .show-comment {
        border: 1px solid #000;
        border-radius: 5px;
    }
`;