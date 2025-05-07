import PropTypes from 'prop-types';
import './TaskItem.css';

const TaskItem = ({
  darkMode,
  task,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  editValues,
  onEditChange,
  onEditSave,
  onEditCancel,
  onCardClick,
  priority
}) => {
  // Formatear fecha para mostrar en formato local
  const formatDate = (dateString) => {
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

  if (isEditing) {
    return (
      <div className={`task-item ${darkMode ? 'dark' : ''} editing`}>
        <form
          onSubmit={e => {
            e.preventDefault();
            onEditSave();
          }}
          style={{ width: '100%' }}
        >
          <input
            type="text"
            name="title"
            value={editValues.title}
            onChange={onEditChange}
            required
            className="task-title"
            style={{ marginBottom: 8, width: '90%' }}
            placeholder="Título"
          />
          <input
            type="text"
            name="description"
            value={editValues.description}
            onChange={onEditChange}
            className="task-description"
            style={{ marginBottom: 8, width: '90%' }}
            placeholder="Descripción"
          />
          <input
            type="date"
            name="dueDate"
            value={editValues.dueDate}
            onChange={onEditChange}
            className="task-date"
            style={{ marginBottom: 8, width: '90%' }}
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button type="submit" className="save-button">Guardar</button>
            <button type="button" className="cancel-button" onClick={onEditCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''} ${darkMode ? 'dark' : ''} priority-${priority}`}
      onClick={e => {
        if (
          e.target.classList.contains('task-checkbox') ||
          e.target.classList.contains('delete-button') ||
          e.target.classList.contains('edit-button')
        ) return;
        if (onCardClick) onCardClick();
      }}
      style={{ cursor: onCardClick ? 'pointer' : 'default' }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="task-checkbox"
      />
      <div className="task-content">
        <h3 className={`task-title ${darkMode ? 'dark': ''}`}>{task.title}</h3>
        {task.description && <p className={`task-description ${darkMode ? 'dark' : ''}`}>{task.description}</p>}
        {task.dueDate && <p className="task-date">Fecha límite: {formatDate(task.dueDate)}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button className="delete-button" onClick={onDelete}>✖</button>
        <button className={`edit-button ${darkMode ? 'dark' : ''}`} onClick={onEdit} style={{ marginTop: 4 }}>✎</button>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    completed: PropTypes.bool,
    priority: PropTypes.string
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  isEditing: PropTypes.bool,
  editValues: PropTypes.object,
  onEditChange: PropTypes.func,
  onEditSave: PropTypes.func,
  onEditCancel: PropTypes.func,
  onCardClick: PropTypes.func,
  priority: PropTypes.string
};

export default TaskItem;
