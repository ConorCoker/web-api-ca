import React from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import WatchlistPage from "./pages/watchlist";
import LoginPage from "./pages/loginPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingPage from './pages/upcomingMoviesPage'
import TrendingPage from './pages/trendingMoviePage'
import TopRatedPage from './pages/topRatedMoviesPage'
import ActorPage from './pages/actorPage'
import IndividualActorPage from './pages/individualActorPage'
import RegisterPage from "./pages/registerPage";

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/register" && <SiteHeader />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/watchlist" element={<WatchlistPage />} />
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={ <Navigate to="/" /> } />      
        <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
        <Route path="/movies/upcoming" element={<UpcomingPage />} />
        <Route path="/movies/trending" element={<TrendingPage />} />
        <Route path="/movies/toprated" element={<TopRatedPage />} />
        <Route path="/actors" element={<ActorPage/>} />
        <Route path="/actor/:personId" element={<IndividualActorPage/>} />
      </Routes>
    </>
  );
};

export default AppContent;
