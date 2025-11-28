# INSCRIPCIONES

## Cliente / Servicio CRUD para inscripciones

Aquí podrás encontrar todo para las pruebas en postman de las inscripciones de estudiantes a cursos

### **PREREQUISITOS IMPORTANTES**
Antes de crear una inscripción, hay que tener:
- **Estudiante creado** (usuario con rol "Estudiante" + student)
- **Curso creado** (con profesor asignado)

### **POST - Creación de inscripción**

Ejemplo para la creación de una inscripción
```
http://localhost:3000/inscriptions
```

Header
```
Content-Type: application/json
```


Datos para registrar:
```
{
  "fecha_inscripcion": "2024-01-15",
  "nota": 8.5,
  "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
  "curso_id": 1
}
```

Respuesta esperada para éxito - Body:
```
{
    "message": "La inscripción fue guardada exitosamente",
    "inscription": {
        "id": 1,
        "fecha_inscripcion": "2024-01-15",
        "nota": 8.5,
        "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "curso_id": 1
    }
}
```

Ejemplo para la creación de una inscripción duplicada

```
{
    "message": "La inscripción fue guardada exitosamente",
    "inscription": {
        "id": 1,
        "fecha_inscripcion": "2024-01-15",
        "nota": 8.5,
        "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "curso_id": 1
    }
}
```

Respuesta esperada para error - Body:
```
{
    "message": "El estudiante ya está inscrito en este curso",
    "error": "Bad Request",
    "statusCode": 400
}
```

Ejemplo para la creación de una inscripción con estudiante inexistente
```
{
  "fecha_inscripcion": "2024-01-15",
  "nota": 8.5,
  "estudiante_id": "00000000-0000-0000-0000-000000000000",
  "curso_id": 1
}
```

Respuesta esperada para error - Body:
```
{
    "message": "Estudiante con id 00000000-0000-0000-0000-000000000000 no encontrado",
    "error": "Not Found",
    "statusCode": 404
}
```

Ejemplo para la creación de una inscripción con con curso inexistente
```
{
  "fecha_inscripcion": "2024-01-15",
  "nota": 8.5,
  "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
  "curso_id": 999
}
```

Respuesta esperada para error - Body:
```
{
    "message": "Curso con id 999 no encontrado",
    "error": "Not Found",
    "statusCode": 404
}
```

### **GET - Obtención todos los inscripciones**

Ejemplo de obtención de todos los inscripciones
```
GET http://localhost:3000/inscriptions/getAllInscriptions
```

Respuesta esperada para éxito - Body:

```
{
    "count": 1,
    "inscriptions": [
        {
            "id": 1,
            "fecha_inscripcion": "2024-01-15",
            "nota": 8.5,
            "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "curso_id": 1,
            "student": {
                "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                "anio_ingreso": 2023,
                "user": {
                    "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                    "name": "Laura González",
                    "email": "laura.gonzalez@email.com"
                }
            },
            "course": {
                "id": 1,
                "name": "Matemáticas Avanzadas",
                "description": "Curso de matemáticas para nivel avanzado",
                "credits": 4
            }
        }
    ]
}
```

Cuando no hay inscripciones en la base de datos, la respuesta esperada - Body es:
```
{
    "count": 0,
    "inscriptions": []
}
```


### **GET - Obtención de una inscripción por su ID**

Ejemplo de obtención de una inscripción por su ID
```
GET http://localhost:3000/inscriptions/1
```


```
{
    "id": 1,
    "fecha_inscripcion": "2024-01-15",
    "nota": 8.5,
    "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
    "curso_id": 1,
    "student": {
        "id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "anio_ingreso": 2023,
        "user": {
            "id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "name": "Laura González",
            "email": "laura.gonzalez@email.com"
        }
    },
    "course": {
        "id": 1,
        "name": "Matemáticas Avanzadas",
        "description": "Curso de matemáticas para nivel avanzado",
        "credits": 4
    }
}
```

Ejemplo de obtención de una inscripción por un ID que no existe
```
GET http://localhost:3000/inscriptions/999
```

Respuesta esperada para este error - Body:
```
{
    "message": "Inscripción con id 999 no encontrada",
    "error": "Not Found",
    "statusCode": 404
}
```


### **GET - Obtención de una inscripción por fecha**

Ejemplo de obtención de una inscripción por fecha
```
GET http://localhost:3000/inscriptions/fecha/2024-01-15
```

Respuesta esperada - Body:
```
{
    "count": 1,
    "fecha": "2024-01-15",
    "inscriptions": [
        {
            "id": 1,
            "fecha_inscripcion": "2024-01-15",
            "nota": 8.5,
            "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "curso_id": 1,
            "student": {
                "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                "anio_ingreso": 2023,
                "user": {
                    "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                    "name": "Laura González",
                    "email": "laura.gonzalez@email.com"
                }
            },
            "course": {
                "id": 1,
                "name": "Matemáticas Avanzadas",
                "description": "Curso de matemáticas para nivel avanzado",
                "credits": 4
            }
        }
    ]
}
```

Ejemplo de obtención de inscripciones por fecha sin resultados
```
GET http://localhost:3000/inscriptions/fecha/2023-12-31
```

Respuesta esperada para este error - Body:
```
{
    "message": "No se encontraron inscripciones para la fecha 2023-12-31",
    "error": "Not Found",
    "statusCode": 404
}
```


### **GET - Obtención de una inscripción por estudiante**

Ejemplo de obtención de una inscripción por estudiante
```
GET http://localhost:3000/inscriptions/estudiante/74f2614e-ccd7-4441-97e2-21b501248829
```

Respuesta esperada - Body:
```
{
    "count": 1,
    "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
    "inscriptions": [
        {
            "id": 1,
            "fecha_inscripcion": "2024-01-15",
            "nota": 8.5,
            "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "curso_id": 1,
            "student": {
                "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                "anio_ingreso": 2023,
                "user": {
                    "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                    "name": "Laura González",
                    "email": "laura.gonzalez@email.com"
                }
            },
            "course": {
                "id": 1,
                "name": "Matemáticas Avanzadas",
                "description": "Curso de matemáticas para nivel avanzado",
                "credits": 4
            }
        }
    ]
}
```

### **GET - Obtención de una inscripción por curso**

Ejemplo de obtención de una inscripción por curso
```
GET http://localhost:3000/inscriptions/curso/1
```

Respuesta esperada - Body:
```
{
    "count": 1,
    "curso_id": 1,
    "inscriptions": [
        {
            "id": 1,
            "fecha_inscripcion": "2024-01-15",
            "nota": 8.5,
            "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "curso_id": 1,
            "student": {
                "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                "anio_ingreso": 2023,
                "user": {
                    "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                    "name": "Laura González",
                    "email": "laura.gonzalez@email.com"
                }
            },
            "course": {
                "id": 1,
                "name": "Matemáticas Avanzadas",
                "description": "Curso de matemáticas para nivel avanzado",
                "credits": 4
            }
        }
    ]
}
```


### **GET - Obtención de una inscripción con todos los detalles**

Ejemplo de obtención de una inscripción con todos los detalles
```
GET http://localhost:3000/inscriptions/detalles/completos
```

Respuesta esperada - Body:
```
{
    "count": 1,
    "inscriptions": [
        {
            "id": 1,
            "fecha_inscripcion": "2024-01-15",
            "nota": 8.5,
            "student": {
                "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                "anio_ingreso": 2023,
                "user": {
                    "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                    "name": "Laura González",
                    "email": "laura.gonzalez@email.com"
                }
            },
            "course": {
                "id": 1,
                "name": "Matemáticas Avanzadas",
                "description": "Curso de matemáticas para nivel avanzado",
                "credits": 4,
                "teacher": {
                    "id": "64f2614e-ccd7-4441-97e2-21b501248828",
                    "especialidad": "Matemáticas Avanzadas",
                    "id_user": {
                        "name": "Carlos López"
                    }
                }
            }
        }
    ]
}
```


### **PATCH - Actualización de inscripción**

Ejemplo de actualización de una inscripción (actualizar nota)
```
PATCH http://localhost:3000/inscriptions/1
```

Datos a actualizar
```
{
  "nota": 9.0
}
```

Respuesta esperada para éxito - Body:
```
{
    "message": "Inscripción actualizada exitosamente",
    "inscription": {
        "id": 1,
        "fecha_inscripcion": "2024-01-15",
        "nota": 9.0,
        "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "curso_id": 1,
        "student": {
            "id": "74f2614e-ccd7-4441-97e2-21b501248829",
            "anio_ingreso": 2023,
            "user": {
                "id": "74f2614e-ccd7-4441-97e2-21b501248829",
                "name": "Laura González",
                "email": "laura.gonzalez@email.com"
            }
        },
        "course": {
            "id": 1,
            "name": "Matemáticas Avanzadas",
            "description": "Curso de matemáticas para nivel avanzado",
            "credits": 4
        }
    }
}
```


### **DELETE - Eliminación una inscripcion por su ID**

Ejemplo de eliminación una inscripcion por su ID
```
DELETE http://localhost:3000/inscriptions/1
```

Respuesta esperada - Body:
```
{
    "message": "Se ha eliminado la inscripción con id: 1",
    "deletedInscription": {
        "id": 1,
        "fecha_inscripcion": "2024-01-15",
        "estudiante_id": "74f2614e-ccd7-4441-97e2-21b501248829",
        "curso_id": 1
    }
}
```

