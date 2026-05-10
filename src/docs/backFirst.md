Documentación del Sistema de Autenticación (Registro/Login)

Este sistema está construido sobre NestJS utilizando JWT (JSON Web Tokens) para la gestión de sesiones y bcrypt para
el hashing de contraseñas.

1. Configuración y Ejecución

- Base de URL: http://localhost:{PORT}/api (El prefijo global es api).
- Comando de inicio (Dev): npm run start:dev
- Requisitos previos:
  - Base de datos PostgreSQL configurada (ver .env).
  - Ejecutar migraciones si es necesario: npm run migration:run.
  - Es recomendable correr el seed para inicializar roles: npm run seed:run.

2. Endpoints de Autenticación

A. Registro de Usuario
Crea una nueva cuenta y le asigna automáticamente el rol de Customer.

- Ruta: POST /auth/register
- Cuerpo esperado (JSON):

1 {
2 "email": "usuario@ejemplo.com",
3 "password": "miPasswordSeguro"
4 }

- Respuesta exitosa (201 Created):

1 {
2 "message": "success"
3 }

- Lógica interna: Verifica si el email ya existe. Si no, hashea la contraseña, guarda al usuario y dispara un
  evento user.registered (usado para procesos secundarios como envío de emails).

B. Inicio de Sesión (Login)
Valida las credenciales y devuelve un token de acceso.

- Ruta: POST /auth/login
- Cuerpo esperado (JSON):

1 {
2 "email": "usuario@ejemplo.com",
3 "password": "miPasswordSeguro"
4 }

- Respuesta exitosa (200 OK):

1 {
2 "accessToken": "eyJhbGciOiJIUzI1NiIsInR..."
3 }

- Lógica interna: Compara la contraseña provista con el hash almacenado. Si es válida, genera un JWT firmado que
  contiene el id y email del usuario.

3. Seguridad y Validación

- Validación de datos: Utiliza class-validator. Ambos campos (email y password) son obligatorios y el email debe
  tener un formato válido.
- Protección de Rutas: El sistema cuenta con un AuthGuard y un RolesGuard (ubicados en src/api/auth/guards/) para
  proteger otros endpoints de la API.
- Decoradores: Se puede usar @Auth() para proteger controladores y @User() para extraer los datos del usuario
  autenticado del token.

4. Estructura de Datos (DTOs)

- Entrada: CreateUserDto (email: string, password: string).
- Salida (JWT Payload): PayloadDto (id: number, email: string).

---
