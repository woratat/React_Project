import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// component
import NavLinkItem from './HeaderNavLinkItem';

function Header({ className }) {
  const [inputs, setInputs] = useState('');
  
  const handleChange = (e) => {
    setInputs(e.target.value);
  }

  const onEnter = (e) => {
    if (e.code === 'Enter') {
      
    }
  }

  const handleClick = () => {
    
  }

  return (
    <header className={className}>
      <div className="content-logo">
        <Link to="/">
          <span className="title-logo">Movie King</span>
        </Link>
      </div>
      <ul className="menu">
        <NavLinkItem toLink="/" title="Movies" />
        <NavLinkItem toLink="/tv" title="TV Shows" />
        <NavLinkItem toLink="/new" title="New" />
      </ul>
      <div className="search-box">
        <input type="text" placeholder="Search" className="search-text" onChange={handleChange} onKeyDown={onEnter} value={inputs}></input>
        <i className={inputs.length < 10 ? 'bx bx-search icon-search' : ''} onClick={handleClick}></i>
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
    font-size: 1.3rem;
    color: rgba(48, 87, 225, 1);
    letter-spacing: .2rem
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
    height: 0.222rem;
    width: 100%;
    background: rgba(48, 87, 225, 1);
    box-shadow: 0 0 3px .5px rgba(48, 87, 225, .6);
    border-radius: 50px;
    animation: bar 0.2s;
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
    height: 0.222rem;
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
`;
