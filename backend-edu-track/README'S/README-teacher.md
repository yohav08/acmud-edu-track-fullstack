# PROFESORES

## Cliente / Servicio CRUD para profesor

Aquí podrremos encontrar todo para las pruebas en postman

### **POST - Creación de profesor**

Ejemplo para la creación de un profesor, primero hay que crear un usuario con el rol de profesor
```
POST http://localhost:3000/teachers
```

Header
```
Content-Type: application/json
```

Datos para registrar
```
{
  "name": "Carlos Ruiz",
  "email": "carlos.ruiz@email.com",
  "password": "Profesor123",
  "rol": "Profesor"
}
```

Respuesta esperada para éxito - Body:
```
```