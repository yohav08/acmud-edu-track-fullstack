# PROFESORES

## Cliente / Servicio CRUD para profesores

Aquí podrás encontrar todo para las pruebas en postman

### **PREREQUISITO**
Antes de crear un profesor, debes tener un **usuario con rol "Profesor"** creado. El profesor comparte el mismo ID con el usuario.

### **POST - Creación de profesor**

Ejemplo para la creación de un profesor
```
POST http://localhost:3000/users
```

Header
```
Content-Type: application/json
```

Datos para crear user
```
POST http://localhost:3000/users

{
  "name": "Carlos López",
  "email": "carlos.lopez@email.com",
  "password": "Profesor123",
  "rol": "Profesor"
}
```
Crear profesor usando el ID del usuario
```
{
  "id": "64f2614e-ccd7-4441-97e2-21b501248828",
  "especialidad": "Matemáticas Avanzadas"
}
```

Respuesta esperada para éxito - Body:
```
{
    "message": "El profesor fue guardado exitosamente",
    "teacher": {
        "id": "64f2614e-ccd7-4441-97e2-21b501248828",
        "especialidad": "Matemáticas Avanzadas",
        "user": {
            "id": "64f2614e-ccd7-4441-97e2-21b501248828",
            "name": "Carlos López",
            "email": "carlos.lopez@email.com",
            "rol": "Profesor"
        }
    }
}
```

Ejemplo para la creación de un profesor con usuario que no es Profesor
```
{
  "id": "64f2614e-ccd7-4441-97e2-21b501248829",
  "especialidad": "Matemáticas"
}
```

Respuesta esperada para error - Body:
```
{
    "message": "El usuario debe tener el rol de Profesor",
    "error": "Bad Request",
    "statusCode": 400
}
```

Ejemplo para la creación de un profesor que ya existe
```
{
  "id": "64f2614e-ccd7-4441-97e2-21b501248829",
  "especialidad": "Física"
}
```

Respuesta esperada para error - Body:
```
{
    "message": "Ya existe un profesor con el id 64f2614e-ccd7-4441-97e2-21b501248829",
    "error": "Bad Request",
    "statusCode": 400
}
```


### **GET - Obtención todos los profesores**

Ejemplo de obtención de todos los profesores
```
GET http://localhost:3000/teachers/getAllTeachers
```

Respuesta esperada para éxito - Body:
```
{
    "count": 1,
    "teachers": [
        {
            "id": "64f2614e-ccd7-4441-97e2-21b501248828",
            "especialidad": "Matemáticas Avanzadas",
            "id_user": {
                "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                "name": "Carlos López",
                "email": "carlos.lopez@email.com",
                "rol": "Profesor",
                "createdAt": "2025-11-19T04:23:08.608Z"
            }
        }
    ]
}
```

Cuando no hay profesores en la base de datos, la respuesta esperada - Body es:
```
{
    "count": 0,
    "teachers": []
}
```


### **GET - Obtención un profesor por su ID**

Ejemplo de obtención de un profesor por su ID
```
GET http://localhost:3000/teachers/64f2614e-ccd7-4441-97e2-21b501248828
```

Respuesta esperada para éxito - Body:
```
{
    "id": "64f2614e-ccd7-4441-97e2-21b501248828",
    "especialidad": "Matemáticas Avanzadas",
    "id_user": {
        "id": "64f2614e-ccd7-4441-97e2-21b501248828",
        "name": "Carlos López",
        "email": "carlos.lopez@email.com",
        "rol": "Profesor",
        "createdAt": "2025-11-19T04:23:08.608Z"
    }
}
```

Ejemplo de obtención de un profesor por un ID que no es de tipo UUID
```
GET http://localhost:3000/teachers/123-invalido
```

Respuesta esperada para este error - Body:
```
{
    "message": "El término de búsqueda ingresado no es un ID válido",
    "error": "Bad Request",
    "statusCode": 400
}
```

Ejemplo de obtención de un profesor por un UUID que no existe
```
GET http://localhost:3000/teachers/cceb8106-91d2-4647-b2ee-2e7b169ac154
```

Respuesta esperada para este error - Body:
```
{
    "message": "Profesor con id cceb8106-91d2-4647-b2ee-2e7b169ac154 no encontrado",
    "error": "Not Found",
    "statusCode": 404
}
```


### **GET - Obtención profesores por especialidad**

Ejemplo de obtención de profesores por especialidad
```
GET http://localhost:3000/teachers/especialidad/Matemáticas Avanzadas
```

Respuesta esperada para éxito - Body:
```
{
    "count": 1,
    "especialidad": "Matemáticas Avanzadas",
    "teachers": [
        {
            "id": "64f2614e-ccd7-4441-97e2-21b501248828",
            "especialidad": "Matemáticas Avanzadas",
            "id_user": {
                "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                "name": "Carlos López",
                "email": "carlos.lopez@email.com",
                "rol": "Profesor",
                "createdAt": "2025-11-19T04:23:08.608Z"
            }
        }
    ]
}
```

Ejemplo de obtención de profesores por especialidad inexistente
```
GET http://localhost:3000/teachers/especialidad/EspecialidadInexistente
```

Respuesta esperada para este error - Body:
```
{
    "message": "No se encontraron profesores con la especialidad: EspecialidadInexistente",
    "error": "Not Found",
    "statusCode": 404
}
```


### **PATCH - Actualización de profesor**

Ejemplo de actualización de un profesor
```
PATCH http://localhost:3000/teachers/64f2614e-ccd7-4441-97e2-21b501248828
```

Datos a actualizar
```
{
  "especialidad": "Matemáticas y Física"
}
```

Respuesta esperada para éxito - Body:
```
{
    "message": "Profesor actualizado exitosamente",
    "teacher": {
        "id": "64f2614e-ccd7-4441-97e2-21b501248828",
        "especialidad": "Matemáticas y Física",
        "id_user": {
            "id": "64f2614e-ccd7-4441-97e2-21b501248828",
            "name": "Carlos López",
            "email": "carlos.lopez@email.com",
            "rol": "Profesor",
            "createdAt": "2025-11-19T04:23:08.608Z"
        }
    }
}
```


### **DELETE - Eliminación un profesor por su ID**

Ejemplo de eliminación de profesor por su ID
```
DELETE http://localhost:3000/teachers/64f2614e-ccd7-4441-97e2-21b501248828
```

Respuesta esperada - Body:
```
{
    "message": "Se ha eliminado el profesor con id: 64f2614e-ccd7-4441-97e2-21b501248828",
    "deletedTeacher": {
        "id": "64f2614e-ccd7-4441-97e2-21b501248828",
        "especialidad": "Matemáticas y Física",
        "user": {
            "id": "64f2614e-ccd7-4441-97e2-21b501248828",
            "name": "Carlos López",
            "email": "carlos.lopez@email.com"
        }
    }
}
```

