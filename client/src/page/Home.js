import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useBody } from "../use";
import { useSelector } from "react-redux";

// component
import Header from "../component/Header";
import Main from "../component/MainHome";
import ListMovie from "../component/ListMovie";
import Footer from "../component/Footer";

function Home({ className }) {
  const [page] = useState({
    title: "Movie King",
    body: "page-home",
  });
  const user = useSelector((state) => {
    return state.user;
  });
  console.log(user);

  useBody(page.body);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
      <Header />
      <Main>
        <div className={className}>
          <div className="content-title">
            <h1 className="">Movie</h1>
          </div>
        </div>
        <div className="content-list">
          <ListMovie movieName="all" />
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
