import './App.css';
import TaskItem from './components/TaskItem';

function App() {
  // Datos estáticos de tareas
  const tasks = [
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
  ];

  return (
    <div className="app-container">
      <header>
        <h1>Gestor de Tareas</h1>
      </header>
      
      <main>
        <h2>Mis Tareas</h2>
        
        <div className="task-container">
          {tasks.length === 0 ? (
            <p className="no-tasks">No hay tareas disponibles</p>
          ) : (
            tasks.map(task => (
              <TaskItem 
                key={task.id}
                task={task}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
