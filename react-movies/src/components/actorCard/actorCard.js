import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import { useQuery } from 'react-query';
import { getPersonDetails } from "../../api/tmdb-api";
import PublicIcon from '@mui/icons-material/Public';
import VideocamIcon from '@mui/icons-material/Videocam';
import Button from '@mui/material/Button';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

const ActorCard = ({ person, handleMovieClick }) => {
  const { data: personDetails, error, isLoading, isError } = useQuery(
    ["p", { id: person.id }],
    getPersonDetails
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const actorMovieTitleId = new Map();

  if (person.known_for) {
    person.known_for.forEach((item) => {
      if (item.id && item.id !== 0 && item.title && item.title !== "") {
        actorMovieTitleId.set(item.id, item.title);
      }
    });
  }
  
  return (
    <Box sx={{
      display: 'flex',            
      justifyContent: 'center',   
      gap: 2,                      
      flexWrap: 'wrap',           
    }}>
          <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        height="200"
        component="img"
        image={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
        alt={`${person.name}'s profile`}
        sx={{objectFit: `contain`}}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>{person.name}</Typography>
          {person.gender === 2 ? (
            <ManIcon />
          ) : person.gender === 1 ? (
            <WomanIcon />
          ) : null}
        </Box>
        {personDetails.place_of_birth ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography variant="body1">
              {personDetails.place_of_birth}
            </Typography>
            <PublicIcon />
          </Box>
        ) : null}
        {actorMovieTitleId.size > 0 ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <VideocamIcon />
            {
            Array.from(actorMovieTitleId.keys()).map((key) => (
            <Button key={key}
            onClick={() => {
              // console.log("User clicked movie "+key)
              handleMovieClick(key)
            }}>{actorMovieTitleId.get(key)}</Button>
          ))
          }
          </Box>
        ) : null}
        {personDetails.biography ? (
          <Box sx={{display: `flex`, gap: `4px`, alignItems: `top`}}>
            <AutoStoriesIcon/>
            <Typography variant="body1">
              {personDetails.biography}
            </Typography>
          </Box>
        ) : null}
        {personDetails.homepage ? (
          <Box sx={{display:`flex`,gap:`4px`,alignItems: `center`}}>
            <OpenInBrowserIcon/>
            <a href={personDetails.homepage}>{person.name}'s homepage</a>
          </Box>
        ) : null}
      </CardContent>
    </Card>
    </Box>
  );
};

export default ActorCard;