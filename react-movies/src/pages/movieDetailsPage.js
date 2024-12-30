import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieAlternativeTitles, getMovieCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { useNavigate } from "react-router-dom";

const MoviePage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );
const { data: alternativeTitles, error: altTitlesError, isLoading: altTitlesIsLoading, isError: altTitlesIsError } = useQuery(
  ["alternativeTitles", { id: id }],
  getMovieAlternativeTitles
);
const { data: credits, error: creditsError, isLoading: creditsIsLoading, isError: creditsIsError } = useQuery(
  ["credits", { id: id }],
  getMovieCredits
);

const handleCreditClick = (personId) => {
  console.log("Selected Credit ID:", personId);
  navigate(`/actor/${personId}`)
};

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} alternativeTitles={alternativeTitles} credits={credits} handleClick={handleCreditClick}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;