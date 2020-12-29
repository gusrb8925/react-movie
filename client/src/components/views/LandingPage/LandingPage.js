import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import axios from 'axios';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovie, setMainMovie] = useState(null);
    const [currentPage, setcurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            setMovies([...Movies, ...response.results]);
            setMainMovie(response.results[0]);
            setcurrentPage(response.page)
        });
    }

    const loadMoreMoveis = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${currentPage + 1}`;
        fetchMovies(endpoint);
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>

           {/* Main Image */}
           {MainMovie &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovie.backdrop_path}`}
                    title={MainMovie.original_title}
                    text={MainMovie.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]} >
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreMoveis}> Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
