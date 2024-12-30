import React from "react"
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";

const MovieDetailsBottomPane = (props) => {
    
    return(
        <>
        <Fab
        color="secondary"
        variant="extended"
        onClick={() => props.setRecommendationsDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          left: '1em'
        }}
      >
        <NavigationIcon />
        Recommendations
      </Fab>
        <Fab
        color="secondary"
        variant="extended"
        onClick={() =>props.setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      </>
    );
}

export default MovieDetailsBottomPane;