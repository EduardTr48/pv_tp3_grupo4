import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  editValues,
  onEditChange,
  onEditSave,
  onEditCancel,
  onCardClick,
  title,
  darkMode
}) => (
  <section
    style={{
      width: '100%',
      background: darkMode ? '#333' : '#fafbfc',
      border: '2px solid #000',
      borderRadius: '12px',
      boxShadow: '4px 4px 0 rgba(0,0,0,0.10)',
      padding: '18px 0 10px 0',
      margin: '0 auto 24px auto',
      maxWidth: 650,
      minHeight: 120,
      transition: 'box-shadow 0.2s'
    }}
  >
    <h3
      style={{
        textAlign: 'center',
        margin: '0 0 18px 0',
        fontWeight: 700,
        fontSize: '1.3rem',
        letterSpacing: '1px',
        color: darkMode ? '#ffff': '#222',
        textTransform: 'uppercase',
        borderBottom: darkMode ? '2px dashed #000' : '2px dashed #bbb',
        paddingBottom: 8
      }}
    >
      {title || 'Lista de tareas'}
    </h3>
    <div className={`task-container ${darkMode ? "dark" : ""} `} style={{ gap: 20 }}>
      {tasks.length === 0 ? (
        <p className="no-tasks" style={{
          color: '#888',
          fontStyle: 'italic',
          padding: '40px 0',
          border: '2px dashed #ccc',
          borderRadius: 8,
          background: '#fff'
        }}>
          No hay tareas disponibles
        </p>
      ) : (
        tasks.map(task => (
          <TaskItem
            darkMode={darkMode}
            key={task.id}
            task={task}
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task)}
            isEditing={editingId === task.id}
            editValues={editValues}
            onEditChange={onEditChange}
            onEditSave={() => onEditSave(task.id)}
            onEditCancel={onEditCancel}
            onCardClick={() => onCardClick && onCardClick(task)}
            priority={task.priority}
          />
        ))
      )}
    </div>
  </section>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  editingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editValues: PropTypes.object,
  onEditChange: PropTypes.func,
  onEditSave: PropTypes.func,
  onEditCancel: PropTypes.func,
  onCardClick: PropTypes.func,
  title: PropTypes.string
};

export default TaskList;
