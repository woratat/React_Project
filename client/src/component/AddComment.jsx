import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import socketIOClient from 'socket.io-client';
import styled from "styled-components";
import { configAuth } from '../auth/authHeader';

function AddComment({ movieToken, className, id }) {
  console.log(id);
  const [comment, setComment] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    addCommentData();
  }

  async function addCommentData() {
    try {
      const res = await axios.post('http://localhost:5050/api/post/comment', {
        token: movieToken,
        message: comment
      }, {
        timeout: 2000,
        headers: configAuth()
      });

      if (res.status === 200) {
        setComment('');
        const socket = socketIOClient('http://localhost:5050');
        socket.emit('room', id);
        socket.emit('sand-message', res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={className}>
      <form id="create-form" onSubmit={onSubmit}>
        <div className="input-group">
          <textarea
            name="name"
            type="text"
            id="name"
            placeholder="Comment here..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
    
  );
}

AddComment.propTypes = {
  className: PropTypes.string.isRequired,
  movieToken: PropTypes.string,
  id: PropTypes.number
};

export default styled(AddComment)`
  box-sizing: border-box;

  .input-group textarea{
    width: 100%;
    height: 60px;
    padding: 13px;
    border-radius: 5px;
    outline: none;
    resize: none;
    font-size: 16px;
    margin-top: 20px;
    border: 1px solid #bfbfbf;
  }
  textarea:focus{
    border: 2px solid rgba(48, 87, 225, 1);
  }
  textarea::-webkit-scrollbar{
    width: 0px;
  }
  button{
    float: right;
    width: 5rem;
    height: 2rem;
    background-color: rgba(48, 87, 225, 1);
    color: white;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 1rem;
  }
`;