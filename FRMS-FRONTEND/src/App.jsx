import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FilmList from './components/FilmList';
import AddFilm from './components/AddFilm';
import EditFilm from './components/Editfilm';
import FilmDetails from './components/filmDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="background-blobs"></div>
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="nav-logo">BENNIQ Studio</Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/add" className="nav-link">Add Film</Link>
            </div>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<FilmList />} />
            <Route path="/add" element={<AddFilm />} />
            <Route path="/edit/:id" element={<EditFilm />} />
            <Route path="/films/:id" element={<FilmDetails />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 Film Record Management System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
