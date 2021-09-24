import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useBody } from "../use";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import validator from "validator";
import { useParams, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from '../actions/userAction';
import { getUser } from '../auth/user.auth';

// component
import Header from "../component/Header";
import Main from "../component/MainDetail";
import Footer from "../component/Footer";
import ShowTrailer from "../component/ShowTrailer";
import ShowComment from "../component/ShowComment";
import AddComment from "../component/AddComment";

function Detail({ className }) {
  const [page, setPage] = useState({
    title: "",
    body: "page-detail",
  });
  const [movies, setMovies] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();

  useBody(page.body);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await axios.get(
          `http://localhost:5050/api/get/movieDetail/${token}`,
          {
            timeout: 2000,
          }
        );
        setMovies(movie.data[0]);
        setPage((page) => ({ ...page, title: `Movie King | ${movie.data[0].movie_name}` }))
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    };
    getMovie();
  }, [token]);

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(fetchUser( await getUser() ));
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [dispatch]);

  if (!validator.isJWT(token)) {
    return <Redirect to="/" />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
      <Header />
      <Main>
        <div className={className}>
          <div className="content">
            <div className="content-trailer">
              <img src={movies.movie_image} alt="poster" />
              <ShowTrailer movieLink={movies.movie_link} />
            </div>
            <div className="content-detail">
              <h1>{movies.movie_name}</h1>
              <h3>Movie Synopsis</h3>
              <p>{movies.movie_detail}</p>
              <h3>Director</h3>
              <p>{movies.movie_director}</p>
              <h3>Writer</h3>
              <p>{movies.movie_writer}</p>
              <h3>Stars</h3>
              <p>{movies.movie_star}</p>
              <h3>Score</h3>
              <p>{movies.movie_like}</p>
            </div>
          </div>
          <div className="comment">
            <ShowComment movie_token={token} id={movies.id} />
            <AddComment movieToken={movies.movie_id} id={movies.id} />
          </div>
        </div>
      </Main>
      <Footer />
    </HelmetProvider>
  );
}

Detail.prototype = {
  className: PropTypes.string.isRequired,
};

export default styled(Detail)`
  margin: 0px 20px;

  .content {
    display: flex;
    /* border: 2px solid red; */
    background: #efefef;
  }
  .content-trailer {
    padding: 16px;
    /* border: 2px solid blue; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;
    img {
      width: 100%;
      margin-top: 20px;
    }
  }
  .content-detail {
    padding: 10px 16px 10px 10px;
    /* border: 2px solid green; */
  }
  .content-detail p {
    padding: 20px 5px;
  }
  h1 {
    text-transform: uppercase;
    text-align: center;
  }
  h3 {
    background-color: rgba(48, 87, 225, 1);
    color: white;
    padding-left: 10px;
  }

  @media screen and (max-width: 990px) {
    .content {
      display: flex;
      flex-direction: column;
    }
  }
`;
