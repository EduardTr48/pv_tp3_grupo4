# Documentación Detallada del Componente TaskItem (`TaskItem.jsx`)

El componente `TaskItem` es responsable de renderizar la representación visual de una única tarea dentro de la lista. Gestiona tanto el modo de visualización normal como el modo de edición.

## Propósito y Responsabilidades

-   **Visualización de Tarea:** Muestra la información clave de una tarea (título, descripción, fecha límite) y su estado (completada o pendiente).
-   **Interacciones del Usuario:** Proporciona controles para que el usuario interactúe con la tarea: marcar/desmarcar, eliminar, editar y ver detalles en un modal.
-   **Modo Edición:** Renderiza condicionalmente un formulario para editar los detalles de la tarea cuando `isEditing` es `true`.
-   **Comunicación con el Padre:** Llama a las funciones handler (recibidas como props) para notificar al componente `App` (a través de `TaskList`) sobre las acciones del usuario.

## Props

`TaskItem` recibe un conjunto detallado de props de `TaskList`:

-   **`task` (PropTypes.object.isRequired):** El objeto que contiene todos los datos de la tarea a mostrar (`id`, `title`, `description`, `dueDate`, `completed`).
-   **`onToggle` (PropTypes.func.isRequired):** Función a llamar cuando se hace clic en el checkbox.
-   **`onDelete` (PropTypes.func.isRequired):** Función a llamar cuando se hace clic en el botón de eliminar (✖).
-   **`onEdit` (PropTypes.func):** Función a llamar cuando se hace clic en el botón de editar (✎).
-   **`isEditing` (PropTypes.bool):** Booleano que determina si se debe renderizar el modo de visualización (`false`) o el modo de edición (`true`).
-   **`editValues` (PropTypes.object):** Objeto con los valores actuales del formulario de edición (controlado por `App`).
-   **`onEditChange` (PropTypes.func):** Función a llamar cuando cambia el valor de un input en el modo edición.
-   **`onEditSave` (PropTypes.func):** Función a llamar cuando se envía el formulario de edición.
-   **`onEditCancel` (PropTypes.func):** Función a llamar cuando se hace clic en el botón "Cancelar" en el modo edición.
-   **`onCardClick` (PropTypes.func):** Función a llamar cuando se hace clic en el área principal de la card (no en los botones/checkbox).

## Renderizado Condicional (`isEditing`)

El componente utiliza una estructura `if (isEditing) { ... } else { ... }` (implícita, ya que el `return` dentro del `if` detiene la ejecución si es `true`) para determinar qué interfaz mostrar:

### Modo Edición (`isEditing === true`)

-   Renderiza un `div` con las clases `task-item editing`.
-   Dentro, renderiza un `<form>`:
    -   `onSubmit`: Llama a `e.preventDefault()` para evitar recarga y luego a `onEditSave()`.
    -   Contiene inputs (`text`, `date`) para `title`, `description`, y `dueDate`.
        -   `name`: Corresponde a las claves en `editValues` (`title`, `description`, `dueDate`).
        -   `value={editValues.propiedad}`: Vincula el valor del input al estado `editValues` del `App`.
        -   `onChange={onEditChange}`: Llama a la función `handleEditChange` de `App` para actualizar `editValues` en tiempo real.
        -   `required` en el título.
    -   Renderiza dos botones:
        -   `Guardar` (`type="submit"`): Envía el formulario.
        -   `Cancelar` (`type="button"`): Llama a `onEditCancel()` al hacer clic.

### Modo Visualización (`isEditing === false`)

-   Renderiza un `div` principal con la clase `task-item` y condicionalmente la clase `completed` si `task.completed` es `true`.
-   **`onClick` en el div principal:**
    -   Llama a `onCardClick()` si existe, pero *solo si* el clic no ocurrió directamente sobre el checkbox o los botones de editar/eliminar. Esto se logra verificando `e.target.classList`.
    -   Añade `cursor: pointer` si `onCardClick` está disponible.
-   **Checkbox (`<input type="checkbox">`):**
    -   `checked={task.completed}`: Su estado visual depende de la propiedad `completed` de la tarea.
    -   `onChange={onToggle}`: Llama a la función `onToggle` (que en `App` es `handleToggle`) cuando se hace clic.
    -   `className="task-checkbox"`
-   **Contenido (`div.task-content`):**
    -   Muestra el `<h3>{task.title}</h3>`.
    -   Muestra condicionalmente `<p>{task.description}</p>` si `task.description` existe.
    -   Muestra condicionalmente `<p>{task.dueDate}</p>` si `task.dueDate` existe.
-   **Botones de Acción:**
    -   Un `div` contenedor para los botones.
    -   Botón Eliminar (`<button className="delete-button">✖</button>`):
        -   `onClick={onDelete}`: Llama a la función `onDelete` (que en `App` es `handleDelete`).
    -   Botón Editar (`<button className="edit-button">✎</button>`):
        -   `onClick={onEdit}`: Llama a la función `onEdit` (que en `App` es `handleEdit`).

## Estilos (`TaskItem.css`)

-   Define la apariencia base de `.task-item` usando `grid` para la disposición del checkbox, contenido y botones.
-   Aplica estilos diferentes para el estado `.completed` (fondo gris, texto tachado).
-   Define estilos específicos para el modo `.editing`, asegurando que el formulario sea visible y funcional.
-   Estiliza los elementos internos como `.task-checkbox`, `.task-content`, `.task-title`, `.task-description`, `.task-date`, `.delete-button`, `.edit-button`, `.save-button`, `.cancel-button`, incluyendo efectos `:hover`.
