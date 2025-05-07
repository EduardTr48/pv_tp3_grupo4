import { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import ToggleTheme from './components/ToggleTheme';

function App() {
  // Detecta si el usuario tiene activado el modo oscuro en su sistema
  const isActiveDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Estado para el tema (claro/oscuro)
  const [darkMode, setdarkMode] = useState(isActiveDarkMode ? true : false);

  // Estado para el listado de tareas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Completar tarea de programación',
      description: 'Terminar implementación de componentes en React',
      dueDate: '2023-06-15',
      completed: false,
      priority: 'media'
    },
    {
      id: 2,
      title: 'Estudiar para el examen',
      description: 'Repasar temas de componentes y props',
      dueDate: '2023-06-10',
      completed: true,
      priority: 'alta'
    },
    {
      id: 3,
      title: 'Hacer compras',
      description: 'Conseguir ingredientes para la cena',
      dueDate: '2023-06-08',
      completed: false,
      priority: 'baja'
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

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) return dateString;
      
      // Ajustar la zona horaria para evitar problemas con día incorrecto
      const adjustedDate = new Date(date);
      adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
      
      // Usar toLocaleDateString con opciones para formatear correctamente
      return adjustedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

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
  const handleAddTask = ({ title, description, dueDate, priority }) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false,
        priority
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
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <ToggleTheme darkMode={darkMode} setDarkMode={setdarkMode} />
      <header className={darkMode ? 'dark' : ''}>
        <h1>Gestor de Tareas</h1>
      </header>
      <main className={darkMode ? 'dark' : ''}>
        {/* Sección de búsqueda y formulario de entrada */}
        <div className="input-search-container">
          <div className="search-container">
            <form
              onSubmit={e => {
                e.preventDefault();
                setSearch(searchInput);
              }}
              className="search-form"
            >
              <input
                type="text"
                placeholder="Buscar tareas..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className="search-input"
              />
              <button
                type="submit"
                className="search-button"
                aria-label="Buscar"
                title="Buscar"
              >
                <span role="img" aria-label="lupa">🔍</span>
              </button>
            </form>
          </div>
          
          <div className="input-container">
            <TaskInput darkMode={darkMode} onAddTask={handleAddTask} />
          </div>
        </div>
        
        {/* Contenedor de listas de tareas */}
        <div className="task-lists-container">
          <div className="task-list-wrapper">
            <TaskList
              darkMode={darkMode}
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
          <div className="task-list-wrapper">
            <TaskList
              darkMode={darkMode}
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
      
      {/* Modal */}
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
              background: darkMode ? '#333' : '#fff',
              padding: 32,
              borderRadius: 12,
              minWidth: 320,
              maxWidth: 400,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              position: 'relative',
              color: darkMode ? '#fff' : '#333',
              border: darkMode ? '2px solid #fff' : 'none'
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
                cursor: 'pointer',
                color: darkMode ? '#fff' : '#333'
              }}
              aria-label="Cerrar"
            >✖</button>
            <h2 style={{ marginBottom: 12 }}>{modalTask.title}</h2>
            {modalTask.description && <p style={{ marginBottom: 8 }}>{modalTask.description}</p>}
            {modalTask.dueDate && (
              <p style={{ color: darkMode ? '#ccc' : '#666' }}>
                Fecha límite: {formatDate(modalTask.dueDate)}
              </p>
            )}
            <p style={{ marginTop: 16, fontWeight: 600, color: modalTask.completed ? (darkMode ? '#6deb7b' : '#4caf50') : (darkMode ? '#ff6b6b' : '#f44336') }}>
              {modalTask.completed ? 'Completada' : 'Pendiente'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
