import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// component
import NavLinkItem from './HeaderNavLinkItem';

function Header({ className }) {
  return (
    <header className={className}>
      <div className="content-logo">
        <Link to="/">
          <span className="title-logo">Movie King</span>
        </Link>
      </div>
      <div className="menu">
        <NavLinkItem toLink="/" title="Movies" />
        <NavLinkItem toLink="/tv" title="TV Shows" />
        <NavLinkItem toLink="/new" title="New" />
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search" className="search-text"></input>
        <i className='bx bx-search icon-search'></i>
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
  padding: 1.8rem;
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

  .active-item-header {
    color:  rgba(48, 87, 225, 1);
  }

  .active-item-header::before {
    content: "";
    position: absolute;
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
    border-color: rgba(48, 87, 225, .5);
    box-shadow: 0 0 2px .5px rgba(48, 87, 225, .6);
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
