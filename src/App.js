import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainText from './components/MainText';
import TextInput from './components/TextInput';
import RecommendationButton from './components/RecommendationButton';
import moviesData from './movies.json';

const API_KEY = 'd91022e8';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleInputChange = (value) => {
    setInputValue(value);
    setShowRecommendations(false); // Clear recommendations on input change
  };

  const fetchMovieDetails = async (title, year) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${API_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };

  const handleButtonClick = async () => {
    const user = moviesData.find((user) => user.user_id === parseInt(inputValue, 10));
    if (user) {
      const topMovies = user.movies.slice(0, 5);
      const movieDetailsPromises = topMovies.map(movie => fetchMovieDetails(movie.Name, movie.Year));
      const movieDetails = await Promise.all(movieDetailsPromises);
      setRecommendations(movieDetails.filter(movie => movie && movie.Poster));
    } else {
      setRecommendations([]);
    }

    setShowRecommendations(true); 
  };

  return (
    <div className="App">
      <NavBar />
      <MainText />
      <TextInput inputValue={inputValue} onInputChange={handleInputChange} />
      <RecommendationButton onButtonClick={handleButtonClick} />

      {showRecommendations && ( 
        <div className="Recommendations">
          <h2>Top 5 Movies</h2>
          <ul>
            {recommendations.map((movie, index) => (
              <li key={index} className="movie-container">
                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                <div className="movie-details">
                  <h3>{movie.Title} ({movie.Year})</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
