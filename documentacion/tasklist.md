# Documentación Detallada del Componente TaskList (`TaskList.jsx`)

El componente `TaskList` actúa como un contenedor de presentación para mostrar una lista de tareas. Es reutilizable y se utiliza tanto para las tareas pendientes como para las completadas.

## Propósito y Responsabilidades

-   **Presentación de Listas:** Su principal responsabilidad es renderizar visualmente una lista de tareas recibida a través de props.
-   **Reutilización:** Está diseñado para ser utilizado en diferentes contextos (tareas pendientes, tareas completadas) simplemente pasándole diferentes datos y un título.
-   **Delegación de Lógica:** No contiene lógica de negocio compleja (como modificar el estado de las tareas). Delega todas las acciones (marcar, eliminar, editar) a las funciones handler recibidas como props del componente `App`.
-   **Renderizado Condicional:** Muestra un mensaje específico si la lista de tareas que recibe está vacía.
-   **Iteración:** Utiliza el método `map()` para iterar sobre el array de tareas y renderizar un componente `TaskItem` para cada una.

## Props

`TaskList` recibe un conjunto de props del componente `App` para funcionar correctamente:

-   **`tasks` (PropTypes.arrayOf(PropTypes.object).isRequired):** El array de objetos de tarea que debe renderizar esta instancia de la lista (puede ser `pendingTasks` o `completedTasks`).
-   **`onToggle` (PropTypes.func.isRequired):** La función `handleToggle` de `App`, pasada para que `TaskItem` pueda llamarla.
-   **`onDelete` (PropTypes.func.isRequired):** La función `handleDelete` de `App`.
-   **`onEdit` (PropTypes.func):** La función `handleEdit` de `App`.
-   **`editingId` (PropTypes.oneOfType([PropTypes.string, PropTypes.number])):** El ID de la tarea actualmente en edición (estado de `App`).
-   **`editValues` (PropTypes.object):** Los valores actuales del formulario de edición (estado de `App`).
-   **`onEditChange` (PropTypes.func):** La función `handleEditChange` de `App`.
-   **`onEditSave` (PropTypes.func):** La función `handleEditSave` de `App`.
-   **`onEditCancel` (PropTypes.func):** La función `handleEditCancel` de `App`.
-   **`onCardClick` (PropTypes.func):** La función `setModalTask` de `App`, para abrir el modal.
-   **`title` (PropTypes.string):** Un título opcional para mostrar encima de la lista (ej: "Tareas pendientes", "Tareas realizadas"). Si no se proporciona, usa "Lista de tareas" por defecto.

## Renderizado (JSX)

-   Renderiza un elemento `<section>` como contenedor principal, con estilos aplicados directamente (borde, sombra, padding, etc.).
-   Muestra un `<h3>` con el valor de la prop `title` (o el título por defecto).
-   Dentro de un `div` con la clase `task-container`:
    -   **Renderizado Condicional:**
        -   Si `tasks.length === 0` (la lista está vacía), muestra un párrafo `<p>` con la clase `no-tasks` y el mensaje "No hay tareas disponibles".
        -   Si la lista no está vacía (`else`), utiliza `tasks.map(task => ...)` para iterar sobre cada objeto `task` en el array `tasks`.
    -   **Iteración con `map()`:**
        -   Por cada `task` en el array, renderiza un componente `<TaskItem>`.
        -   **`key={task.id}`:** Se asigna una `key` única a cada `TaskItem`. Esto es **esencial** para que React identifique de manera eficiente qué elementos de la lista han cambiado, se han agregado o eliminado, optimizando las actualizaciones del DOM. Se usa el `id` de la tarea como clave única.
        -   **Pasando Props a `TaskItem`:** Todas las props relevantes recibidas por `TaskList` (la `task` actual, `editingId`, `editValues`, y todas las funciones `onToggle`, `onDelete`, `onEdit`, etc.) se pasan directamente al componente `TaskItem` correspondiente. Se usan funciones flecha (ej: `() => onToggle(task.id)`) para asegurar que las funciones se llamen con el `id` o `task` correctos cuando ocurra el evento en `TaskItem`.

## Estilos

-   Los estilos principales del contenedor `<section>` y del título `<h3>` se aplican directamente mediante el atributo `style`.
-   El `div.task-container` utiliza estilos definidos en `App.css` (o un CSS global) para la disposición de los `TaskItem` (probablemente `flex-direction: column`).
-   El mensaje `.no-tasks` también tiene estilos definidos globalmente o en `App.css`.
````
