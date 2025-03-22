 

Un juego estilo Monster Hunter desarrollado con React y Node.js, inspirado en el arte de Pokémon Platino y The Legend of Zelda GBA.

## Características

- 🎮 Interfaz en estilo 8-bit con pixel art
- ⚔️ 14 armas diferentes con combos únicos
- 🐉 Dragones y monstruos con patrones de ataque únicos
- 🌍 Mundo abierto explorable
- 📈 Sistema de experiencia y nivelado
- 👤 Personalización de personaje
- 💾 Guardado automático de progreso

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd reactjs-8bit-monsterhuntermon
```

2. Instala las dependencias:
```bash
npm run install-all
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_jwt
PORT=5000
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000` y el backend en `http://localhost:5000`.

## Estructura del Proyecto

```
reactjs-8bit-monsterhuntermon/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── assets/       # Recursos (imágenes, sonidos)
│   │   ├── contexts/     # Contextos de React
│   │   ├── hooks/        # Hooks personalizados
│   │   ├── pages/        # Páginas de la aplicación
│   │   └── utils/        # Utilidades
│   └── public/           # Archivos estáticos
├── server/               # Backend Node.js
│   ├── config/          # Configuraciones
│   ├── controllers/     # Controladores
│   ├── models/         # Modelos de MongoDB
│   ├── routes/         # Rutas de la API
│   └── middleware/     # Middleware
└── package.json
```

## Estructura basica del proyecto
Backend:
    Servidor Express con MongoDB
    Modelos para usuarios, armas y monstruos
    Sistema de autenticación con JWT
    Controladores para el juego y la autenticación
    Rutas protegidas y públicas
Frontend:
    Configuración de Vite
    Tema y estilos globales con Styled Components
    Sistema de autenticación con Zustand
    Páginas de inicio, registro e inicio de sesión
    Componente de navegación
    Para continuar con el desarrollo, necesitaríamos:
    Crear las páginas del juego:
    Página principal del juego con el mapa
    Interfaz de combate
    Perfil del personaje
    Inventario y equipamiento
    Implementar la lógica del juego:
    Sistema de combate
    Gestión de inventario
    Progresión del personaje
    Guardado automático
    Agregar assets:
    Sprites de personajes
    Sprites de monstruos
    Sprites de armas
    Efectos de sonido y música

## Tecnologías Utilizadas

- Frontend:
  - React.js
  - Vite
  - Styled Components
  - React Router
  - Context API

- Backend:
  - Node.js
  - Express
  - MongoDB
  - JWT para autenticación
  - Socket.io para tiempo real

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.