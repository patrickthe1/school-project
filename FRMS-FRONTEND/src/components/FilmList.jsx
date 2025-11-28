import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const FilmList = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await api.get('/films');
      console.log('Fetched films:', response.data); // Debug log
      setFilms(response.data);
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  const getFilmId = (film) => {
    return film.film_id || film.id || film.ID || film._id;
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Cannot delete film: ID is undefined');
      return;
    }
    if (window.confirm('Are you sure you want to delete this film?')) {
      try {
        await api.delete(`/films/${id}`);
        fetchFilms();
      } catch (error) {
        console.error('Error deleting film:', error);
      }
    }
  };

  return (
    <div className="film-list-container">
      <h2 className="page-title">Film Collection</h2>
      <Link to="/add" className="add-button">Add New Film</Link>
      <div className="film-grid">
        {films.map((film) => {
          const filmId = getFilmId(film);
          const statusClass = film.status ? film.status.toLowerCase().replace(/\s+/g, '-') : '';
          
          return (
            <div key={filmId || Math.random()} className="film-card">
              <h3>{film.title}</h3>
              <p><strong>Director:</strong> {film.director}</p>
              <p><strong>Category:</strong> {film.category}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${statusClass}`}>{film.status}</span></p>
              <div className="card-actions">
                <Link to={`/films/${filmId}`} className="view-link">View</Link>
                <Link to={`/edit/${filmId}`} className="edit-link">Edit</Link>
                <button onClick={() => handleDelete(filmId)} className="delete-button">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilmList;
