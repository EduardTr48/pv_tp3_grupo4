import React from 'react'
import './ToggleTheme.css';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';
const ToggleTheme = ({darkMode,setDarkMode}) => {
    const handleChangeTheme = () => {
        setDarkMode(!darkMode)
    }
  return (
    <div className={`toggle ${darkMode ? "dark" : ""}`}>
        <button className={darkMode ? "dark" : ""} onClick={handleChangeTheme}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
 

        </button>
    </div>
  )
}

export default ToggleTheme