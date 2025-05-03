import PropTypes from 'prop-types';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={task.completed}
        readOnly
        className="task-checkbox"
      />
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <p className="task-date">Fecha límite: {task.dueDate}</p>
      </div>
      <button className="delete-button">✖</button>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    completed: PropTypes.bool
  }).isRequired
};

export default TaskItem;
