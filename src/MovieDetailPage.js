import React from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetailPage = ({ movies }) => {
    const { title } = useParams();
    const decodedTitle = decodeURIComponent(title);
    const movie = movies.find((movie) => movie.title === decodedTitle);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe
                    src={movie.trailerLink}
                    title="Movie Trailer"
                    width="960"
                    height="615"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <Link to="/">Go Back</Link>
        </div>
    );
};

export default MovieDetailPage;
