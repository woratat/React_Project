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

    const openMenu = (index) => {
        document.getElementById(`open${index}`).classList.toggle('active');
    }

    return (
        <div className={className}>
            <h1>Comments</h1>
            { comments.length === 0 
            ?
                <div className="show-empty-comment">
                    <span className="text-control">No users have commented yet</span>
                </div>
            :
                <div className="show-comment">
                    { comments.map((value, index) => {
                        return (
                            <div key={index}>
                                <div className="content-user">
                                    <span className="show-user">{ value.username }</span>
                                    <span className="content-show-status">
                                        <div className="icon-status">
                                           <i className='bx bx-caret-right icon-post'></i>
                                        </div>
                                        <div className="text-status">
                                            <span className="status-post">post</span>
                                        </div>
                                        <div className="control-message">
                                            { localStorage.getItem('username') === value.username ? 
                                            <>
                                            <i className='bx bxs-cog icon-menu' onClick={() => { openMenu(index) }}></i> 
                                            <ul className="more-button-list" id={`open${index}`}>
                                                <li className="more-button-list-item">
                                                    <button type="button" className="btn-click" >
                                                        <div className="icon-button">
                                                            <i className='bx bx-pencil' ></i>
                                                        </div>
                                                        <div className="title-button">
                                                            Edit
                                                        </div>
                                                    </button>
                                                </li>
                                                <li className="more-button-list-item">
                                                    <button type="button" className="btn-click-delete">
                                                        <div className="icon-button">
                                                            <i className='bx bx-trash'></i>
                                                        </div>
                                                        <div className="title-button">
                                                            Delete
                                                        </div>
                                                    </button>
                                                </li>
                                            </ul>
                                            </>
                                            : <></> }
                                        </div>
                                    </span>
                                </div>
                                <div className="show-comment-message">
                                    <span>{ value.message }</span>
                                </div>
                                <div className="content-control">
                                    <div className="item-icon-control">
                                        <i className='bx bx-like icon-style-control'></i>
                                    </div>
                                    <div className="item-icon-control">
                                        <i className='bx bx-conversation icon-style-control'></i>
                                    </div>
                                    <div className="item-icon-control">
                                        <i className='bx bx-share icon-style-control'></i>
                                    </div>
                                </div>
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
    .show-empty-comment {
        border: 1px solid rgba(0, 0, 0, .3);
        border-radius: 5px;
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content-user {
        margin-bottom: .5rem;
        display: flex;
        align-items: center;
        column-gap: .5rem;
    }

    .show-user {
        font-weight: bold;
        letter-spacing: 1px;
    }

    .icon-post {
        margin-top: .4rem;
    }

    .icon-menu {
        cursor: pointer;
        margin-top: .35rem;
        margin-left: .3rem;
        color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease-in;
    }

    .icon-menu:hover {
        color: rgba(0, 0, 0, 1);
    }

    .status-post {
        color: rgba(0, 0, 0, 0.5);
    }

    .content-show-status {
        display: flex;
        align-items: center;
        font-size: .755rem;
        column-gap: .3rem;
    }

    .text-control {
        font-size: 1.2rem;
    }

    .show-comment {
        border: 1px solid rgba(0, 0, 0, .3);
        border-radius: 5px;
        padding: 1rem 1.5rem;
    }

    .content-control {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        column-gap: 1.5rem;
    }

    .icon-style-control {
        cursor: pointer;
        font-size: 1.152rem;
        transition: all .3s ease-in;
    }

    .icon-style-control:hover {
        color: rgba(48, 87, 225, 1);
    }

    .control-message {
        position: relative;
    }

    .more-button-list {
        display: none;
        z-index: 5;
        background-color: rgb(255, 255, 255, 1);
        box-shadow: 3px 4px 5px 0.3px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        list-style-type: none;
        width: 110px;
        height: 100px;
        padding: 15px;
        position: absolute;
        right: -3.08rem;
        bottom: .9rem;
        opacity: 1;
        transform-origin: bottom right;
        row-gap: .6rem;
        transition: .5s ease-in;
    }

    .active {
        display: flex;
        flex-direction: column;
        transition: all .3s ease-in;
    }

    .more-button-list-item {
        display: flex;
        align-items: center;
    }

    .btn-click, .btn-click-delete {
        border: 1px solid rgba(48, 87, 225, 1);
        border-radius: 4px;
        letter-spacing: 1px;
        outline: none;
        cursor: pointer;
        background-color: transparent;
        display: flex;
        align-items: center;
        padding: 6px;
        width: 100%;
        height: auto;
        column-gap: .3rem;
        transition: all .3s ease-in;
    }

    .btn-click {
        border: 1px solid rgba(48, 87, 225, 1);
    }

    .btn-click-delete {
        border: 1px solid #f25;
    }

    .btn-click:hover {
        color: #fff;
        background-color: rgba(48, 87, 225, 1);
    }

    .btn-click-delete:hover {
        color: #fff;
        background-color: #f25;
    }
`;