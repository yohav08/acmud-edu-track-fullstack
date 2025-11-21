# USUARIOS

## Cliente / Servicio CRUD para usuarios

Aquí podrremos encontrar todo para las pruebas en postman

### **POST - Creación de usuario**

Ejemplo para la creación de un usuario
```
POST http://localhost:3000/users
```

Header
```
Content-Type: application/json
```

Datos para registrar
```
{
  "name": "María García",
  "email": "maria.garcia@email.com",
  "password": "Password123",
  "rol": "Estudiante"
}

```

Respuesta esperada para éxito - Body:
```
{
    "message": "El usuario fue guardado exitosamente",
    "user": {
        "id": "64f2614e-ccd7-4441-97e2-21b501248828",
        "name": "María García",
        "email": "maria.garcia@email.com",
        "rol": "Estudiante",
        "createdAt": "2025-11-19T04:23:08.608Z"
    }
}
```

Ejemplo para la creación de un usuario con contraseña débil
```
POST http://localhost:3000/users
```

Header
```
Content-Type: application/json
```

Datos para registrar
```
{
  "name": "Usuario Test contraseña debil",
  "email": "test@email.com",
  "password": "123",
  "rol": "Estudiante"
}
```

Respuesta esperada para error - Body:
```
{
    "message": [
        "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
        "La contraseña debe tener al menos 6 caracteres"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

### **GET - Obtención todos los elementos**

Ejemplo de obtención de todos los elementos
```
GET http://localhost:3000/users/getAllUsers
```

Respuesta esperada (en este caso solo habíamos agregado a María, por lo tanto solo nos aparece María) - Body:

```
{
    "count": 1,
    "users": [
        {
            "id": "64f2614e-ccd7-4441-97e2-21b501248828",
            "name": "María García",
            "email": "maria.garcia@email.com",
            "rol": "Estudiante",
            "createdAt": "2025-11-19T04:23:08.608Z"
        }
    ]
}
```


### **GET - Obtención un elemento por su ID**

Ejemplo de obtención de un elemento por su ID
```
GET http://localhost:3000/users/64f2614e-ccd7-4441-97e2-21b501248828
```

Respuesta esperada (en este caso buscamos el ID-uuid de María) - Body:
```
{
    "id": "64f2614e-ccd7-4441-97e2-21b501248828",
    "name": "María García",
    "email": "maria.garcia@email.com",
    "rol": "Estudiante",
    "createdAt": "2025-11-19T04:23:08.608Z"
}
```

Y cuando no hay usuarios en la base de datos, la respuesta esperada - Body es:
```
{
    "count": 0,
    "users": []
}
```

Ejemplo de obtención de un elemento por un ID que no es de tipo UUID
```
GET http://localhost:3000/users/123-invalido    

```

Respuesta esperada para este error  - Body:
```
{
    "message": "Validation failed (uuid v 4 is expected)",
    "error": "Bad Request",
    "statusCode": 400
}
```

Ejemplo de obtención de un elemento por un UUID que no existe en la base de datos
```
GET http://localhost:3000/users/cceb8106-91d2-4647-b2ee-2e7b169ac154  

```

Respuesta esperada para este error  - Body:
```
{
    "message": "Usuario con id cceb8106-91d2-4647-b2ee-2e7b169ac154 no encontrado",
    "error": "Not Found",
    "statusCode": 404
}
```



### **GET - Obtención un elemento por su EMAIL**

Ejemplo de obtención de un elemento por su EMAIL
```
GET http://localhost:3000/users/email/maria.garcia@email.com
```

Respuesta esperada (en este caso buscamos el EMAIL de María) - Body:

```
{
    "id": "64f2614e-ccd7-4441-97e2-21b501248828",
    "name": "María García",
    "email": "maria.garcia@email.com",
    "rol": "Estudiante",
    "createdAt": "2025-11-19T04:23:08.608Z"
}
```

Ejemplo de obtención de un elemento por un EMAIL inexistente en la base de datos
```
GET http://localhost:3000/users/email/noexiste@email.com
```

Respuesta esperada para este error - Body:
```
{
    "message": "Usuario con email noexiste@email.com no encontrado",
    "error": "Not Found",
    "statusCode": 404
}
```

### **PATCH - Actualización de usuario**

Ejemplo de actualización de un elemento (en este caso actualizamor para agregar un apellido)
```
http://localhost:3000/users/64f2614e-ccd7-4441-97e2-21b501248828
```

Datos a actualizar
```
{
  "name": "María Elena García",
  "rol": "Profesor"
}
```

Respuesta esperada - Body
```
{
    "message": "Usuario actualizado exitosamente",
    "user": {
        "id": "64f2614e-ccd7-4441-97e2-21b501248828",
        "name": "María Elena García",
        "email": "maria.garcia@email.com",
        "rol": "Profesor",
        "createdAt": "2025-11-19T04:23:08.608Z"
    }
}
```

### **DELETE - Eliminación un elemento por su ID**

Ejemplo de eliminación de personaje por su ID
```
DELETE http://localhost:3000/users/64f2614e-ccd7-4441-97e2-21b501248828
```

Header
```
{
    "message": "Se ha eliminado el usuario con id: 64f2614e-ccd7-4441-97e2-21b501248828",
    "deletedUser": {
        "name": "María Elena García",
        "email": "maria.garcia@email.com"
    }
}
```

