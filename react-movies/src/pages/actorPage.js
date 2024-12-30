import React from "react";
import { getPopularPeople } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from "../components/spinner";
import ActorCard from "../components/actorCard/actorCard";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { styled } from '@mui/material/styles';

const ActorPage = () => {
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

const {data,error,isError,isLoading} = useQuery("pop-people",getPopularPeople)
const navigate = useNavigate();

if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data.results;

  const onActorMovieClicked = (id) => {
    console.log('Selected Movie ID:', id);
    navigate(`/movies/${id}`);
  };

  return(
    <>
   {isMobile && <Offset />}
    <div style={{display:`flex`, gap:`20px`, flexWrap: 'wrap' }}>
    {actors.map(element => (
        <ActorCard key={element.id} person={element} handleMovieClick={onActorMovieClicked}></ActorCard>
    )
  )}
  </div>
    </>
  );
};

export default ActorPage;