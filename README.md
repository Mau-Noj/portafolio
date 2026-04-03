# mi-portafolio

> 🌐 **Demo en vivo:** [mauricionoj.com](https://mauricionoj.com)
> 📖 **[Ver documentación completa](https://mau-noj.github.io/portafolio/)**

Portafolio personal desarrollado con React + Vite. Incluye blog, proyectos, componentes documentados, materiales de apoyo y aplicaciones de software.

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## 📐 Arquitectura

Este proyecto sigue un patrón **MVC adaptado a React**:

| Capa              | Carpeta                          | Responsabilidad              |
| ----------------- | -------------------------------- | ---------------------------- |
| 🗄 **Model**      | `src/models/`                    | Datos, esquemas, estructuras |
| ⚙️ **Controller** | `src/controllers/`, `src/hooks/` | Lógica, filtros, estado      |
| 🖥 **View**       | `src/views/`, `src/components/`  | UI, páginas, componentes     |

> 📊 [Ver diagrama interactivo de arquitectura](./docs/mvc-diagram.html)
>
> 📄 [Ver documentación detallada](https://mau-noj.github.io/portafolio/)

---

## 📁 Estructura

```
portafolio/
├── .github/workflows/   # CI/CD con GitHub Actions
├── docs/                # Documentación GitHub Pages
└── mi-portafolio/
    └── src/
        ├── apps/CartaNovia/     # Micro-app independiente
        ├── assets/              # Recursos estáticos
        ├── components/          # Componentes reutilizables
        ├── controllers/         # Lógica de control
        ├── hooks/               # Custom hooks
        ├── models/              # Datos y esquemas
        └── views/               # Páginas (13 rutas)
```

---

## 🗺 Rutas

| Ruta                | Vista           | Descripción                         |
| ------------------- | --------------- | ----------------------------------- |
| `/`                 | Coming Soon     | Página de bienvenida temporal       |
| `/blog`             | Blog            | Entradas con búsqueda y filtros     |
| `/blog/:id`         | BlogPost        | Detalle de una entrada              |
| `/proyectos`        | Proyectos       | Galería con filtrado por tecnología |
| `/proyectos/:id`    | ProjectDetail   | Detalle + changelog                 |
| `/materiales`       | Materiales      | Biblioteca de recursos y guías      |
| `/componentes`      | Componentes     | Catálogo de UI documentado          |
| `/componentes/:id`  | ComponentDetail | Documentación de un componente      |
| `/software`         | Software        | Aplicaciones creadas                |
| `/software/:id`     | SoftwareDetail  | Ficha técnica                       |
| `/software/:id/app` | SoftwareApp     | Lanza la micro-app                  |
| `/sobre-mi`         | About           | Perfil y trayectoria                |
| `/contacto`         | Contacto        | Formulario con EmailJS              |

---

## 🛠 Stack

| Tecnología           | Versión | Uso                    |
| -------------------- | ------- | ---------------------- |
| **React**            | ^19.2.3 | UI y manejo de estado  |
| **React Router DOM** | ^7.13.0 | Navegación SPA         |
| **Vite**             | ^7.2.4  | Bundler + HMR          |
| **React Icons**      | ^5.5.0  | Íconos SVG             |
| **KaTeX**            | ^3.1.0  | Fórmulas matemáticas   |
| **EmailJS**          | ^4.4.1  | Formulario de contacto |
| **Firebase**         | —       | Hosting + backend      |
| **ESLint**           | ^9.39.1 | Calidad de código      |
| **GitHub Actions**   | —       | CI/CD automático       |

---

## 🔄 CI/CD

Cada push a `master` dispara el pipeline automáticamente:

```
Push → GitHub Actions → npm install → npm run build → Firebase Hosting
```

No se requiere intervención manual para publicar cambios en producción.

---

## 📖 Documentación

La documentación técnica completa está disponible en GitHub Pages:

**[https://mau-noj.github.io/portafolio/](https://mau-noj.github.io/portafolio/)**

Incluye arquitectura MVC detallada, estructura de carpetas, referencia de rutas, modelos de datos y guía de contribución.
