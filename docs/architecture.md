# Arquitectura del Proyecto — mi-portafolio

> 📐 [Ver diagrama interactivo MVC](./mvc-diagram.html)

---

## Patrón Arquitectónico

Este proyecto implementa una **arquitectura MVC adaptada a React**, combinada con:

- **Feature-Based Structure** — carpetas por responsabilidad
- **Custom Hooks Pattern** — lógica de estado reutilizable en `hooks/`
- **Micro-frontend** — `apps/CartaNovia` como sub-aplicación aislada

---

## Estructura de Carpetas

```
mi-portafolio/
├── src/
│   ├── apps/
│   │   └── CartaNovia/          # Micro-app independiente
│   ├── assets/                  # Imágenes, fuentes, recursos estáticos
│   ├── components/              # Componentes reutilizables (VIEW)
│   │   ├── ArticleModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectModal.jsx
│   │   └── SearchModal.jsx
│   ├── controllers/             # Lógica de control (CONTROLLER)
│   │   └── useProjectsController.js
│   ├── hooks/                   # Custom hooks (CONTROLLER)
│   ├── models/                  # Datos y esquemas (MODEL)
│   │   ├── components.data.js
│   │   ├── components.model.js
│   │   ├── materials.data.js
│   │   ├── project-logs.data.js
│   │   ├── projects.data.js
│   │   ├── software.data.js
│   │   └── software.model.js
│   ├── views/                   # Páginas/rutas (VIEW)
│   │   ├── AboutSection.jsx
│   │   ├── BlogPost.jsx
│   │   ├── BlogSection.jsx
│   │   ├── ComingSoon.jsx
│   │   ├── ComponentDetail.jsx
│   │   ├── ComponentsSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── MaterialsSection.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── SoftwareApp.jsx
│   │   ├── SoftwareDetail.jsx
│   │   └── SoftwareSection.jsx
│   ├── App.jsx                  # Raíz: router + rutas
│   ├── App.css
│   └── main.jsx                 # Entry point
├── public/
├── docs/
│   ├── architecture.md          # Este archivo
│   └── mvc-diagram.html         # Diagrama interactivo
├── firebase.json
├── package.json
└── vite.config.js
```

---

## Las 3 Capas MVC

### 🗄 MODEL — Datos & Estado
**Ubicación:** `src/models/`

Gestiona todos los datos del portafolio. Separa los datos crudos (`*.data.js`) de los esquemas/estructuras (`*.model.js`).

| Archivo | Responsabilidad |
|---|---|
| `projects.data.js` | Lista de proyectos del portafolio |
| `software.data.js` | Aplicaciones de software creadas |
| `software.model.js` | Estructura/esquema de un software |
| `components.data.js` | Componentes UI documentados |
| `components.model.js` | Estructura de un componente |
| `materials.data.js` | Materiales de apoyo |
| `project-logs.data.js` | Logs de actualizaciones de proyectos |

---

### ⚙️ CONTROLLER — Lógica de Control
**Ubicación:** `src/controllers/`, `src/hooks/`

Orquesta la comunicación entre Model y View. Procesa acciones y decide qué datos enviar a qué vista.

| Archivo | Responsabilidad |
|---|---|
| `useProjectsController.js` | Filtrado y ordenamiento de proyectos |
| `hooks/useDarkMode` | Estado del tema oscuro/claro |
| `Navbar.jsx` (config) | NAV_LINKS, SOCIAL, configuración global |
| `SoftwareApp.jsx` | SEO dinámico (`updateSEO`) |

---

### 🖥 VIEW — Interfaz de Usuario
**Ubicación:** `src/views/`, `src/components/`, `src/apps/`

Todo lo que el usuario ve. Páginas completas en `views/` y piezas reutilizables en `components/`.

---

## Rutas (App.jsx)

| Ruta | Componente |
|---|---|
| `/` | `ComingSoon` |
| `/blog` | `BlogSection` |
| `/blog/:id` | `BlogPost` |
| `/proyectos` | `ProjectsSection` |
| `/proyectos/:id` | `ProjectDetail` |
| `/materiales` | `MaterialsSection` |
| `/sobre-mi` | `AboutSection` |
| `/contacto` | `ContactSection` |
| `/componentes` | `ComponentsSection` |
| `/componentes/:id` | `ComponentDetail` |
| `/software` | `SoftwareSection` |
| `/software/:id` | `SoftwareDetail` |
| `/software/:id/app` | `SoftwareApp` |

---

## Stack Tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| UI | React | ^19.2.3 |
| Routing | React Router DOM | ^7.13.0 |
| Build | Vite | ^7.2.4 |
| Iconos | React Icons | ^5.5.0 |
| Matemáticas | React KaTeX + KaTeX | ^3.1.0 |
| Email | EmailJS Browser | ^4.4.1 |
| Linting | ESLint | ^9.39.1 |

---

## Flujo de Datos

```
Usuario
  │
  ▼ (interacción)
VIEW (components/ + views/)
  │
  ▼ (evento)
CONTROLLER (controllers/ + hooks/)
  │
  ▼ (consulta/actualiza)
MODEL (models/)
  │
  ▼ (nuevo estado)
CONTROLLER
  │
  ▼ (props/state)
VIEW (re-renderiza)
  │
  ▼
Usuario ve el cambio
```