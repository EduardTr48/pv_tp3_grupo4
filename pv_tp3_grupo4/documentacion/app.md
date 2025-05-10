# Documentación Detallada del Componente App (`App.jsx`)

El componente `App` es el corazón de la aplicación Gestor de Tareas. Actúa como el contenedor principal, gestiona el estado global de la aplicación y coordina la interacción entre los diferentes componentes.

## Propósito y Responsabilidades

-   **Gestión del Estado Principal:** Mantiene la lista completa de tareas y otros estados relevantes como la tarea en edición, la visibilidad del modal y el término de búsqueda.
-   **Lógica de Negocio:** Define las funciones (handlers) que modifican el estado: agregar, completar, eliminar, editar y guardar tareas.
-   **Filtrado y Separación de Tareas:** Filtra la lista principal de tareas para obtener listas separadas de tareas pendientes y completadas, aplicando también el filtro de búsqueda.
-   **Orquestación de Componentes:** Renderiza los componentes `TaskInput` y `TaskList`, pasándoles los datos (estado) y las funciones (handlers) necesarios a través de props.
-   **Gestión del Modal:** Controla la visibilidad y el contenido del modal que muestra los detalles de una tarea.

## Estado (`useState`)

El componente `App` utiliza varios hooks `useState` para gestionar diferentes partes del estado de la aplicación:

1.  **`tasks` / `setTasks`:**
    -   **Propósito:** Almacena el array completo de objetos de tarea. Es la fuente de verdad para todas las tareas.
    -   **Inicialización:** Se inicializa con un array de tareas de ejemplo para demostración.
    -   **Modificación:** Se actualiza mediante `setTasks` en las funciones `handleAddTask`, `handleToggle`, `handleDelete`, y `handleEditSave`. Siempre se crea un nuevo array (usando `...` spread operator o `filter`/`map`) para asegurar la inmutabilidad y el correcto funcionamiento de React.

2.  **`editingId` / `setEditingId`:**
    -   **Propósito:** Guarda el `id` de la tarea que está siendo editada actualmente. Si ninguna tarea está en edición, su valor es `null`.
    -   **Inicialización:** `null`.
    -   **Modificación:** Se establece en `handleEdit(task)` con `task.id`. Se restablece a `null` en `handleEditSave()` y `handleEditCancel()`.

3.  **`editValues` / `setEditValues`:**
    -   **Propósito:** Almacena un objeto con los valores actuales de los campos del formulario de edición (`title`, `description`, `dueDate`).
    -   **Inicialización:** `{ title: '', description: '', dueDate: '' }`.
    -   **Modificación:** Se actualiza en `handleEdit(task)` con los valores de la tarea a editar. Se modifica en `handleEditChange(e)` cada vez que el usuario escribe en un campo del formulario de edición. Se restablece a los valores iniciales en `handleEditSave()` y `handleEditCancel()`.

4.  **`modalTask` / `setModalTask`:**
    -   **Propósito:** Almacena el objeto completo de la tarea que se debe mostrar en el modal. Si el modal está cerrado, su valor es `null`.
    -   **Inicialización:** `null`.
    -   **Modificación:** Se establece con el objeto `task` cuando se llama a la función `onCardClick` pasada a `TaskList` (que a su vez la pasa a `TaskItem`). Se restablece a `null` al hacer clic fuera del modal o en su botón de cerrar.

5.  **`search` / `setSearch`:**
    -   **Propósito:** Almacena el término de búsqueda actual ingresado por el usuario en el input de búsqueda.
    -   **Inicialización:** `''` (string vacío).
    -   **Modificación:** Se actualiza en tiempo real mediante el `onChange` del input de búsqueda.

## Lógica de Filtrado y Separación

Antes de renderizar las listas, `App` procesa el array `tasks`:

1.  **`lowerSearch = search.trim().toLowerCase()`:** Se obtiene el término de búsqueda, se eliminan espacios en blanco al inicio/final y se convierte a minúsculas para una comparación insensible a mayúsculas.
2.  **`pendingTasks = tasks.filter(...)`:** Se crea un nuevo array que contiene solo las tareas donde `!t.completed` (no completadas) Y que coinciden con `lowerSearch` en el título (`t.title`) o la descripción (`t.description`). La búsqueda también se hace en minúsculas.
3.  **`completedTasks = tasks.filter(...)`:** Similar al anterior, pero filtra las tareas donde `t.completed` (completadas) Y que coinciden con `lowerSearch`.

Estas dos listas filtradas (`pendingTasks` y `completedTasks`) son las que se pasan como prop `tasks` a las dos instancias del componente `TaskList`.

## Funciones (Handlers)

-   **`handleAddTask({ title, description, dueDate })`:**
    -   Recibe un objeto con los datos de la nueva tarea desde `TaskInput`.
    -   Crea un nuevo objeto de tarea con un `id` único (`Date.now()`), los datos recibidos y `completed: false`.
    -   Llama a `setTasks` para añadir la nueva tarea al final del array `tasks` existente (usando `[...tasks, newTask]`).

-   **`handleToggle(id)`:**
    -   Recibe el `id` de la tarea a marcar/desmarcar.
    -   Llama a `setTasks` con el resultado de `tasks.map()`.
    -   Dentro del `map`, si el `task.id` coincide con el `id` recibido, crea un *nuevo* objeto de tarea (`{ ...task, completed: !task.completed }`) invirtiendo el valor de `completed`.
    -   Si no coincide, devuelve la tarea original sin cambios.

-   **`handleDelete(id)`:**
    -   Recibe el `id` de la tarea a eliminar.
    -   Llama a `setTasks` con el resultado de `tasks.filter()`.
    -   El `filter` devuelve un nuevo array que incluye solo las tareas cuyo `id` *no* coincide con el `id` recibido.

-   **`handleEdit(task)`:**
    -   Recibe el objeto completo de la tarea en la que se hizo clic en "Editar".
    -   Llama a `setEditingId(task.id)` para indicar qué tarea está en edición.
    -   Llama a `setEditValues({...})` para poblar el estado del formulario de edición con los datos actuales de la tarea.

-   **`handleEditSave(id)`:**
    -   Recibe el `id` de la tarea que se guardó.
    -   Llama a `setTasks` con el resultado de `tasks.map()`.
    -   Dentro del `map`, si el `task.id` coincide, crea un *nuevo* objeto de tarea (`{ ...task, ...editValues }`) fusionando la tarea original con los nuevos valores del estado `editValues`.
    -   Si no coincide, devuelve la tarea original.
    -   Llama a `setEditingId(null)` y `setEditValues({...})` para salir del modo edición y limpiar el formulario.

-   **`handleEditCancel()`:**
    -   Llama a `setEditingId(null)` y `setEditValues({...})` para salir del modo edición y descartar los cambios limpiando el formulario.

-   **`handleEditChange(e)`:**
    -   Recibe el evento `e` del input del formulario de edición.
    -   Utiliza el `name` del input (`e.target.name`) para saber qué propiedad actualizar (`title`, `description` o `dueDate`).
    -   Llama a `setEditValues({ ...editValues, [e.target.name]: e.target.value })` para actualizar la propiedad correspondiente en el estado `editValues`, manteniendo las otras propiedades intactas.

## Renderizado (JSX)

-   Renderiza un `div` principal con la clase `app-container`.
-   Incluye un `<header>` con el título.
-   Dentro del `<main>`:
    -   Muestra el subtítulo "Mis Tareas".
    -   Renderiza el **input de búsqueda**, vinculado al estado `search` y su `onChange`.
    -   Renderiza el componente **`TaskInput`**, pasándole la función `handleAddTask` como prop `onAddTask`.
    -   Renderiza un `div` contenedor con `display: flex` para colocar las listas lado a lado.
    -   Dentro de este div, renderiza **dos instancias** del componente **`TaskList`**:
        -   La primera recibe `pendingTasks` como `tasks` y el título "Tareas pendientes".
        -   La segunda recibe `completedTasks` como `tasks` y el título "Tareas realizadas".
        -   Ambas instancias reciben todas las funciones handler (`handleToggle`, `handleDelete`, `handleEdit`, etc.) y los estados de edición (`editingId`, `editValues`) como props, para que puedan ser pasados a los `TaskItem` correspondientes. También reciben `setModalTask` como `onCardClick`.
-   Fuera del `<main>`, renderiza condicionalmente el **Modal**:
    -   Si `modalTask` no es `null`, muestra un `div` superpuesto (overlay) con fondo semitransparente.
    -   El overlay tiene un `onClick` para cerrar el modal (`setModalTask(null)`).
    -   Dentro del overlay, muestra el contenido del modal (un `div` blanco).
    -   Este `div` tiene `onClick={e => e.stopPropagation()}` para evitar que un clic dentro del modal cierre el overlay.
    -   Muestra un botón de cierre (✖) que también llama a `setModalTask(null)`.
    -   Muestra los detalles de la tarea (`modalTask.title`, `modalTask.description`, `modalTask.dueDate`, estado `completed`).

## Ejemplo de Código

```jsx
// filepath: c:\Users\Alexxe\Documents\PV\pv_tp3_grupo4\pv_tp3_grupo4\src\App.jsx
import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';

function App() {
  // ... (código del componente App)
}

export default App;
```
