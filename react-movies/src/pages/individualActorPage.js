import React from "react";
import { getPopularPeople } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from "../components/spinner";
import ActorCard from "../components/actorCard/actorCard";
import { useNavigate, useParams } from "react-router-dom";

const IndividualActorPage = () => {
  const { personId } = useParams();
  const { data, error, isError, isLoading } = useQuery("pop-people", getPopularPeople);
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data.results;
  console.log(actors);
  console.log(personId)

  const actor = actors.find(actor => actor.id.toString() === personId); 

  if (!actor) {
    return <h1>Actor not found</h1>;  
  }

  const onActorMovieClicked = (id) => {
    console.log('Selected Movie ID:', id);
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      <ActorCard person={actor} handleMovieClick={onActorMovieClicked} />
    </div>
  );
};

export default IndividualActorPage;
