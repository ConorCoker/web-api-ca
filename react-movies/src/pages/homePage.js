import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import SortByOptions from "../sortByOptions";

const HomePage = (props) => {

  const [sortMoviesBy, setSortMoviesBy] = useState(SortByOptions.PopularityDesc)
  const [currentPage,setPage] = useState(1)

  const { data, error, isLoading, isError } = useQuery(
    ['discover',  {sortBy: sortMoviesBy}, {page: currentPage} ],
    getMovies
  );

  const handleSortByRequest = (newSortBy) => {
    setSortMoviesBy(newSortBy);
  }

  const handlePageChangeRequest = (event, value) => {
    setPage(value);
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
      sortMovies={handleSortByRequest}
      changePage={handlePageChangeRequest}
      currentPage={currentPage}
    />
);
};
export default HomePage;