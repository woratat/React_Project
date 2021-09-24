import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../actions/userAction';
import swal from 'sweetalert2';
import validator from "validator";

// component
import NavLinkItem from './HeaderNavLinkItem';
import ItemListSearchNew from "./ItemListSearchNew";
import ItemListSearchPrev from "./ItemListSearchPrev";
import axios from "axios";

function Header({ className }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState('');
  const [dataSearch, setDataSearch] = useState(JSON.parse(localStorage.getItem('search')) || []);
  const history = useHistory();
  
  const handleChange = (e) => {
    setInputs(e.target.value);
  }

  useEffect(() => {
    const getSearch = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/get/search', {
          timeout: 2000,
          params: {
            name: inputs
          }
        });

        if (res.status === 200) {
          if (res.data.message) {
            setDataSearch([]);
          } else {
            setDataSearch(res.data);
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    }

    getSearch();
  }, [inputs]);

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
        localStorage.clear();
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
        <input type="text" placeholder="Search" className="search-text" onChange={handleChange} value={inputs}></input>
        <i className={inputs.length < 10 ? 'bx bx-search icon-search' : ''}></i>
        <div className="box-content-search">
          { dataSearch.length === 0 ? 
            <div className="box-not">
              <span>No recent searches</span>
            </div>
          :  
            <>
              { validator.isEmpty(inputs) 
              ?
                <>
                {
                  dataSearch.filter((item, index) => index < 5).map((item) => {
                    return (
                      <ItemListSearchPrev key={item.movie_id} item={item} />
                    )
                  })
                }
                </>
              :
                dataSearch.filter((item, index) => index < 6).map((item) => {
                  return (
                    <ItemListSearchNew key={item.movie_id} item={item} />
                  )
                })
              }
            </>
          }
        </div>
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
              <Link to="/login" className="btn-link">Sign in</Link>
            </div>
            <div className="logout-controller">
              <Link to="/register" className="btn-link">Sign Up</Link>
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
  box-shadow: 0 6px 6px rgba(0, 0, 0, 4%);
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
    border-radius: 50px;
  }

  .search-text {
    border: 1px solid rgb(0, 0, 0, 12%);
    border-radius: 50px;
    padding: .4rem .9rem;
    font-size: 1rem;
    outline: none;
    overflow: hidden;
    width: 300px;
  }

  .search-text::placeholder {
    padding-left: .5rem;
    display: flex;
    align-items: center;
  }

  .search-text:focus {
    border-color: rgba(48, 87, 225, 1);
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

  .box-content-search {
    position: relative;
    display: none;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, .1);
    box-shadow: 3px 4px 5px .2px rgba(0, 0, 0, .1);
    background-color: #fff;
    width: 278px;
    height: auto;
    border-radius: 0 0 7px 7px;
    transform: translate(.60rem, .6rem);
    padding: .3rem .2rem;
  }

  .search-text:focus ~ .box-content-search {
    display: block;
  }

  .box-content-search:hover {
    display: block;
  }

  .box-not {
    display: flex;
    justify-content: center;
    align-items: center;
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

  @media screen and (max-width: 990px) {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
`;
