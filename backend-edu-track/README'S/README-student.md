# ESTUDIANTES

## Cliente / Servicio CRUD para estudiantes

Aquí podrás encontrar todo para las pruebas en postman

### **PREREQUISITOS IMPORTANTES**
Antes de crear un estudiante, debes tener un **usuario con rol "Estudiante"** creado. El estudiante comparte el mismo ID con el usuario.

### **POST - Creación de estudiante**

Ejemplo para la creación de un estudiante

```
POST http://localhost:3000/students
```

Header
```
Content-Type: application/json
```

Datos para crear user
```
{
  "name": "Laura González",
  "email": "laura.gonzalez@email.com",
  "password": "Estudiante123",
  "rol": "Estudiante"
}
```
Crear estudiante  usando el ID del usuario
```
{
  "id": "74f2614e-ccd7-4441-97e2-21b501248829",
  "anio_ingreso": 2023
}
```

Respuesta esperada para éxito - Body:
```
{
    "message": "El estudiante fue guardado exitosamente",
    "student": {
        "id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "anio_ingreso": 2023,
        "user": {
            "id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "name": "Laura González",
            "email": "laura.gonzalez@email.com",
            "rol": "Estudiante"
        }
    }
}
```

Ejemplo para la creación de un estudiante  con usuario que no es estudiante 
```
{
  "id": "64f2614e-ccd7-4441-97e2-21b501248849",
  "anio_ingreso": 2023
}
```

Respuesta esperada para error - Body:
```
{
    "message": "El usuario debe tener el rol de Estudiante",
    "error": "Bad Request",
    "statusCode": 400
}
```

Ejemplo para la creación de un estudiante que ya existe
```
{
  "id": "64f2614e-ccd7-4441-97e2-21b501248829",
  "anio_ingreso": 2023
}
```

Respuesta esperada para error - Body:
```
{
    "message": "Ya existe un estudiante con el id 64f2614e-ccd7-4441-97e2-21b501248829",
    "error": "Bad Request",
    "statusCode": 400
}
```
Ejemplo para la creación de un estudiante con año de ingreso inválido
```
{
  "id": "74f2614e-ccd7-4441-97e2-21b501248829",
  "anio_ingreso": 1999
}
```

Respuesta esperada para error - Body:
```
{
    "message": ["El año de ingreso no puede ser menor a 2000"],
    "error": "Bad Request",
    "statusCode": 400
}
```


### **GET - Obtención todos los estudiantes**

Ejemplo de obtención de todos los estudiantes
```
GET http://localhost:3000/teachers/getAllStudents
```

Respuesta esperada para éxito - Body:
```
{
    "count": 1, //Aquí vemos la cantidad total
    "students": [
        {
            "id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "anio_ingreso": 2023,
            "user": {
                "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                "name": "Laura González",
                "email": "laura.gonzalez@email.com",
                "rol": "Estudiante",
                "createdAt": "2025-11-19T04:25:08.608Z"
            }
        }
    ]
}
```

Cuando no hay profesores en la base de datos, la respuesta esperada - Body es:
```
{
    "count": 0,
    "students": []
}
```


### **GET - Obtención un estudiante  por su ID**

Ejemplo de obtención de un estudiante  por su ID
```
GET http://localhost:3000/students/74f2614e-ccd7-4441-97e2-21b501248829
```

Respuesta esperada para éxito - Body:
```
{
    "id": "74f2614e-ccd7-4441-97e2-21b501248829",
    "anio_ingreso": 2023,
    "user": {
        "id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "name": "Laura González",
        "email": "laura.gonzalez@email.com",
        "rol": "Estudiante",
        "createdAt": "2025-11-19T04:25:08.608Z"
    }
}
```

Ejemplo de obtención de un estudiante por un ID que no es de tipo UUID
```
GET http://localhost:3000/students/123-invalido
```

Respuesta esperada para este error - Body:
```
{
    "message": "El término de búsqueda ingresado no es un ID válido",
    "error": "Bad Request",
    "statusCode": 400
}
```

Ejemplo de obtención de un estudiante por un UUID que no existe
```
GET http://localhost:3000/students/cceb8106-91d2-4647-b2ee-2e7b169ac154
```

Respuesta esperada para este error - Body:
```
{
    "message": "Estudiante con id cceb8106-91d2-4647-b2ee-2e7b169ac155 no encontrado",
    "error": "Not Found",
    "statusCode": 404
}
```


### **PATCH - Actualización de estudiante**

Ejemplo de actualización de un estudiante
```
PATCH http://localhost:3000/students/64f2614e-ccd7-4441-97e2-21b501248828
```

Datos a actualizar
```
{
  "anio_ingreso": 2024
}
```

Respuesta esperada para éxito - Body:
```
{
    "message": "Estudiante actualizado exitosamente",
    "student": {
        "id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "anio_ingreso": 2024,
        "user": {
            "id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "name": "Laura González",
            "email": "laura.gonzalez@email.com",
            "rol": "Estudiante",
            "createdAt": "2025-11-19T04:25:08.608Z"
        }
    }
}
```


### **DELETE - Eliminación un estudiante por su ID**

Ejemplo de eliminación de estudiante por su ID
```
DELETE http://localhost:3000/students/74f2614e-ccd7-4441-97e2-21b501248829
```

Respuesta esperada - Body:
```
{
    "message": "Se ha eliminado el estudiante con id: 74f2614e-ccd7-4441-97e2-21b501248829",
    "deletedStudent": {
        "id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "anio_ingreso": 2024,
        "user": {
            "id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "name": "Laura González",
            "email": "laura.gonzalez@email.com"
        }
    }
}
```

