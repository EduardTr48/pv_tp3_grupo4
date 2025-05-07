import { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskInput.css';

const TaskInput = ({ onAddTask, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
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
    
    // Validación de fecha
    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day
      
      if (selectedDate < today) {
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
      setDueDate('');
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
        />
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
