import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function ShowTrailer({ movieLink }) {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={movieLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

ShowTrailer.prototype = {
  movieLink: PropTypes.string.isRequired,
};

export default styled(ShowTrailer)`

`;