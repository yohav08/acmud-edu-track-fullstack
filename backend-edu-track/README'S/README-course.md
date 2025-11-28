# CURSOS

## Cliente / Servicio CRUD para cursos

Aquí podrás encontrar todo para las pruebas en postman de los cursos académicos

### **PREREQUISITOS IMPORTANTES**
Antes de crear un curso, debes tener:
- **Profesor creado** (usuario con rol "Profesor" + teacher)

### **POST - Creación de curso**

Ejemplo para la creación de un curso

```
POST http://localhost:3000/courses
```

Header
```
Content-Type: application/json
```

Datos para crear user
```
{
  "name": "Matemáticas Avanzadas",
  "description": "Curso de matemáticas para nivel avanzado",
  "credits": 4,
  "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828"
}
```

Respuesta esperada para éxito - Body:
```
{
    "message": "El curso fue guardado exitosamente",
    "course": {
        "id": 1,
        "name": "Matemáticas Avanzadas",
        "description": "Curso de matemáticas para nivel avanzado",
        "credits": 4,
        "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828"
    }
}
```

Ejemplo para la creación de un curso con nombre duplicado
```
{
  "name": "Matemáticas Avanzadas",
  "description": "Otra descripción",
  "credits": 3,
  "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828"
}
```

Respuesta esperada para error - Body:
```
{
    "message": "Ya existe un curso con el nombre Matemáticas Avanzadas",
    "error": "Bad Request",
    "statusCode": 400
}
```

Ejemplo para la creación de un curso con profesor inexistente
```
{
  "name": "Física Cuántica",
  "description": "Curso de física moderna",
  "credits": 5,
  "teacherId": "00000000-0000-0000-0000-000000000000"
}
```

Respuesta esperada para error - Body:
```
{
    "message": "Profesor con id 00000000-0000-0000-0000-000000000000 no encontrado",
    "error": "Not Found",
    "statusCode": 404
}
```

Ejemplo para la creación de un curso con créditos inválidos
```
{
  "name": "Curso Inválido",
  "description": "Curso con créditos inválidos",
  "credits": 15,
  "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828"
}
```

Respuesta esperada para error - Body:
```
{
    "message": ["Los créditos no pueden ser más de 10"],
    "error": "Bad Request",
    "statusCode": 400
}
```

### **GET - Obtención todos los cursos**

Ejemplo de obtención de todos los cursos
```
GET http://localhost:3000/courses/getAllCourses
```

Respuesta esperada para éxito - Body:
```
{
    "count": 1,
    "courses": [
        {
            "id": 1,
            "name": "Matemáticas Avanzadas",
            "description": "Curso de matemáticas para nivel avanzado",
            "credits": 4,
            "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828",
            "teacher": {
                "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                "especialidad": "Matemáticas Avanzadas",
                "id_user": {
                    "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                    "name": "Carlos López",
                    "email": "carlos.lopez@email.com"
                }
            }
        }
    ]
}
```

Cuando no hay cursos en la base de datos, la respuesta esperada - Body es:
```
{
    "count": 0,
    "courses": []
}
```


### **GET - Obtención de un curso por su IDtodos los cursos**

Ejemplo de obtención de un curso por su ID
```
GET http://localhost:3000/courses/1
```

Respuesta esperada para éxito - Body:
```
{
    "id": 1,
    "name": "Matemáticas Avanzadas",
    "description": "Curso de matemáticas para nivel avanzado",
    "credits": 4,
    "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828",
    "teacher": {
        "id": "64f2614e-ccd7-4441-97e2-21b501248828",
        "especialidad": "Matemáticas Avanzadas",
        "id_user": {
            "id": "64f2614e-ccd7-4441-97e2-21b501248828",
            "name": "Carlos López",
            "email": "carlos.lopez@email.com"
        }
    }
}
```

Ejemplo de obtención de un curso por un ID que no existe
```
GET http://localhost:3000/courses/999
```

Respuesta esperada para este error - Body:
```
{
    "message": "Curso con id 999 no encontrado",
    "error": "Not Found",
    "statusCode": 404
}
```

### **GET - Obtención de un curso por su IDtodos los cursos**

Ejemplo de obtención de cursos por nombre
```
GET http://localhost:3000/courses/nombre/Matemáticas
```

```
{
    "count": 1,
    "searchTerm": "Matemáticas",
    "courses": [
        {
            "id": 1,
            "name": "Matemáticas Avanzadas",
            "description": "Curso de matemáticas para nivel avanzado",
            "credits": 4,
            "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828",
            "teacher": {
                "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                "especialidad": "Matemáticas Avanzadas",
                "id_user": {
                    "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                    "name": "Carlos López",
                    "email": "carlos.lopez@email.com"
                }
            }
        }
    ]
}
```

Ejemplo de obtención de cursos por nombre sin resultados
```
GET http://localhost:3000/courses/nombre/FísicaNuclear
```

Respuesta esperada para este error - Body:
```
{
    "message": "No se encontraron cursos con el nombre: FísicaNuclear",
    "error": "Not Found",
    "statusCode": 404
}
```

### **GET - Obtención cursos por profesor**

Ejemplo de obtención de cursos por profesor
```
GET http://localhost:3000/courses/profesor/64f2614e-ccd7-4441-97e2-21b501248828
```

Respuesta esperada - Body:
```
{
    "count": 1,
    "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828",
    "courses": [
        {
            "id": 1,
            "name": "Matemáticas Avanzadas",
            "description": "Curso de matemáticas para nivel avanzado",
            "credits": 4,
            "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828",
            "teacher": {
                "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                "especialidad": "Matemáticas Avanzadas",
                "id_user": {
                    "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                    "name": "Carlos López",
                    "email": "carlos.lopez@email.com"
                }
            }
        }
    ]
}
```

Ejemplo de obtención de cursos por profesor sin cursos asignados
```
GET http://localhost:3000/courses/profesor/74f2614e-ccd7-4441-97e2-21b501248829
```

Respuesta esperada para este error - Body:
```
{
    "message": "No se encontraron cursos para el profesor con id 74f2614e-ccd7-4441-97e2-21b501248829",
    "error": "Not Found",
    "statusCode": 404
}
```

### **PATCH - Actualización de curso**

Ejemplo de actualización de un curso
```
PATCH http://localhost:3000/courses/1
```

Datos a actualizar
```
{
  "name": "Matemáticas Super Avanzadas",
  "credits": 5,
  "description": "Curso actualizado de matemáticas avanzadas"
}
```

Respuesta esperada para éxito - Body:
```
{
    "message": "Curso actualizado exitosamente",
    "course": {
        "id": 1,
        "name": "Matemáticas Super Avanzadas",
        "description": "Curso actualizado de matemáticas avanzadas",
        "credits": 5,
        "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828",
        "teacher": {
            "id": "64f2614e-ccd7-4441-97e2-21b501248828",
            "especialidad": "Matemáticas Avanzadas",
            "id_user": {
                "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                "name": "Carlos López",
                "email": "carlos.lopez@email.com"
            }
        }
    }
}
```


### **DELETE - Eliminación un curso  por su ID**

Ejemplo de eliminación de curso por su ID
```
DELETE http://localhost:3000/courses/1
```

Respuesta esperada - Body:
```
{
    "message": "Se ha eliminado el curso con id: 1",
    "deletedCourse": {
        "id": 1,
        "name": "Matemáticas Super Avanzadas",
        "credits": 5,
        "teacherId": "64f2614e-ccd7-4441-97e2-21b501248828"
    }
}
```

