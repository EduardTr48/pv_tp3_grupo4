import { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskInput.css';

const TaskInput = ({ onAddTask,darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form className={`task-input-form ${darkMode ? 'dark' : ''}`} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="task-input"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="task-input"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="task-input-btn">Agregar</button>
    </form>
  );
};

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired
};

export default TaskInput;
