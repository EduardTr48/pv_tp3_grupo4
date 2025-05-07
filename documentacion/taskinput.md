# Documentación Detallada del Componente TaskInput (`TaskInput.jsx`)

El componente `TaskInput` proporciona la interfaz de usuario para que los usuarios puedan agregar nuevas tareas a la aplicación. Es un componente de formulario autocontenido.

## Propósito y Responsabilidades

-   **Interfaz de Usuario:** Renderiza los campos de entrada (input) necesarios para crear una nueva tarea: título, descripción y fecha límite.
-   **Gestión de Estado Local:** Mantiene el estado interno de los valores ingresados por el usuario en los campos del formulario utilizando el hook `useState`.
-   **Manejo de Envío:** Gestiona el evento `onSubmit` del formulario.
-   **Validación Simple:** Realiza una validación básica (verifica que el título no esté vacío) antes de proceder.
-   **Comunicación con el Padre:** Llama a la función `onAddTask` (recibida como prop) para pasar los datos de la nueva tarea al componente `App`.
-   **Limpieza del Formulario:** Restablece los campos del formulario a sus valores iniciales después de agregar una tarea exitosamente.

## Estado (`useState`)

`TaskInput` utiliza `useState` para controlar los valores de cada campo del formulario:

1.  **`title` / `setTitle`:**
    -   **Propósito:** Almacena el valor actual del input del título.
    -   **Inicialización:** `''` (string vacío).
    -   **Modificación:** Se actualiza mediante `setTitle(e.target.value)` en el `onChange` del input del título. Se limpia (`setTitle('')`) en `handleSubmit` después de agregar la tarea.

2.  **`description` / `setDescription`:**
    -   **Propósito:** Almacena el valor actual del input de la descripción.
    -   **Inicialización:** `''`.
    -   **Modificación:** Se actualiza mediante `setDescription(e.target.value)` en el `onChange` del input de descripción. Se limpia (`setDescription('')`) en `handleSubmit`.

3.  **`dueDate` / `setDueDate`:**
    -   **Propósito:** Almacena el valor actual del input de fecha límite.
    -   **Inicialización:** `''`.
    -   **Modificación:** Se actualiza mediante `setDueDate(e.target.value)` en el `onChange` del input de fecha. Se limpia (`setDueDate('')`) en `handleSubmit`.

## Funciones (Handlers)

-   **`handleSubmit(e)`:**
    -   **`e.preventDefault()`:** Previene el comportamiento predeterminado del navegador de recargar la página al enviar un formulario.
    -   **`if (!title.trim()) return;`:** Validación: Si el `title`, después de quitarle espacios en blanco al inicio y final (`trim()`), está vacío, la función termina y no se agrega la tarea.
    -   **`onAddTask({ title, description, dueDate });`:** Llama a la función `onAddTask` recibida como prop, pasándole un objeto que contiene los valores actuales de los estados `title`, `description` y `dueDate`. Esto delega la lógica de agregar la tarea al componente padre (`App`).
    -   **`setTitle(''); setDescription(''); setDueDate('');`:** Limpia los campos del formulario restableciendo los estados locales a strings vacíos, dejando el formulario listo para agregar otra tarea.

## Props

-   **`onAddTask` (PropTypes.func.isRequired):**
    -   **Descripción:** Una función proporcionada por el componente padre (`App`). `TaskInput` llama a esta función cuando el formulario se envía válidamente.
    -   **Uso:** Es esencial para comunicar la nueva tarea al estado principal de la aplicación.

## Renderizado (JSX)

-   Renderiza un elemento `<form>` con la clase CSS `task-input-form` y asigna la función `handleSubmit` al evento `onSubmit`.
-   Dentro del formulario:
    -   Un `<input type="text">` para el **Título**:
        -   `placeholder="Título"`
        -   `value={title}`: Vincula el valor del input al estado `title`.
        -   `onChange={e => setTitle(e.target.value)}`: Actualiza el estado `title` cada vez que el usuario escribe.
        -   `required`: Atributo HTML5 para indicar que este campo es obligatorio.
        -   `className="task-input"`
    -   Un `<input type="text">` para la **Descripción**:
        -   `placeholder="Descripción"`
        -   `value={description}`: Vinculado al estado `description`.
        -   `onChange={e => setDescription(e.target.value)}`: Actualiza el estado `description`.
        -   `className="task-input"`
    -   Un `<input type="date">` para la **Fecha Límite**:
        -   `value={dueDate}`: Vinculado al estado `dueDate`.
        -   `onChange={e => setDueDate(e.target.value)}`: Actualiza el estado `dueDate`.
        -   `className="task-input"`
    -   Un `<button type="submit">`:
        -   Texto: "Agregar".
        -   `className="task-input-btn"`

## Estilos (`TaskInput.css`)

-   El archivo `TaskInput.css` (importado en el componente) define los estilos para `.task-input-form`, `.task-input`, y `.task-input-btn`, proporcionando un diseño moderno y coherente con el resto de la aplicación. Utiliza `flexbox` para la disposición, bordes redondeados, padding adecuado y efectos `:hover` y `:focus` para mejorar la interactividad.
