import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../actions/userAction';
import swal from 'sweetalert2';

// component
import NavLinkItem from './HeaderNavLinkItem';

function Header({ className }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState('');
  const history = useHistory();
  
  const handleChange = (e) => {
    setInputs(e.target.value);
  }

  const onEnter = (e) => {
    if (e.code === 'Enter') {
      
    }
  }

  const handleClick = () => {
    
  }

  const handleLogout = (e) => {
    e.preventDefault();
    swal.fire({
      title: 'Sign out',
      text: 'Do you want sign out?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#f25',
      confirmButtonText: 'Sign out'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser());
        localStorage.removeItem('token');
        history.push('/');
      }
    });
  }

  return (
    <header className={className}>
      <div className="content-logo">
        <Link to="/">
          <span className="title-logo">Movie<span className="title-king">King</span></span>
        </Link>
      </div>
      <ul className="menu">
        <NavLinkItem toLink="/" title="Movies"/>
        <NavLinkItem toLink="/tv" title="TV Shows" />
        <NavLinkItem toLink="/new" title="New" />
        { user.length === 1 ? <NavLinkItem toLink="/favorite" title="Favorite" /> : <></> }
      </ul>
      <div className="search-box">
        <input type="text" placeholder="Search" className="search-text" onChange={handleChange} onKeyDown={onEnter} value={inputs}></input>
        <i className={inputs.length < 10 ? 'bx bx-search icon-search' : ''} onClick={handleClick}></i>
      </div>
      <div className="controller-user">
        { user.length === 1 ? 
          <>
            <div>
              <Link to="/" onClick={handleLogout} className="btn-link">Sign out</Link>
            </div>
          </>
        :
          <>
            <div className="login-controller">
              <Link to="login" className="btn-link">Sign in</Link>
            </div>
            <div className="logout-controller">
              <Link to="register" className="btn-link">Sign Up</Link>
            </div>
          </>
        }
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Header)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 6%);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  .title-logo {
    font-size: 1.8rem;
    color: rgba(48, 87, 225, 1);
    letter-spacing: .2rem;
  }

  .title-king {
    background-color: rgba(48, 87, 225, 1);
    padding: 7px;
    color: white;
    border-radius: 6px;
  }

  .menu {
    display: flex;
    align-items: center;
    column-gap: 1.5rem;
  }

  .link-item-header {
    font-size: 1rem;
    letter-spacing: 1px;
    position: relative;
  }

  .link-item-header:hover::before {
    content: "";
    position: absolute;
    display: block;
    bottom: -0.4rem;
    height: 0.122rem;
    width: 100%;
    background: rgba(48, 87, 225, 1);
    box-shadow: 0 0 3px .5px rgba(48, 87, 225, .6);
    border-radius: 50px;
    animation: bar 0.3s ease-in;
  }

  @keyframes bar {
    0% {
      width: 0
    }
    100% {
      width: 100%
    }
  }

  .active-item-header {
    color:  rgba(48, 87, 225, 1);
  }

  .active-item-header::before {
    content: "";
    position: absolute;
    display: block;
    bottom: -0.4rem;
    width: 100%;
    height: 0.122rem;
    background: rgba(48, 87, 225, 1);
    box-shadow: 0 0 3px .5px rgba(48, 87, 225, .6);
    border-radius: 50px;
  }

  .search-box {
    position: relative;
  }

  .search-text {
    border: 1px solid rgb(0, 0, 0, 12%);
    border-radius: 50px;
    padding: .4rem .9rem;
    font-size: 1rem;
    outline: none;
  }

  .search-text::placeholder {
    padding-left: .5rem;
    display: flex;
    align-items: center;
  }

  .search-text:focus {
    border-color: rgba(48, 87, 225, 1);
    box-shadow: 0 0 4px .5px rgba(48, 87, 225, 1);
  }

  .icon-search {
    position: absolute;
    transform: translate(-1.6rem, .49rem);
    font-size: 1rem;
    cursor: pointer;
    transition: all .3s;
  }

  .icon-search:hover {
    color: rgba(48, 87, 225, 1);
  }

  .controller-user {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
  }

  .login-controller {
    border-right: 1px solid rgba(0, 0, 0, .3);
    padding-right: 1rem;
  }

  .btn-link {
    transition: all 0.3s ease-in;
  }

  .btn-link:hover {
    color: rgba(48, 87, 225, 1);
  }
`;
