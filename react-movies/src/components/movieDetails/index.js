import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import MovieDetailsBottomPane from "../movieDetailsBottomPane/movieDetailsBottomPane";
import { useNavigate } from "react-router-dom";
import MovieListDrawer from "../movieListDrawer/movieListDrawer";
import { useQuery } from 'react-query';
import { getPopularPeople } from "../../api/tmdb-api"; // Assuming this is the API to fetch popular people

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, alternativeTitles, credits, handleClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recommendationsDrawerOpen, setRecommendationsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const { data: popularPeople, isLoading: isLoadingPopularPeople, isError: isErrorPopularPeople, error } = useQuery(
    "popular-people",
    getPopularPeople
  );

  if (isLoadingPopularPeople) {
    return <div>Loading popular people...</div>;
  }

  if (isErrorPopularPeople) {
    return <div>Error loading popular people: {error?.message}</div>;
  }

  const popularPeopleIds = popularPeople?.results ? popularPeople.results.map((person) => person.id) : [];

  const filteredCast = credits?.cast?.filter((castMember) =>
    popularPeopleIds.includes(castMember.id)
  );

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      {filteredCast && filteredCast.length > 0 && (
  <Paper component="ul" sx={{ ...root }}>
    <li>
      <Chip label="Popular Cast" sx={{ ...chip }} color="primary" />
    </li>
    {filteredCast.map((cast) => (
      <li key={cast.id}>
        <Chip label={cast.name} sx={{ ...chip }} onClick={() => handleClick(cast.id) } icon={<StarRate />} />
      </li>
    ))}
  </Paper>
)}

{credits && credits.cast.length > 0 && (
  <Paper component="ul" sx={{ ...root }}>
    <li>
      <Chip label="Cast" sx={{ ...chip }} color="primary" />
    </li>
    {credits.cast.filter((cast) => !popularPeopleIds.includes(cast.id)).map((cast) => (
  <li key={cast.id}>
    <Chip label={cast.name} sx={{ ...chip }} />
  </li>
))}

  </Paper>
)}

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Alternative Titles" sx={{ ...chip }} color="primary" />
        </li>
        {alternativeTitles && alternativeTitles.map((at) => (
          <li key={at.iso_3166_1}>
            <Chip label={at.title} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <MovieDetailsBottomPane setDrawerOpen={setDrawerOpen} setRecommendationsDrawerOpen={setRecommendationsDrawerOpen} />

      <Drawer anchor="top" open={recommendationsDrawerOpen} onClose={() => setRecommendationsDrawerOpen(false)}>
        <MovieListDrawer movie={movie} />
      </Drawer>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;