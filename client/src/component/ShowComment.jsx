import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchComment, addComment, updateComment, deleteComment } from "../actions/CommentAction";
import { configAuth } from '../auth/authHeader';
import swal from 'sweetalert2';
import axios from "axios";

function ShowComment({ className, movie_token, id }) {
  console.log(id);
  const comments = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/api/get/comment/${movie_token}`,
          {
            timeout: 2000,
          }
        );

        if (res.status === 200) {
          dispatch(fetchComment(res.data));
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    getComment();
  }, [dispatch, movie_token]);

  useEffect(() => {
    const socket = socketIOClient(`http://localhost:5050`); 
    const response = () => {
      socket.emit("room", id);
      socket.on("message", (newMessage) => {
        dispatch(
          addComment({
            comment_id: newMessage.comment_id,
            movie_id: newMessage.movie_id,
            username: newMessage.username,
            comment_reply: newMessage.comment_reply,
            message: newMessage.message,
          })
        );
      });
      
    };

    response();
    return () => {
      socket.disconnect();
    }
  }, [dispatch, id]);

  useEffect(() => {
    const socket = socketIOClient(`http://localhost:5050`);
    const response = () => {
        socket.emit("room", id);
        socket.on('message-update', (dataUpdate) => {
            dispatch(updateComment({ comment_id: dataUpdate.comment_id, message: dataUpdate.message_update }));
        });
    }

    response();

    return () => {
      socket.disconnect();
    }
  }, [dispatch, id]);

  useEffect(() => {
    const socket = socketIOClient(`http://localhost:5050`);
    const response = () => {
        socket.emit("room", id);
        socket.on('message-delete', (dataDelete) => {
            dispatch(deleteComment({ comment_id: dataDelete.comment_id }));
        });
    }

    response();
    return () => {
      socket.disconnect();
    }
  }, [dispatch, id]);

  const updateMessage = async (comment_id) => {
    const { value: text } = await swal.fire({
        input: 'textarea',
        inputLabel: 'New comment',
        inputPlaceholder: 'Type your message here...',
        showCancelButton: true,
        cancelButtonColor: '#f25',
    });

    if (text) {
        try {
            const res = await axios.put(`http://localhost:5050/api/update/comment/${comment_id}`, {
               message: text
            }, {
                timeout: 2000
            });

            if (res.status === 200) {
                const socket = socketIOClient(`http://localhost:5050`);
                socket.emit("room", id);
                socket.emit('sand-update', res.data);
            }
        } catch (error) {
           if (error.response) {
               swal.fire({
                   title: error.response.data.message,
                   icon: error,
                   showConfirmButton: false,
                   timer: 1300,
                   allowOutsideClick: false
               });
           }
        }
    } else if (text === '') {
        swal.fire({ title: 'Error update comment', text: 'Please enter new comment', icon: 'error' });
    }
  }

  const delete_comment = async (comment_id) => {
    swal.fire({
        title: 'Delete post comment',
        text: 'Do you want delete post?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#f25',
        confirmButtonText: 'Delete'
    }).then( async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`http://localhost:5050/api/delete/comment/${comment_id}`, {
                    timeout: 2000
                });

                if (res.status === 200) {
                    const socket = socketIOClient(`http://localhost:5050`);
                    socket.emit("room", id);
                    socket.emit('sand-delete', res.data);
                }
            } catch (error) {
                
            }
        }
    });
  }

  const addCommentReply = async (comment_id) => {
    const { value: text } = await swal.fire({
      input: 'textarea',
      inputLabel: 'Post comment',
      inputPlaceholder: 'Type your message here...',
      showCancelButton: true,
      cancelButtonColor: '#f25',
    });

    if (text) {
      try {
        const res = await axios.post('http://localhost:5050/api/post/comment_reply', {
          token: movie_token,
          comment_id_reply: comment_id,
          message: text
        }, {
          timeout: 2000,
          headers: configAuth()
        });

        if (res.status === 200) {
          const socket = socketIOClient('http://localhost:5050').connect();
          socket.emit('room', id);
          socket.emit('sand-message', res.data);
        }
      } catch (error) {
        
      }
    } else if (text === '') {
      swal.fire({ title: 'Error post comment', text: 'Please enter new comment', icon: 'error' });
    }
  }

  const openMenu = (index) => {
    document.getElementById(`open${index}`).classList.toggle("active");
  };

  return (
    <div className={className}>
      <h1>Comments</h1>
      {comments.length === 0 ? (
        <div className="show-empty-comment">
          <span className="text-control">No users have commented yet</span>
        </div>
      ) : (
        <div className="show-comment">
          {comments.map((value, index) => {
            if (value.comment_reply === 0) {
              return (
                <div key={value.comment_id} className="content-show-data">
                  <div>
                    <div className="content-user">
                      <span className="show-user">{value.username}</span>
                      <span className="content-show-status">
                        <div className="icon-status">
                          <i className="bx bx-caret-right icon-post"></i>
                        </div>
                        <div className="text-status">
                          <span className="status-post">post</span>
                        </div>
                        <div className="control-message">
                          {localStorage.getItem("username") ===
                          value.username ? (
                            <>
                              <i
                                className="bx bxs-cog icon-menu"
                                onClick={() => {
                                  openMenu(index);
                                }}
                              ></i>
                              <ul
                                className="more-button-list"
                                id={`open${index}`}
                              >
                                <li className="more-button-list-item">
                                  <button type="button" className="btn-click" onClick={() => { updateMessage(value.comment_id) }}>
                                    <div className="icon-button">
                                      <i className="bx bx-pencil"></i>
                                    </div>
                                    <div className="title-button">Edit</div>
                                  </button>
                                </li>
                                <li className="more-button-list-item">
                                  <button
                                    type="button"
                                    className="btn-click-delete"
                                    onClick={() => { delete_comment(value.comment_id) }}
                                  >
                                    <div className="icon-button">
                                      <i className="bx bx-trash"></i>
                                    </div>
                                    <div className="title-button">Delete</div>
                                  </button>
                                </li>
                              </ul>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </span>
                    </div>
                    <div className="show-comment-message">
                      <span>{value.message}</span>
                    </div>
                    {comments.map((item, index_item) => {
                      if (value.comment_id === item.comment_reply) {
                        return (
                          <div key={item.comment_id} className="content-user-reply">
                            <div className="content-user">
                              <span className="show-user">{item.username}</span>
                              <span className="content-show-status">
                                <div className="icon-status">
                                  <i className="bx bx-caret-right icon-post"></i>
                                </div>
                                <div className="text-status">
                                  <span className="status-post">post</span>
                                </div>
                                <div className="control-message">
                                  {localStorage.getItem("username") ===
                                  item.username ? (
                                    <>
                                      <i
                                        className="bx bxs-cog icon-menu"
                                        onClick={() => {
                                          openMenu(index_item);
                                        }}
                                      ></i>
                                      <ul
                                        className="more-button-list"
                                        id={`open${index_item}`}
                                      >
                                        <li className="more-button-list-item">
                                          <button
                                            type="button"
                                            className="btn-click"
                                            onClick={() => { updateMessage(item.comment_id) }}
                                          >
                                            <div className="icon-button">
                                              <i className="bx bx-pencil"></i>
                                            </div>
                                            <div className="title-button">
                                              Edit
                                            </div>
                                          </button>
                                        </li>
                                        <li className="more-button-list-item">
                                          <button
                                            type="button"
                                            className="btn-click-delete"
                                            onClick={() => { delete_comment(item.comment_id) }}
                                          >
                                            <div className="icon-button">
                                              <i className="bx bx-trash"></i>
                                            </div>
                                            <div className="title-button">
                                              Delete
                                            </div>
                                          </button>
                                        </li>
                                      </ul>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </span>
                            </div>
                            <div className="show-comment-message">
                              <span>{item.message}</span>
                            </div>
                          </div>
                        );
                      }
                    })}
                    <div className="content-control">
                      <div className="item-icon-control">
                        <i className="bx bx-like icon-style-control"></i>
                      </div>
                      <div className="item-icon-control">
                        <i className="bx bx-conversation icon-style-control" onClick={() => { addCommentReply(value.comment_id) }} ></i>
                      </div>
                      <div className="item-icon-control">
                        <i className="bx bx-share icon-style-control"></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

ShowComment.propTypes = {
  className: PropTypes.string.isRequired,
  movie_token: PropTypes.string,
  id: PropTypes.number,
};

export default styled(ShowComment)`
  .content-show-data {
    box-shadow: 3px 4px 5px 0.3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin: 1rem;
    border-radius: 5px;
  }

  .show-empty-comment {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-user {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  .content-user-reply {
    margin-bottom: 0.5rem;
    margin-left: 2rem;
    column-gap: 0.5rem;
    margin-top: 1rem;
  }

  .show-user {
    font-weight: bold;
    letter-spacing: 1px;
  }

  .show-comment-message {
    padding-left: 1rem;
  }

  .icon-post {
    margin-top: 0.4rem;
  }

  .icon-menu {
    cursor: pointer;
    margin-top: 0.35rem;
    margin-left: 0.3rem;
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
    font-size: 0.755rem;
    column-gap: 0.3rem;
  }

  .text-control {
    font-size: 1.2rem;
  }

  .show-comment {
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
    transition: all 0.3s ease-in;
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
    bottom: 0.9rem;
    opacity: 1;
    transform-origin: bottom right;
    row-gap: 0.6rem;
    transition: 0.5s ease-in;
  }

  .active {
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in;
  }

  .more-button-list-item {
    display: flex;
    align-items: center;
  }

  .btn-click,
  .btn-click-delete {
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
    column-gap: 0.3rem;
    transition: all 0.3s ease-in;
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
