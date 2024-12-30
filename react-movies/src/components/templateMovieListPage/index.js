import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './pagination-styles.css';  // Ensure this path is correct


function MovieListPageTemplate({ movies, title, action, sortMovies, changePage, currentPage }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [ageFilter, setAgeFilter] = useState("-1");
  const ageBoolean = Number(ageFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if (ageBoolean === -1) {
        return true;
      } else if (ageBoolean === 0) {
        return false;
      } else if (ageBoolean === 1) {
        return true;
      }
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "age") setAgeFilter(value);
    else if (type ==="sortby") sortMovies(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
        <Stack spacing={2}>
      <Typography>Page: {currentPage}</Typography>
      <Pagination className="custom-pagination" count={500} page={currentPage} onChange={changePage} />
    </Stack>
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;