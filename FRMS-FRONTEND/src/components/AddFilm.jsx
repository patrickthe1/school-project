import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddFilm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    director: '',
    duration: '',
    recording_date: '',
    status: 'In production'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/films', formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding film:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Add New Film</h2>
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
        <button type="submit" className="submit-button">Add Film</button>
      </form>
    </div>
  );
};

export default AddFilm;
