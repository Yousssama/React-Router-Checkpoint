import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MovieDetailPage from './MovieDetailPage';




// MovieCard component
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
        <img src={movie.posterURL} alt={movie.title} className="movie-poster" />
        <h3 className="movie-title">{movie.title}</h3>
      </Link>
    </div>
  );
};
// MovieList component
const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};


// Filter component
const Filter = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    onFilterChange({ title: event.target.value, rating });
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    onFilterChange({ title, rating: event.target.value });
  };

  const handleReset = () => {
    setTitle('');
    setRating('');
    onFilterChange({ title: '', rating: '' });
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={handleTitleChange}
        className="filter-input"
      />
      <input
        type="number"
        min="1"
        max="10"
        placeholder="Filter by rating"
        value={rating}
        onChange={handleRatingChange}
        className="filter-input"
      />
      <button className="filter-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

// App component
const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'Taxi Driver',
      description: 'A mentally unstable veteran works as a nighttime taxi driver in New York City...',
      posterURL: 'https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      rating: 8.5,
      trailerLink: 'https://www.youtube.com/embed/jhdBp...',
    },
    {
      title: 'Goodfellas',
      description: 'The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito...',
      posterURL: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      rating: 9,
      trailerLink: 'https://www.youtube.com/embed/qo5jJpHtI1Y',
    },
    {
      title: 'The Irishman',
      description: "An illustration of Frank Sheeran's life, from W.W.II veteran to hit-man for the Bufalino crime family and his alleged assassination of his close friend...",
      posterURL: 'https://m.media-amazon.com/images/M/MV5BMGUyM2ZiZmUtMWY0OC00NTQ4LThkOGUtNjY2NjkzMDJiMWMwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg',
      rating: 7,
      trailerLink: 'https://www.youtube.com/embed/WHXxVmeGQUc',
    },
  ]);


  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilterChange = ({ title, rating }) => {
    let filtered = movies;

    if (title) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (rating) {
      filtered = filtered.filter((movie) => movie.rating >= rating);
    }

    setFilteredMovies(filtered);
  };

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
    setFilteredMovies([...filteredMovies, movie]);
  };

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 0,
    trailerLink: '',
  });

  const handleMovieChange = (event) => {
    setNewMovie({
      ...newMovie,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMovie(newMovie);
    setNewMovie({
      title: '',
      description: '',
      posterURL: '',
      rating: 0,
      trailerLink: '',
    });
  };

  return (
    <div>
      <h1 className="app-title">The Movie Critic</h1>

      <Router>
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movies/:title" element={<MovieDetailPage movies={movies} />} />
        </Routes>
      </Router>

        <form onSubmit={handleSubmit} className="add-movie-form">
        <h2>Add a New Movie</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleMovieChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newMovie.description}
          onChange={handleMovieChange}
          required
        />
        <input
          type="text"
          name="posterURL"
          placeholder="Poster URL"
          value={newMovie.posterURL}
          onChange={handleMovieChange}
          required
        />
        <input
          type="number"
          name="rating"
          min="1"
          max="10"
          placeholder="Rating"
          value={newMovie.rating}
          onChange={handleMovieChange}
          required
        />

        <button type="submit">Add Movie</button>
        </form>
        </div>

  );
};

export default App;