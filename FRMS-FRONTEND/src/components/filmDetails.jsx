import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await api.get(`/films/${id}`);
        setFilm(response.data);
      } catch (error) {
        console.error('Error fetching film details:', error);
      }
    };
    fetchFilm();
  }, [id]);

  if (!film) return <div className="loading">Loading...</div>;

  return (
    <div className="details-container">
      <div className="details-card">
        <h2 className="film-title">{film.title}</h2>
        <div className="details-info">
          <p><strong>ID:</strong> {film.film_id}</p>
          <p><strong>Category:</strong> {film.category}</p>
          <p><strong>Director:</strong> {film.director}</p>
          <p><strong>Duration:</strong> {film.duration} mins</p>
          <p><strong>Recording Date:</strong> {new Date(film.recording_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span className={`status-badge ${film.status.toLowerCase().replace(/\s+/g, '-')}`}>{film.status}</span></p>
        </div>
        <div className="details-actions">
          <Link to="/" className="back-button">Back to List</Link>
          <Link to={`/edit/${film.id}`} className="edit-link">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
