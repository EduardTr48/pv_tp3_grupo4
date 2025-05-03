import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';

function App() {
  // Estado para el listado de tareas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Completar tarea de programación',
      description: 'Terminar implementación de componentes en React',
      dueDate: '2023-06-15',
      completed: false
    },
    {
      id: 2,
      title: 'Estudiar para el examen',
      description: 'Repasar temas de componentes y props',
      dueDate: '2023-06-10',
      completed: true
    },
    {
      id: 3,
      title: 'Hacer compras',
      description: 'Conseguir ingredientes para la cena',
      dueDate: '2023-06-08',
      completed: false
    }
  ]);

  // Estado para edición
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ title: '', description: '', dueDate: '' });

  // Estado para el modal
  const [modalTask, setModalTask] = useState(null);

  // Agregar nueva tarea (recibe datos del formulario)
  const handleAddTask = ({ title, description, dueDate }) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false
      }
    ]);
  };

  // Cambiar estado de completado
  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Eliminar tarea
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Iniciar edición
  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditValues({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate
    });
  };

  // Guardar edición
  const handleEditSave = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, ...editValues }
        : task
    ));
    setEditingId(null);
    setEditValues({ title: '', description: '', dueDate: '' });
  };

  // Cancelar edición
  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({ title: '', description: '', dueDate: '' });
  };

  // Actualizar campos de edición
  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="app-container">
      <header>
        <h1>Gestor de Tareas</h1>
      </header>
      <main>
        <h2>Mis Tareas</h2>
        <TaskInput onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          editingId={editingId}
          editValues={editValues}
          onEditChange={handleEditChange}
          onEditSave={handleEditSave}
          onEditCancel={handleEditCancel}
          onCardClick={setModalTask}
        />
      </main>
      {modalTask && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setModalTask(null)}
        >
          <div
            style={{
              background: '#fff',
              padding: 32,
              borderRadius: 12,
              minWidth: 320,
              maxWidth: 400,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalTask(null)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                fontSize: 22,
                cursor: 'pointer'
              }}
              aria-label="Cerrar"
            >✖</button>
            <h2 style={{ marginBottom: 12 }}>{modalTask.title}</h2>
            {modalTask.description && <p style={{ marginBottom: 8 }}>{modalTask.description}</p>}
            {modalTask.dueDate && <p style={{ color: '#666' }}>Fecha límite: {modalTask.dueDate}</p>}
            <p style={{ marginTop: 16, fontWeight: 600, color: modalTask.completed ? '#4caf50' : '#f44336' }}>
              {modalTask.completed ? 'Completada' : 'Pendiente'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
