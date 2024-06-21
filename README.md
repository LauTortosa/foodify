# FOODIFY PLANNER 
Aplicación web para la organización y planificación de trabajo de una empresa de alimentación.

## Estado del proyecto
**En desarrollo:** Implementando nuevas funcionalidades del backend.

## Tecnologías utilizadas
- **Backend:**
  - Django: Framework 
  - Django Ninja: Biblioteca para la creación de APIs.
  - Pydantic: Validación de datos. 

- **Frontend:**
  - React: Próximamente

- **Testing:**
  - Unittest

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
5. Ejecutar servidor
```
python manage.py runserver
```

## Licencia
Este proyecto está bajo la Licencia MIT.
