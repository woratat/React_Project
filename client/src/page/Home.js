import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from 'react-redux';
import { fetchUser } from '../actions/userAction';
import { getUser } from '../auth/user.auth';
import { useBody } from "../use";

// component
import Header from "../component/Header";
import Main from "../component/MainHome";
import ListMovie from "../component/ListMovie";
import AllMovie from "../component/AllMovie";
import Footer from "../component/Footer";

function Home({ className }) {
  const dispatch = useDispatch(); 

  useBody("page-home");

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

  return (
    <HelmetProvider>
      <Helmet>
        <title>Movie King</title>
      </Helmet>
      <Header />
      <Main>
        <div className="content-list">
          <ListMovie movieName="all" />
          <AllMovie movieName="all" />
        </div>
      </Main>
      <Footer />
    </HelmetProvider>
  );
}

Home.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Home)``;
