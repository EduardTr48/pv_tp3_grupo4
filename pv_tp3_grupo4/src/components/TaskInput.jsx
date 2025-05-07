import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TaskInput.css';

const TaskInput = ({ onAddTask, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Formatear la fecha de hoy en formato YYYY-MM-DD para el input date
  const today = new Date().toISOString().split('T')[0];
  const [dueDate, setDueDate] = useState(today);
  const [priority, setPriority] = useState('sel');
  
  // Estados para los errores de validación
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: '',
      description: '',
      dueDate: '',
      priority: ''
    };
    
    // Validación de título
    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
      valid = false;
    } else if (title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
      valid = false;
    } else if (title.trim().length > 50) {
      newErrors.title = 'El título no puede superar los 50 caracteres';
      valid = false;
    }
    
    // Validación de descripción
    if (description.trim().length > 200) {
      newErrors.description = 'La descripción no puede superar los 200 caracteres';
      valid = false;
    }
    
    // Validación de fecha (mejorado)
    if (dueDate) {
      const selectedDate = new Date(dueDate + 'T00:00:00');
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < todayDate) {
        newErrors.dueDate = 'La fecha no puede ser anterior a hoy';
        valid = false;
      }
    }
    
    // Validación de prioridad
    if (priority === 'sel') {
      newErrors.priority = 'Debe seleccionar una prioridad';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddTask({ title, description, dueDate, priority });
      // Limpiar formulario
      setTitle('');
      setDescription('');
      setDueDate(today);
      setPriority('sel');
      // Limpiar errores
      setErrors({
        title: '',
        description: '',
        dueDate: '',
        priority: ''
      });
    }
  };

  // Formatear fecha para mostrar en formato local
  const formatDateToLocalDisplay = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <form className={`task-input-form ${darkMode ? 'dark' : ''}`} onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={`task-input ${errors.title ? 'error-input' : ''}`}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="input-group">
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={`task-input ${errors.description ? 'error-input' : ''}`}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      
      <div className="input-group">
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className={`task-input ${errors.dueDate ? 'error-input' : ''}`}
          min={today} // Evita seleccionar fechas anteriores a hoy
        />
        {dueDate && (
          <small className="date-display">
            {formatDateToLocalDisplay(dueDate)}
          </small>
        )}
        {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
      </div>
      
      <div className="input-group">
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className={`task-input task-input-select ${errors.priority ? 'error-input' : ''}`}
        >
          <option className='task-input' value="sel" disabled>Seleccione la Prioridad</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        {errors.priority && <span className="error-message">{errors.priority}</span>}
      </div>
      
      <button type="submit" className="task-input-btn">Agregar</button>
    </form>
  );
};

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  darkMode: PropTypes.bool
};

export default TaskInput;
