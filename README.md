# mi-portafolio

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

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| 🗄 **Model** | `src/models/` | Datos, esquemas, estructuras |
| ⚙️ **Controller** | `src/controllers/`, `src/hooks/` | Lógica, filtros, estado |
| 🖥 **View** | `src/views/`, `src/components/` | UI, páginas, componentes |

> 📊 [Ver diagrama interactivo de arquitectura](./docs/mvc-diagram.html)
> 
> 📄 [Ver documentación detallada](./docs/architecture.md)

---

## 📁 Estructura

```
src/
├── apps/CartaNovia/     # Micro-app independiente
├── assets/              # Recursos estáticos
├── components/          # Componentes reutilizables
├── controllers/         # Lógica de control
├── hooks/               # Custom hooks
├── models/              # Datos y esquemas
└── views/               # Páginas (14 rutas)
```

---

## 🗺 Rutas

| Ruta | Vista |
|---|---|
| `/` | Coming Soon |
| `/blog` | Blog |
| `/proyectos` | Proyectos |
| `/materiales` | Materiales de Apoyo |
| `/componentes` | Componentes |
| `/software` | Software |
| `/sobre-mi` | About |
| `/contacto` | Contacto |

---

## 🛠 Stack

- **React** ^19.2.3
- **React Router DOM** ^7.13.0
- **Vite** ^7.2.4
- **React Icons** ^5.5.0
- **KaTeX** — renderizado de matemáticas
- **EmailJS** — formulario de contacto
- **Firebase** — backend/hosting
