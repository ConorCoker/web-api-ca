# Assignment 2 - Web API

Name: Conor Coker

## Features

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features):

+ **User Registration & Login**: Updated routes for user registration and login to use movies-api rather than Firebase.
+ **Movie Reviews**: Changed functionality to fetch and display reviews for movies by integrating with the movies-api.
+ **Pagination for Movies**: Implemented pagination for the `/api/movies` endpoint to allow fetching movies in paginated chunks.
+ **Movie Genres**: Movie genres now go from tmdb to movies-api then to react-movies.
+ **Upcoming Movies**: Updated the endpoint to fetch upcoming movies from TMDB API and display them on react-movies.

## API Design

Overview of your web API design:

- **/api/movies** | GET | Gets a list of movies with pagination. Supports `page` query parameter for pagination.
- **/api/movies/{movieid}** | GET | Gets a single movie by its ID.
- **/api/movies/{movieid}/reviews** | GET | Gets all reviews for a specific movie.
- **/api/movies/tmdb/upcoming** | GET | Fetches upcoming movies from the TMDB API.
- **/api/movies/tmdb/genres** | GET | Fetches the list of movie genres from the TMDB API.
- **/api/users** | GET | Fetches a list of users.
- **/api/users** | POST | Registers a new user with username and password.
- **/api/users/login** | POST | Logs in a user and returns a JWT token.
- **/api/movies/{movieid}/images** | GET | Fetches images related to a specific movie.
- **/api/movies/{movieid}/reviews** | GET | Fetches reviews for a specific movie.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

1. **Authentication**: 
   - Implemented login and signup views to handle user authentication from my Web API.

2. **Movies**:
   - The React app now fetches movie data from the custom backend API instead of directly from the TMDB API. The `/api/movies` endpoint is used to get movie lists with pagination.
   - Movie details, reviews, and images are fetched using the backend API that interacts with the TMDB API.

3. **Pagination**:
   - The `/api/movies` endpoint supports pagination, and the React app now allows users to navigate between pages of movies.

4. **Genres and Upcoming Movies**:
   - The React app fetches genres and upcoming movies from the `/api/movies/tmdb/genres` and `/api/movies/tmdb/upcoming` endpoints, instead of calling the TMDB API directly.

5. **Movie Reviews**:
   - The React app now allows users to view reviews for each movie by calling the `/api/movies/{movieid}/reviews` endpoint.

6. **Updated Views**:
   - The views for displaying movies, movie details, and reviews have been updated to fetch data from the backend API.
   - The login and signup forms were added to handle user registration and authentication.