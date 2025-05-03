import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete }) => (
  <div className="task-container">
    {tasks.length === 0 ? (
      <p className="no-tasks">No hay tareas disponibles</p>
    ) : (
      tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))
    )}
  </div>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskList;
