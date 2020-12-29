import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col, Button } from 'antd';
import axios from 'axios';
// import Comments from './Sections/Comments';
// import LikeDislikes from './Sections/LikeDislikes';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'
import GridCards from '../commons/GridCards';
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
        fetchDetailInfo(endpointForMovieInfo)

        // axios.post('/api/comment/getComments', movieVariable)
        //     .then(response => {
        //         console.log(response)
        //         if (response.data.success) {
        //             console.log('response.data.comments', response.data.comments)
        //             setCommentLists(response.data.comments)
        //         } else {
        //             alert('Failed to get comments Info')
        //         }
        //     })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result);
                setMovie(result)
                // setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        // console.log(result);
                        setCasts(result.cast)
                    })

                // setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    return (
        <div>
            {/* Header */}
            {/* {!LoadingForMovie ? */}
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                {/* : */}
                {/* <div>loading...</div> */}
            {/* } */}


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>


                    <MovieInfo movie={Movie} />
                <br />

                {/* Actors Grid*/}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            Casts.map((cast, index) => (
                                cast.profile_path &&
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />)) 
                        }
                    </Row>
                }
                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} /> */}
                </div>

                {/* Comments */}
                {/* <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} /> */}

            </div>
        </div>
    )
}

export default MovieDetail
