import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EditFilm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    director: '',
    duration: '',
    recording_date: '',
    status: 'In production'
  });

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await api.get(`/films/${id}`);
        console.log('Fetched film for edit:', response.data);
        const film = response.data;
        
        // Safely format date
        let formattedDate = '';
        if (film.recording_date) {
          try {
            formattedDate = new Date(film.recording_date).toISOString().split('T')[0];
          } catch (e) {
            console.error('Error formatting date:', e);
            formattedDate = film.recording_date; // Fallback
          }
        }

        setFormData({
          title: film.title || '',
          category: film.category || '',
          director: film.director || '',
          duration: film.duration || '',
          recording_date: formattedDate,
          status: film.status || 'In production'
        });
      } catch (error) {
        console.error('Error fetching film details:', error);
      }
    };
    fetchFilm();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/films/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Edit Film</h2>
      <form onSubmit={handleSubmit} className="film-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Director</label>
          <input type="text" name="director" value={formData.director} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Duration (mins)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Recording Date</label>
          <input type="date" name="recording_date" value={formData.recording_date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="In production">In production</option>
            <option value="Editing">Editing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Update Film</button>
      </form>
    </div>
  );
};

export default EditFilm;
