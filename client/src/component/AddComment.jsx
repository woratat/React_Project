import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";


function AddComment({className}) {
  const [comment, setComment] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    addComment();
  }

  async function addComment() {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/post/Comment",
        {
          message: comment,
        },
        {
          timeout: 2000,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={className}>
      <h1>Comments</h1>
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
  className: PropTypes.string.isRequired
};

export default styled(AddComment)`
box-sizing: border-box;

.input-group textarea{
    width: 98%;
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