import React, { useEffect, useState }  from "react";
import { getRecommendations } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";
import MovieCard from "../movieCard";

export default function MovieListDrawer({ movie }) {
  const { data , error, isLoading, isError } = useQuery(
    ["recommendations", { id: movie.id }],
    getRecommendations
  );
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  return (
    <>
    <h1 style={{padding: 20}}>Recommendations based off {movie.title}</h1>
    <div style={{ display: 'flex', gap: 10, padding: 20 }}>
      {data.results.map((movie) => (
        <div key={movie.id}>
          <MovieCard 
            movie={movie}
            action={() => <AddToPlaylistIcon movie={movie} />}
          />
        </div>
      ))}
    </div>
    </>
  )
};