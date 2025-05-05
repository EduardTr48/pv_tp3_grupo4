import { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';

function App() {
  // Estado para el tema (claro/oscuro)
  const [darkMode, setdarkMode] = useState(true);

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

  // Estado para búsqueda
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Separar tareas pendientes y realizadas, aplicando filtro de búsqueda
  const lowerSearch = search.trim().toLowerCase();
  const pendingTasks = tasks.filter(
    t => !t.completed &&
      (t.title.toLowerCase().includes(lowerSearch) ||
       (t.description && t.description.toLowerCase().includes(lowerSearch)))
  );
  const completedTasks = tasks.filter(
    t => t.completed &&
      (t.title.toLowerCase().includes(lowerSearch) ||
       (t.description && t.description.toLowerCase().includes(lowerSearch)))
  );

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
    <div className="app-container"  >
      <header className={darkMode ? 'dark' : ''}>
        <h1>Gestor de Tareas</h1>
      </header>
      <main className={darkMode ? 'dark' : ''}>
        <h2>Mis Tareas</h2>
        <div style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 950,
          marginBottom: 18
        }}>
          <TaskInput darkMode={darkMode} onAddTask={handleAddTask} />
          <form
            onSubmit={e => {
              e.preventDefault();
              setSearch(searchInput);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              background: '#f7f7f7',
              borderRadius: 10,
              border: '1.5px solid #bbb',
              padding: '8px 10px',
              height: 'fit-content'
            }}
          >
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              style={{
                padding: '8px 12px',
                border: 'none',
                borderRadius: '6px 0 0 6px',
                fontSize: '1em',
                background: 'transparent',
                outline: 'none',
                minWidth: 120
              }}
            />
            <button
              type="submit"
              style={{
                border: 'none',
                background: 'none',
                padding: '8px 10px',
                borderRadius: '0 6px 6px 0',
                cursor: 'pointer',
                fontSize: 20,
                color: '#222',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Buscar"
              title="Buscar"
            >
              <span role="img" aria-label="lupa">🔍</span>
            </button>
          </form>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 32,
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: 1400,
            margin: '0 auto'
          }}
        >
          <div style={{ flex: 1, minWidth: 340 }}>
            <TaskList
              tasks={pendingTasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
              editingId={editingId}
              editValues={editValues}
              onEditChange={handleEditChange}
              onEditSave={handleEditSave}
              onEditCancel={handleEditCancel}
              onCardClick={setModalTask}
              title="Tareas pendientes"
            />
          </div>
          <div style={{ flex: 1, minWidth: 340 }}>
            <TaskList
              tasks={completedTasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
              editingId={editingId}
              editValues={editValues}
              onEditChange={handleEditChange}
              onEditSave={handleEditSave}
              onEditCancel={handleEditCancel}
              onCardClick={setModalTask}
              title="Tareas realizadas"
            />
          </div>
        </div>
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
