import React from "react";
import { getTrending } from "../api/tmdb-api";
import { useQuery } from "react-query";
import MovieListPageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

const TrendingPage = (props) => {
    const {data, isLoading, isError, error} = useQuery("trending", getTrending);

if(isLoading) {
    return <Spinner/>;
}
if(isError) {
    return <h1>{error.message}</h1>;
}

const movies = data.results;

return (
    <MovieListPageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
);
}
export default TrendingPage;