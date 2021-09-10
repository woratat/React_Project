import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Header({ className }) {
  return (
    <header className={className}>
      <div className="logo">
        <Link to="/">Movie King</Link>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search" className="search-text"></input>
        <FontAwesomeIcon className="search-btn" icon={faSearch} />
      </div>
      <div className="menu">
        <NavLink to="/">Movies</NavLink>
        <NavLink to="/">TV Shows</NavLink>
        <NavLink to="/">New</NavLink>
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Header)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: rgba(48, 87, 225, 1);

  a {
    text-decoration: none;
    color: #f2d0a9;
  }

  .logo {
    a {
      font-size: 2rem;
      color: #CCAC00;
      font-size: 1.5rem;
      padding: 0 5px;
      margin: 0 5px;
    }
  }

  .menu {
    a {
      font-size: 1.5rem;
      padding: 5px 5px;
      margin: 0 50px;
      color: #CCAC00;
    }
  }

  .search-box {
    height: 30px;
    border-radius: 40px;
    background-color: #CED8F7;
    padding: 8px;
  }
  .search-btn {
    color: goldenrod;
    float: right;
    width: 20px;
    height: 30px;
    border-radius: 50%;
    background: #CED8F7;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-text {
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: black;
    font-size: 16px;
    transition: 0.4s;
    line-height: 30px;
    text-align: center;
  }
`;
