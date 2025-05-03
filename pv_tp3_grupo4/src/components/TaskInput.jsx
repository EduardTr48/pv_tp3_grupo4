import { useState } from 'react';
import PropTypes from 'prop-types';

const TaskInput = ({ onAddTask }) => {
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
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 120 }}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 120 }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired
};

export default TaskInput;
