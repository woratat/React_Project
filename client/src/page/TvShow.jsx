import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useBody } from "../use";

// component
import Header from "../component/Header";
import Main from "../component/MainHome";
import ListSeries from "../component/ListSeries";
import Footer from "../component/Footer";

function Home({ className }) {
  const [page] = useState({
    title: "",
    body: "page-home",
  });

  useBody(page.body);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
      <Header />
      <Main>
        <div className="content-list">
          <ListSeries movieName="all" />
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
