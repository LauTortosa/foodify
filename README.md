# FOODIFY PLANNER 
Aplicación web para la organización y planificación de trabajo de una empresa de alimentación.

## Estado del proyecto
**En desarrollo:** Todas las funcionalidades están implementadas. Actualmente, trabajando en validaciones, refactorización y filtos.

## Tecnologías utilizadas
**Backend:**
- Django: Framework 
- Django Ninja: Biblioteca para la creación de APIs.
- Pydantic: Validación de datos. 

**Frontend:**
- React: Framework.
- React Router: Biblioteca para manejar el enrutamiento.
- Axios: Cliente HTTP para hacer peticiones a las APIs.
- Tailwind CSS: Framework de CSS para los estilos.  

**Testing:**
- Unittest

## Funcionalidades
- Gestión de planificación de un producto a fabricar (creación, edición y eliminación).
- Listado de planificaciones creadas.
- Consulta de datos de cada producto.
- Cálculo de los kilos totales que hacen falta para la producción.
- Consulta de planificaciones que están en estado 'registrado'.
- Lista de tareas.
- Muestra de las planificaciones que faltan por preparar y registrar.

## Funcionalidades futuras
- Autenticación de usuarios.
- Implementación de registro de horas trabajadas en cada planificación.
- Generar pdf con los kilos totales de los productos seleccionados.

## Estructura del Proyecto
- `foodify_project/`: Directorio principal del proyecto.
- `planning/`: Aplicación para gestionar planificaciones.
- `product/`: Aplicación para gestionar productos.
- `calculated_kilograms/`: Aplicación para calcular kilogramos de los productos que se van a preparar.
- `task/`: Aplicación para gestionar tareas pendientes.

## Instalación
1. Clonar repositorio
```
git clone https://github.com/tu-usuario/foodify-planner.git
cd foodify-planner
```
2. Crear entorno virtual
```
python -m venv venv
```
* Activar entorno virtual en Windows
```
source venv/bin/activate
```
* Activar entorno virtual en Linux/macOS
```
source venv/bin/activate
```
3. Instalar dependencias
```
pip install -r requirements.txt
```
4. Configurar base de datos
```
python manage.py migrate
```
5. Crear usuario admin
```
python manage.py createsuperuser
```
6. Ejecutar servidor
```
python manage.py runserver
```

## Datos Iniciales
Es necesario añadir datos iniciales en el modelo 'productComponent' desde el panel de administración (http://localhost:8000/admin/).

## Licencia
Este proyecto está bajo la Licencia MIT.
