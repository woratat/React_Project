import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "../assets/scss/row.module.scss";
import PropTypes from 'prop-types';

function Row({ title, data, className }) {
  return (
    <div className={styles.row}>
      <h2>{title}</h2>

      <div className="">
        { data.map((item) => {
            return (
              <Link key={item.movie_id} to={`/detail/${item.movie_id}`} className="movie-content">
                
              </Link>
            )
        }) }
        {/* {data.map((item) => {
          return (
            <></>
            // <CardMovie
            //   item={item}
            //   key={item.movie_id}
            //   className={styles.row_poster}
            // />
          );
        })} */}
      </div>
    </div>
  );
}

Row.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default styled(Row)`
  
`;
