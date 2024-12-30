import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres, getPopularPeople } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import SortByOptions from "../../sortByOptions";

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleAdultChange = (e) => {
    handleChange(e, "age", e.target.value);
  };

  const handleSortByChange = (e) => {
    handleChange(e, "sortby", e.target.value);
  };

  return (
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
         sx={{...formControl}}
         id="filled-search"
         label="Search field"
         type="search"
         variant="filled"
         value={props.titleFilter}
         onChange={handleTextChange}
    />
<FormControl sx={{ ...formControl }}>
  <InputLabel id="sortby-label">Sort By</InputLabel>
  <Select
    labelId="sortby-label"
    id="sortby-label"
    value={props.sortByFilter} 
    onChange={handleSortByChange}
  >
    {Object.keys(SortByOptions).map((key) => {
      const option = SortByOptions[key];
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    })}
  </Select>
</FormControl>
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
           labelId="genre-label"
           id="genre-select"
           defaultValue=""
           value={props.genreFilter}
           onChange={handleGenreChange}
     >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{...formControl}}>
          <InputLabel id="adult-label">Age Rating</InputLabel>
          <Select
           labelId="adult-label"
           id="adult-select"
           defaultValue="1"
           value={props.adultFilter}
           onChange={handleAdultChange}
     >
      <MenuItem key={1} value={1}>
        All
      </MenuItem>
      <MenuItem key={0} value={0}>
        Adult
      </MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}