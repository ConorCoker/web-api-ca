import React from "react"
import MovieListPageTemplate from "../components/templateMovieListPage"
import { getTopRated } from "../api/tmdb-api"
import { isError, useQuery } from "react-query"
import Spinner from "../components/spinner"
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist"

const TopRatedPage = () => {

const {isError, error, isLoading, data} = useQuery("toprated",getTopRated);

if(isLoading) {
    return <Spinner/>;
} 
if (isError) {
    return <h1>{error.message}</h1>;
}

const movies = data.results;

return (
    <MovieListPageTemplate
    title = "Top Rated Movies"
    movies = {movies}
    action = {
        (movie) => {
            return <AddToPlaylistIcon movie = {movie} />
        }
    }
    />
);

}

export default TopRatedPage;