# FOODIFY PLANNING 
Aplicación web para la organización y planificación del trabajo de una empresa de alimentación.

## 🛠️ Tecnologías utilizadas
**Backend:**
- Django.
- Django Ninja: Biblioteca para la creación de APIs.
- Pydantic: Validación de datos. 

**Frontend:**
- React + Vite.
- React Router: Biblioteca para manejar el enrutamiento.
- Axios: Cliente HTTP para hacer peticiones a las APIs.
- Tailwind CSS: Estilo ágil y responsive.   

**Testing:**
- Unittest

**Despliegue**:
- Dominio: Prototipo desplegado en [https://foodifyplanning.es](https://foodifyplanning.es)
- Hosting: VPS OVH con Ubuntu.
- Base de datos: PostgreSQL.
- Servidor web: Guinicorn + Nginx.
- Variables de entorno: Archivo `.env`.

## ✅ Funcionalidades
**🧾 Gestión de trabajo:**
- Crear, editar y eliminar trabajos. 
- Listado todos los trabajos creados.
- Consulta de detalles de cada trabajo.
- Cálculo de los kilos automático necesarios por receta y planificación.
- Creación y listado de eventos programados con fecha, hora, duración y ubicación.

**🗓️ Consulta y seguimiento de trabajo:**
- Visualización en una tabla de los trabajos en estado 'registrado'.
- Listado de tareas pendientes.
- Identificación de los trabajos que faltan por preparar y registrar mediante una tabla.
- Generación de pdf en forma de informe sobre el cálculo de kilos y el diario de trabajo. 

**👥 Autenticación de usuarios:**
- Login y logout con validación.
- Roles:
  - Operario: Consulta de datos y trabajos, registro de tareas y trabajo realizado.
  - Gestión: Controla la gestión del trabajo.

## 📌 Novedades de la versión 2
- Nuevo modelo `Event`.
- Creación y eliminación de eventos desde el frontend.
- Visualización mejorada en la vista de inicio.
- Refactorización de vistas.
- Mejoras de estilo en botones, cards, modales y añadido de emojis.
- Implementación del hook `generatePdf`.
  

## 📁 Estructura del Proyecto
```bash
foodify/
├── backend/
│   ├── planning/
│   ├── product/
│   ├── task/
│   ├── event/
│   ├── users/
│   ├── calculated_kilograms/
├── frontend/
|   ├── api/
│   ├── assets/    
│   ├── components/
│   ├── hooks/
│   ├── routes/
│   ├── views/
```

## ⚙️ Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/foodify-planner.git
cd foodify-planner

# 2. Crear entorno virtual
python -m venv venv

# 3. Activarlo
source venv/bin/activate

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Migrar la base de datos
python manage.py migrate

# 6. Crear un superusuario
python manage.py createsuperuser

# 7. Ejecutar el servidor
python manage.py runserver
```

## 📊 Datos iniciales
- Acceder a `http://localhost:8000/admin/` para crear productos y componentes necesarios. 

## 🌐 Prototipo en línea
- Prueba de la app en:  
🔗 [http://foodifyplanning.es](http://foodifyplanning.es)

### 👤 Usuarios disponibles
| Rol      | Usuario     | Contraseña |
| -------- | ----------- | ---------- |
| Gestión  | gestion     | gest1234   |
| Operario | operario    | oper1234   |

**Nota:** Los datos ingresados son para pruebas y se eliminan periódicamente.

## 📅 Próximas funcionalidades
- Registro de horas trabajadas por usuario.
- Gestión de documentos internos.
- Iconografía para recetas.
  
## 📝 Licencia
- MIT License.

## 📬 Contacto
Si tines preguntas o sugerencias, puedes contactarme en:
📧 [lau.tortosa@gmail.com](lau.tortosa@gmail.com)
