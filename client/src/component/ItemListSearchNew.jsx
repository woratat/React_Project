import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';


function ItemListSearchNew({ className, item }) {
    const history = useHistory();

    const save = (e) => {
        e.preventDefault();

        if (localStorage.getItem('search')) {
            const prevDate = JSON.parse(localStorage.getItem('search'));
            let count = 0;
            prevDate.forEach((value) => {
                if (value.movie_name === item.movie_name) {
                    count += 1;
                }
            });
            
            if (count === 0) {
                const data = {
                    movie_id: item.movie_id,
                    movie_name: item.movie_name,
                    movie_image: item.movie_image
                }
    
                const newData = [data, ...prevDate];
                localStorage.setItem('search', JSON.stringify(newData));
                history.push(`/detail/${item.movie_id}`);
            } else {
                history.push(`/detail/${item.movie_id}`);
            }
        } else {
            const data = [{
                movie_id: item.movie_id,
                movie_name: item.movie_name,
                movie_image: item.movie_image
            }]
            localStorage.setItem('search', JSON.stringify(data));
            history.push(`/detail/${item.movie_id}`);
        }
    }

    return (
        <Link to={`/detail/${item.movie_id}`} className={className} onClick={save}>
            <div className="content-image">
                <img src={item.movie_image} alt={item.movie_name} />
            </div>
            <div className="content-title">
                <span>{item.movie_name}</span>
            </div>
        </Link>
    );
}

ItemListSearchNew.propTypes = {
    className: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
}

export default styled(ItemListSearchNew)`
    display: flex;
    align-items: center;
    border-radius: 50px;
    padding: .2rem;
    column-gap: .7rem;
    transition: all .2s ease-in;

    :hover {
        background-color: rgba(0, 0, 0, .1);
    }

    .content-image {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
    }

    .content-image img {
        width: 35px;
        height: 35px;
    }

    .content-title {
        overflow: hidden;
    }
`;