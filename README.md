# FOODIFY PLANNING 
Aplicación web para la organización y planificación del trabajo de una empresa de alimentación.

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

**Despliegue**:
- Servidor: Prototipo desplegado en [https://foodifyplanning.es](https://foodifyplanning.es)  utilizando OVH.
- Base de datos: PostgreSQL.
- Servidor web: Guinicorn y Nginx.
- Variables de entorno: A través de un archivo `.env`.

## Funcionalidades
**Gestión de planificaciones:**
- Crear, editar y eliminar planificaciones de producción. 
- Listar todas las planificaciones creadas.
- Consultar detalles de cada producto planificado.
- Cálcular los kilos totales necesarios para la producción.

**Consulta y seguimiento:**
- Visualizar planificaciones en estado 'registrado'.
- Ver tareas pendientes.
- Identificar planificaciones que faltan por preparar y registrar.

**Autenticación de usuarios:**
- Sistema de login y logout.
- Roles:
  - Operario: Consultar datos, añadir tareas y registrar trabajo realizado.
  - Responsable: Crear, editar y supervisar planificaciones.

## Funcionalidades futuras
**Funcionalidad**
- Registro de horas trabajadas en cada planificación, para mejorar el seguimiento.
- Generación de pdf con el resumen de los kilos totales de los productos seleccionados.
- Implementación de un calendario.
- Nuevo apartado para gestionar documentos.
  
**Interfaz**
- Rediseño de la página principal y la vista planning.
- Añadir colores e iconos representativos en las recetas.

## Estructura del Proyecto
- `foodify_project/`: Contiene la configuración principal del proyecto Django.
- `planning/`: Aplicación para gestionar las planificaciones.
- `product/`: Aplicación para gestionar los productos.
- `calculated_kilograms/`: Aplicación para calcular los kilogramos de los productos que se van a preparar.
- `task/`: Aplicación para gestionar las tareas pendientes.

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
3. Activar entorno virtual:
   - En Windows
    ```
    source venv/bin/activate
    ```
   - En Linux/macOS
    ```
    source venv/bin/activate
    ```
4. Instalar dependencias
```
pip install -r requirements.txt
```
5. Configurar base de datos
```
python manage.py migrate
```
6. Crear usuario admin
```
python manage.py createsuperuser
```
7. Ejecutar servidor
```
python manage.py runserver
```
8. Añadir datos iniciales: Desde el panel de administración (http://localhost:8000/admin/), completa los datos necesarios en el modelo `productComponent

## Prototipo en línea
Puedes probar la aplicación accediendo al prototipo en el siguiente enlace: 
[Foodify Planning - Prototipo](www.foodifyplanning.es)

### Usuarios disponibles
**Responsable**
- Usuario: responsable
- Contraseña: resp1234

**Operario**
- Usuario: operario
- Contraseña: oper1234

**Nota:** Los datos ingresados son para pruebas y se eliminan periódicamente.

## Licencia
Este proyecto está bajo la Licencia MIT.

## Contacto
Si tines preguntas o sugerencias, puedes contactarme en:
[lau.tortosa@gmail.com](lau.tortosa@gmail.com)
