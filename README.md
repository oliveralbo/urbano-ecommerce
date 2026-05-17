# Urbano E-commerce - Frontend (Challenge Sr Fullstack)

🚀 **Acceso a Producción:** [https://urbano-ecommerce.vercel.app/login](https://urbano-ecommerce.vercel.app/login)

Super usuario productivo (seed original):
 - user: admin@admin.com
 - pass: 12345678

# 🧪 Flujo sugerido para testeo de eventos

## 1. Registro de usuario
- Registrarse con un usuario nuevo  
- 📩 Se envía mail de bienvenida  

---

## 2. Acceso como comprador
- Ingresar con el usuario recién creado  
- El usuario puede operar como **comprador**

---

## 3. Asignación de rol (Super User)
- Ingresar con el **super user**
- Asignar rol de **vendedor** al usuario creado  
- 📩 Se envía evento: *mail de cambio de roles*

---

## 4. Uso como vendedor
- Ingresar nuevamente con el usuario creado  
- Ir a la pestaña de **vendedor**

---

## 5. Creación de producto
- Crear un nuevo producto  
- ⚙️ Se ejecuta el evento de **activación de producto** (si los datos son correctos)

---

## 6. Visualización del producto
- Ver el producto activo en el Home  

---

## 7. Revocación de rol (Super User)
- Ingresar nuevamente con el **super user**
- Quitar rol de **vendedor** al usuario creado  

### ⚠️ Eventos disparados:
- 📩 Mail de cambio de roles al usuario  
- 🗑️ Eliminación de todos los productos creados por el usuario  


Este repositorio contiene el frontend de la solución para el desafío **Sr Fullstack (Microservicios)**. La aplicación ha sido desarrollada con **React** y **Vite**, diseñada para interactuar con un backend orientado a eventos (**Event-Driven**) y proporcionar una experiencia de usuario fluida y reactiva.

## 1. Propósito del Proyecto

El objetivo de esta interfaz es permitir la gestión integral del catálogo e inventario, reflejando en tiempo real (o mediante actualizaciones de estado) los flujos asincrónicos definidos en el backend. 

### Características principales:
- **Autenticación y Roles:** Manejo de sesiones y permisos (Admin/Merchant/User).
- **Gestión de Productos:** Productos con estados de validación.
- **Flujo Reactivo:** Visualización de productos activados automáticamente tras pasar validaciones en el backend.
- **Panel de Ventas:** Interfaz optimizada para la publicación y gestión de artículos.

## 2. Decisiones Técnicas

- **React 19 + TypeScript:** Uso de las últimas funcionalidades de React para un tipado fuerte y un desarrollo eficiente.
- **Tailwind CSS 4:** Estilizado moderno y rápido utilizando la última versión del framework.
- **Vite:** Herramienta de construcción ultrarrápida para una experiencia de desarrollo superior.
- **Context API:** Gestión de estado global para la autenticación y el flujo de usuario.
- **Arquitectura de Componentes:** Separación clara entre componentes de UI reutilizables, formularios de lógica de negocio y secciones de página.

## 3. Guía de Inicio Rápido

### Requisitos
- Node.js v18 o superior
- npm o yarn

### Instalación

1.  **Clonar el repositorio**
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar Variables de Envono:**
    Crea un archivo `.env` en la raíz del proyecto:
    ```env
    VITE_API_URL=http://localhost:3000
    ```
4.  **Iniciar la Aplicación:**
    ```bash
    npm run dev
    ```

## 4. Estructura del Proyecto

- `src/api`: Servicios de comunicación con el backend (Axios/Fetch).
- `src/components`:
  - `ui`: Componentes atómicos y reutilizables.
  - `auth`: Formularios y lógica de acceso.
  - `product`: Lógica de visualización y detalle de productos.
- `src/context`: Proveedores de estado global.
- `src/hooks`: Hooks personalizados para lógica compartida.
- `src/pages`: Componentes de página de nivel superior.
- `src/routes`: Configuración de rutas y navegación protegida.

---

🔗 **Repositorio Backend:** [https://github.com/oliveralbo/urbano_back_challenge](https://github.com/oliveralbo/urbano_back_challenge)
