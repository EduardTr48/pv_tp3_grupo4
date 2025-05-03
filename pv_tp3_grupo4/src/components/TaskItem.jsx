import PropTypes from 'prop-types';

const TaskItem = ({ task }) => {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={task.completed}
        readOnly
      />
      <div>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <p>Fecha límite: {task.dueDate}</p>
      </div>
      <button>✖</button>
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
