import React from 'react';
import PropTypes from 'prop-types';
import './ToggleTheme.css';

const ToggleTheme = ({ darkMode, setDarkMode }) => {
  return (
    <div className="theme-toggle-container">
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className={`theme-toggle-button ${darkMode ? 'dark' : 'light'}`}
        aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

ToggleTheme.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired
};

export default ToggleTheme;