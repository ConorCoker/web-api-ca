import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, useLocation } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppContent from "./appContent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

// I used chat-gpt to create this style based on a "movie website"

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D3557',  // Dark Blue (Midnight Blue)
    },
    secondary: {
      main: '#F1A736',  // Gold/Amber (Cinema Glow)
    },
    background: {
      default: '#121212',  // Dark Charcoal/Black (Cinema Theater background)
      paper: '#1E1E1E',     // Slightly lighter background for card-like components
    },
    text: {
      primary: '#FFFFFF',  // White text for readability
      secondary: '#B0B0B0', // Light Grey for secondary text
    },
    action: {
      active: '#FF5E57', // Neon Red (Pop of color for interactive buttons or hover effects)
      hover: '#FF4D00',  // Hover effect color
      selected: '#FF5E57',
    },
  },
  typography: {
    fontFamily: 'Comic Sans MS',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ThemeProvider theme = {theme}>
        <MoviesContextProvider>
          <AppContent />
        </MoviesContextProvider>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);