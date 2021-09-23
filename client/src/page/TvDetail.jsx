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
import AddCommentTv from "../component/AddCommentTv";
import ShowCommentTv from "../component/ShowCommentTv";

function TvDetail({ className }) {
  const [page] = useState({
    title: "",
    body: "page-tvdetail",
  });

  const [series, setSeries] = useState("");
  const { token } = useParams();

  useBody(page.body);

  useEffect(() => {
    const getSeries = async () => {
      try {
        const serie = await axios.get(
          `http://localhost:5050/api/get/serieDetail/${token}`,
          {
            timeout: 2000,
          }
        );
        setSeries(serie.data[0]);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    };
    getSeries();
  }, [token]);

  const dispatch = useDispatch();
  
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
          <div className="title">
            <h2>Series Detail</h2>
          </div>
          <div className="content">
            <div className="content-trailer">
              <img src={series.tv_image} alt="poster" />
              <ShowTrailer movieLink={series.tv_link} />
            </div>
            <div className="content-detail">
              <h1>{series.tv_name}</h1>
              <h3>Movie Synopsis</h3>
              <p>{series.tv_detail}</p>
              <h3>Stars</h3>
              <p>{series.tv_star}</p>
              <h3>Episodes</h3>
              <p>{series.tv_episodes} episodes</p>
              <h3>Score</h3>
              <p>{series.tv_like}</p>
            </div>
          </div>
          <div className="comment">
            <ShowCommentTv tv_token={token} id={series.id} />
            <AddCommentTv tvToken={token} id={series.id} />
          </div>
        </div>
      </Main>
      <Footer />
    </HelmetProvider>
  );
}

TvDetail.prototype = {
  className: PropTypes.string.isRequired,
};

export default styled(TvDetail)`
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
`;
