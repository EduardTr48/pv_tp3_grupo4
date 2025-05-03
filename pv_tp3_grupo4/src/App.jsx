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
    <div>
      <header>
        <h1>Gestor de Tareas</h1>
      </header>
      
      <main>
        <h2>Mis Tareas</h2>
        
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
