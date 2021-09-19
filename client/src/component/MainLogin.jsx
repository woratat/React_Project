import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import validator from "validator";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUser } from "../actions/userAction";

function MainLogin({ className }) {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { username, password } = account;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((account) => ({ ...account, [name]: value }));
  };

  const handleSubmitted = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const res = await axios.get("http://localhost:5050/api/auth/user", {
        timeout: 2000,
        auth: {
          username: username,
          password: password,
        },
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        dispatch(fetchUser([{ user: res.data.token }]));
        history.push("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError(error.response.data.message);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error);
      }
    }
  };

  const open_button = () => {
    if (validator.isEmpty(username) || validator.isEmpty(password)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <main className={className}>
      <div className="content">
        <div className="content-header">
          <div className="title">
            <div className="title-logo">
              <span>
                Movie <span className="blue">King</span>
              </span>
            </div>
            <div className="title-content">
              <span>Sign in</span>
            </div>
          </div>
        </div>
        {!validator.isEmpty(error) ? (
          <div className="content-error">
            <div className="icon-error">
              <i className="bx bx-error-circle c-danger"></i>
            </div>
            <div className="title-error">
              <span>{error}</span>
            </div>
          </div>
        ) : (
          <> </>
        )}
        <form name="login" className="form-content" onSubmit={handleSubmitted}>
          <div className="f-item">
            <input
              type="text"
              name="username"
              className="f-input"
              placeholder="username"
              onChange={handleChange}
              value={username}
            />
            {submitted && error && username.length < 10 ? (
              <i className="bx bx-error-circle icon-error-input"></i>
            ) : (
              <></>
            )}
          </div>
          <div className="f-item">
            <input
              type="password"
              name="password"
              className="f-input"
              placeholder="password"
              onChange={handleChange}
              value={password}
            />
            {submitted && error && password.length < 10 ? (
              <i className="bx bx-error-circle icon-error-input"></i>
            ) : (
              <></>
            )}
          </div>
          <div className="f-item content-button">
            <button
              type="submit"
              className={open_button() ? "btn btn-close" : "btn btn-open"}
              disabled={open_button()}
            >
              Sign in
            </button>
            <Link to="/" className="btn-link btn-back mt">
              Back
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

MainLogin.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(MainLogin)`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  .content {
    width: 400px;
    padding: 2rem;
    box-shadow: 3px 4px 5px 0.3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .content-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-bottom: 1rem;
  }

  .title-logo {
    font-size: 1.5rem;
    letter-spacing: 1px;
    font-weight: 500;
  }

  .blue {
    color: rgba(48, 87, 225, 1);
  }

  .title-content {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .content-error {
    border: 1px solid #f25;
    display: flex;
    align-items: center;
    padding: 0.2rem 0.8rem;
    column-gap: 1rem;
    box-shadow: 0 0 2px 0.3px rgba(255, 34, 85, 0.5);
  }

  .c-danger {
    color: #f25;
    font-size: 1.2rem;
    margin-top: 0.4rem;
  }

  .form-content {
    margin-top: 1rem;
  }

  .f-item:nth-child(1),
  .f-item:nth-child(2) {
    margin-bottom: 1.5rem;
    position: relative;
  }

  .f-input {
    width: 100%;
    padding: 0.655rem;
    font-size: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
  }

  .f-input:focus {
    border-color: rgba(0, 0, 0, 0.5);
  }

  .icon-error-input {
    position: absolute;
    font-size: 1.255rem;
    color: #f25;
    transform: translate(-2rem, 0.7rem);
  }

  .content-button {
    display: flex;
    flex-direction: column;
  }

  .mt {
    margin-top: 1rem;
  }

  .btn {
    padding: 0.5rem;
    font-size: 1.112rem;
    border: 1px solid #000;
    outline: none;
    background-color: #ffffff;
    text-align: center;
    cursor: not-allowed;
    border-radius: 2px;
  }

  .btn-link {
    padding: 0.3rem;
    font-size: 1.112rem;
    border: 1px solid #ffffff;
    text-align: center;
    border-radius: 2px;
  }

  .btn-close {
    color: #ffffff;
    background-color: rgba(48, 87, 225, 0.6);
    border-color: rgba(48, 87, 225, 0.6);
    transition: all 0.3s ease-in;
  }

  .btn-open {
    color: #ffffff;
    background-color: rgba(48, 87, 225, 1);
    border-color: rgba(48, 87, 225, 1);
    cursor: pointer;
    transition: all 0.3s ease-in;
  }

  .btn-open:hover {
    background-color: rgba(48, 87, 225, 0.7);
  }

  .btn-back {
    color: #ffffff;
    background-color: rgba(255, 34, 85, 1);
    border-color: rgb(255, 34, 85);
    transition: all 0.3s ease-in;
  }

  .btn-back:hover {
    background-color: rgba(255, 34, 85, 0.7);
  }
`;
