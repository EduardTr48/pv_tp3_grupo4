# Documentación General del Proyecto Gestor de Tareas

Este documento proporciona una visión general detallada del proyecto Gestor de Tareas, incluyendo sus objetivos, estructura de archivos, tecnologías, conceptos clave de React utilizados y una descripción de los componentes principales.

## Propósito y Objetivos

El proyecto Gestor de Tareas es una aplicación web minimalista desarrollada con React y Vite. Su propósito principal es servir como un ejemplo práctico para aprender y aplicar conceptos fundamentales de React, como:

-   **Arquitectura basada en componentes:** Dividir la interfaz de usuario en piezas reutilizables.
-   **Props:** Pasar datos de componentes padres a hijos.
-   **State:** Gestionar datos que cambian con el tiempo dentro de un componente.
-   **Hooks (useState):** Utilizar funciones especiales de React para añadir estado y otras características a componentes funcionales.
-   **Manejo de eventos:** Responder a interacciones del usuario (clics, escritura en formularios).
-   **Renderizado condicional:** Mostrar diferentes elementos de la interfaz según el estado de la aplicación.
-   **Listas y Keys:** Renderizar listas de elementos de forma eficiente.

La aplicación permite a los usuarios agregar, listar (separando pendientes y completadas), marcar como completadas, editar, eliminar y buscar tareas.

## Estructura de Archivos Detallada

```
pv_tp3_grupo4/
├── documentacion/          # Documentación del proyecto (archivos .md)
│   ├── general.md          # Este archivo
│   ├── app.md              # Documentación del componente App
│   ├── taskinput.md        # Documentación del componente TaskInput
│   ├── tasklist.md         # Documentación del componente TaskList
│   └── taskitem.md         # Documentación del componente TaskItem
├── pv_tp3_grupo4/         # Carpeta principal del proyecto React
│   ├── src/                # Código fuente de la aplicación
│   │   ├── assets/         # Recursos estáticos (CSS)
│   │   │   └── css/        # Archivos CSS específicos (App.css, index.css, TaskItem.css, TaskInput.css)
│   │   ├── components/     # Componentes React reutilizables
│   │   │   ├── TaskInput.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── App.jsx         # Componente raíz de la aplicación, gestiona el estado principal
│   │   ├── App.css         # Estilos específicos del componente App (movido a assets/css)
│   │   ├── main.jsx        # Punto de entrada: renderiza el componente App en el DOM
│   │   └── index.css       # Estilos globales (movido a assets/css)
│   ├── public/             # Archivos públicos servidos directamente (ej: favicon)
│   ├── .gitignore          # Especifica archivos y carpetas que Git debe ignorar (ej: node_modules)
│   ├── eslint.config.js    # Configuración de ESLint para el análisis estático del código
│   ├── index.html          # Plantilla HTML principal donde se monta la aplicación React
│   ├── package.json        # Define metadatos del proyecto, dependencias y scripts (npm start, build, etc.)
│   ├── README.md           # Descripción general del proyecto y cómo ejecutarlo
│   └── vite.config.js      # Configuración específica de Vite (plugins, servidor de desarrollo)
└── README.md               # README general del repositorio (puede ser el mismo que el interno)
```

## Tecnologías Utilizadas

-   **React (v18+):** Biblioteca de JavaScript para construir interfaces de usuario interactivas y basadas en componentes. Se utilizan principalmente **Componentes Funcionales** y **Hooks**.
-   **Vite:** Entorno de desarrollo y herramienta de construcción extremadamente rápida. Proporciona un servidor de desarrollo con Hot Module Replacement (HMR) y optimiza la construcción para producción.
-   **JavaScript (ES6+):** Lenguaje de programación principal.
-   **CSS:** Para estilizar los componentes y la aplicación en general. Se usan archivos CSS separados por componente y estilos globales.
-   **ESLint:** Herramienta para identificar y corregir problemas en el código JavaScript, manteniendo un estilo consistente y previniendo errores.
-   **PropTypes:** Biblioteca para validar los tipos de las props pasadas a los componentes, útil para la detección temprana de errores durante el desarrollo.

## Conceptos Clave de React Utilizados

-   **Componentes Funcionales:** La mayoría de los componentes (`App`, `TaskInput`, `TaskList`, `TaskItem`) son funciones de JavaScript que devuelven JSX.
-   **JSX:** Extensión de sintaxis que permite escribir HTML dentro de JavaScript, facilitando la creación de la estructura de la interfaz.
-   **Estado (`useState`):** Se utiliza el hook `useState` para gestionar datos que pueden cambiar y que, al cambiar, provocan una nueva renderización del componente. Ejemplos: la lista de tareas, el texto en un input, el ID de la tarea en edición.
-   **Props:** Los componentes reciben datos de sus padres a través de `props`. Por ejemplo, `TaskList` recibe la lista de `tasks` de `App`. `TaskItem` recibe los datos de una `task` individual y funciones (handlers) de `TaskList`.
-   **Manejo de Eventos:** Se utilizan atributos como `onClick`, `onChange`, `onSubmit` para ejecutar funciones cuando el usuario interactúa con elementos del DOM (botones, inputs, formularios).
-   **Renderizado Condicional:** Se usa el operador ternario (`condition ? <JSX1> : <JSX2>`) y el operador `&&` (`condition && <JSX>`) para mostrar u ocultar elementos JSX según el estado (ej: mostrar el formulario de edición en `TaskItem`, mostrar el modal en `App`, mostrar "No hay tareas" en `TaskList`).
-   **Listas y Keys:** Se utiliza el método `map()` para iterar sobre arrays (como la lista de tareas) y renderizar un componente (`TaskItem`) por cada elemento. Es crucial usar la prop `key` con un valor único (como `task.id`) para que React pueda identificar y actualizar eficientemente cada elemento de la lista.

## Componentes Principales (Resumen)

1.  **`App.jsx`:** Orquesta la aplicación. Mantiene el estado principal (tareas, edición, modal, búsqueda) y define las funciones (handlers) para modificar ese estado. Pasa datos y funciones a los componentes hijos.
2.  **`TaskInput.jsx`:** Formulario autocontenido para agregar nuevas tareas. Gestiona su propio estado interno para los campos del formulario y llama a una función prop (`onAddTask`) para notificar a `App` cuando se agrega una tarea.
3.  **`TaskList.jsx`:** Componente de presentación que recibe una lista de tareas y las renderiza usando `TaskItem`. No gestiona estado complejo, solo recibe datos y funciones como props. Puede mostrar un título y un mensaje si la lista está vacía.
4.  **`TaskItem.jsx`:** Representa una única tarea. Muestra los detalles de la tarea y los botones de acción (completar, eliminar, editar). Renderiza condicionalmente el modo de visualización o el modo de edición. Llama a funciones prop (`onToggle`, `onDelete`, `onEdit`, etc.) para interactuar con el estado en `App`.
