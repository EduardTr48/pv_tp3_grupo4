import { useState } from 'react';
import './App.css';
import TaskItem from './components/TaskItem';

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

  // Estado para el texto del input
  const [input, setInput] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Agregar nueva tarea
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: input,
        description: desc,
        dueDate: dueDate,
        completed: false
      }
    ]);
    setInput('');
    setDesc('');
    setDueDate('');
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

  return (
    <div className="app-container">
      <header>
        <h1>Gestor de Tareas</h1>
      </header>
      <main>
        <h2>Mis Tareas</h2>
        <form onSubmit={handleAddTask} style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Título"
            value={input}
            onChange={e => setInput(e.target.value)}
            required
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 120 }}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={desc}
            onChange={e => setDesc(e.target.value)}
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
        <div className="task-container">
          {tasks.length === 0 ? (
            <p className="no-tasks">No hay tareas disponibles</p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => handleToggle(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
