# Gestor de Tareas Inteligente

Sistema web colaborativo para gestión de tareas con integración de inteligencia artificial (Gemini), desarrollado con React, Spring Boot y PostgreSQL.

## 📁 Estructura del Proyecto

```
gestor-tareas/
│
├── backend/                  # Backend en Spring Boot
│   ├── controller/           # Controladores REST
│   ├── service/              # Servicios con lógica de negocio
│   ├── model/                # Entidades (Tarea, Estado)
│   ├── repository/           # Repositorios JPA
│   └── application.properties
│
├── frontend/                 # Frontend en React + Vite + Material UI
│   ├── src/
│   │   ├── components/       # TareaList, TareaForm, EditarTareaDialog, etc.
│   │   ├── pages/            # Página principal (Home.jsx)
│   │   ├── api/              # Conexiones al backend y API Gemini
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Instalación y Ejecución

### 🔹 Backend (Spring Boot + PostgreSQL)

1. Clona el repositorio y entra al directorio `backend/`
2. Asegúrate de tener PostgreSQL corriendo y crea una base de datos:
   ```sql
   CREATE DATABASE gestor_tareas;
   ```
3. Configura `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/gestor_tareas
   spring.datasource.username=postgres
   spring.datasource.password=tu_contraseña
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```
4. Ejecuta el backend:
   ```bash
   ./mvnw spring-boot:run
   ```
   o desde tu IDE favorito.

### 🔹 Frontend (React + Vite + Material UI)

1. En el directorio `frontend/`, instala dependencias:
   ```bash
   npm install
   ```

2. Crea un archivo `.env` y coloca tu clave de Gemini:
   ```env
   VITE_GEMINI_API_KEY=tu_clave_google_gemini
   ```

3. Ejecuta el frontend:
   ```bash
   npm run dev
   ```

4. Accede a la app en `http://localhost:5173`

---

## ✨ Funcionalidades

- Crear, editar, eliminar y listar tareas
- Filtrado de tareas por estado
- Edición inline del estado desde las tarjetas
- Interfaz responsive y moderna con Material UI
- Modal para edición de tareas
- **Integración con IA Gemini**:
  - 🧠 Generar resumen automático de tareas
  - 🔢 Sugerir prioridades
  - ✍ Autocompletar descripciones

---

## 🧠 Arquitectura y Buenas Prácticas

- **Frontend**:
  - Hooks (`useState`, `useEffect`)
  - Componentes reutilizables
  - `Snackbar` y `Dialog` para UX
  - Responsive con `Grid` y `Stack`
  - Separación lógica (API, componentes, páginas)

- **Backend**:
  - Controladores REST con `@RestController`
  - Validación de relaciones (estado válido)
  - Repositorio JPA para consultas por estado
  - Diseño limpio con `@Service`, `@Repository`, `@Entity`

---

## 🛠 Tecnologías Utilizadas

| Tecnología     | Descripción                          |
|----------------|--------------------------------------|
| React + Vite   | Frontend rápido y modular            |
| Material UI    | Componentes visuales y responsivos   |
| Spring Boot    | Backend REST                         |
| PostgreSQL     | Base de datos relacional             |
| Gemini API     | IA de Google para resumen y más      |
| Axios          | Peticiones HTTP                      |

---

## 🧪 Requisitos Cumplidos de la Prueba

- [x] CRUD completo de tareas
- [x] Filtro por estado
- [x] Edición con modal (✏️)
- [x] UI responsive y profesional
- [x] Sugerencias de IA (resumen y prioridad)
- [x] Autocompletado de descripción
- [x] Grabación de sustentación (pendiente subir)
- [x] Buenas prácticas frontend y backend

---

## 📞 Contacto

Desarrollado por: [Emanuel Rios Ricardo]  
Correo: [riosricmanu21@gmail.com]  
GitHub: [https://github.com/Emanuel2106]
