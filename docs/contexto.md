{
"openapi": "3.0.0",
"paths": {
"/api": {
"get": {
"operationId": "AppController_getHello",
"parameters": [],
"responses": {
"200": {
"description": ""
}
}
}
},
"/api/auth/login": {
"post": {
"operationId": "AuthController_login",
"parameters": [],
"requestBody": {
"required": true,
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/CreateUserDto"
}
}
}
},
"responses": {
"200": {
"description": "",
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/LoginResponseDto"
}
}
}
},
"201": {
"description": ""
}
},
"tags": [
"auth"
]
}
},
"/api/auth/register": {
"post": {
"operationId": "AuthController_register",
"parameters": [],
"requestBody": {
"required": true,
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/CreateUserDto"
}
}
}
},
"responses": {
"201": {
"description": "User registered successfully"
}
},
"tags": [
"auth"
]
}
},
"/api/user/profile": {
"get": {
"operationId": "UserController_profile",
"parameters": [],
"responses": {
"200": {
"description": "",
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/UserDto"
}
}
}
}
},
"tags": [
"user"
],
"security": [
{
"bearer": []
}
]
}
},
"/api/user": {
"get": {
"operationId": "UserController_findAll",
"parameters": [],
"responses": {
"200": {
"description": "",
"content": {
"application/json": {
"schema": {
"type": "array",
"items": {
"$ref": "#/components/schemas/UserDto"
}
}
}
}
}
},
"tags": [
"user"
],
"security": [
{
"bearer": []
}
]
}
},
"/api/role/assign": {
"post": {
"operationId": "RoleController_assignRoleToUser",
"parameters": [],
"requestBody": {
"required": true,
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/AssignRoleDto"
}
}
}
},
"responses": {
"201": {
"description": "",
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/User"
}
}
}
}
},
"security": [
{
"bearer": []
}
]
}
},
"/api/product/{id}": {
"get": {
"operationId": "ProductController_getProduct",
"parameters": [],
"responses": {
"200": {
"description": "",
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/Product"
}
}
}
}
},
"tags": [
"product"
]
},
"delete": {
"operationId": "ProductController_deleteProduct",
"parameters": [],
"responses": {
"200": {
"description": ""
}
},
"tags": [
"product"
],
"security": [
{
"bearer": []
}
]
}
},
"/api/product/create": {
"post": {
"operationId": "ProductController_createProduct",
"parameters": [],
"requestBody": {
"required": true,
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/CreateProductDto"
}
}
}
},
"responses": {
"201": {
"description": "",
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/Product"
}
}
}
}
},
"tags": [
"product"
],
"security": [
{
"bearer": []
}
]
}
},
"/api/product/{id}/details": {
"post": {
"operationId": "ProductController_addProductDetails",
"parameters": [],
"requestBody": {
"required": true,
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/ProductDetailsDto"
}
}
}
},
"responses": {
"201": {
"description": "",
"content": {
"application/json": {
"schema": {
"type": "object"
}
}
}
}
},
"tags": [
"product"
],
"security": [
{
"bearer": []
}
]
}
},
"/api/product/{id}/activate": {
"post": {
"operationId": "ProductController_activateProduct",
"parameters": [],
"responses": {
"201": {
"description": ""
}
},
"tags": [
"product"
],
"security": [
{
"bearer": []
}
]
}
},
"/api/category": {
"get": {
"operationId": "CategoryController_findAll",
"parameters": [],
"responses": {
"200": {
"description": "",
"content": {
"application/json": {
"schema": {
"type": "array",
"items": {
"$ref": "#/components/schemas/CategoryDto"
}
}
}
}
}
},
"tags": [
"category"
]
}
}
},
"info": {
"title": "NestJS Ecommerce API",
"description": "Documentación de la API para el E-commerce Marketplace",
"version": "1.0",
"contact": {}
},
"tags": [],
"servers": [],
"components": {
"securitySchemes": {
"bearer": {
"scheme": "bearer",
"bearerFormat": "JWT",
"type": "http"
}
},
"schemas": {
"CreateUserDto": {
"type": "object",
"properties": {
"email": {
"type": "string",
"example": "usuario@correo.com"
},
"password": {
"type": "string",
"example": "password123"
}
},
"required": [
"email",
"password"
]
},
"RoleDto": {
"type": "object",
"properties": {
"id": {
"type": "number"
},
"name": {
"type": "string"
}
},
"required": [
"id",
"name"
]
},
"UserDto": {
"type": "object",
"properties": {
"id": {
"type": "number"
},
"email": {
"type": "string"
},
"roles": {
"type": "array",
"items": {
"$ref": "#/components/schemas/RoleDto"
}
}
},
"required": [
"id",
"email",
"roles"
]
},
"LoginResponseDto": {
"type": "object",
"properties": {
"accessToken": {
"type": "string"
},
"user": {
"$ref": "#/components/schemas/UserDto"
}
},
"required": [
"accessToken",
"user"
]
},
"AssignRoleDto": {
"type": "object",
"properties": {
"userId": {
"type": "number"
},
"roleId": {
"type": "number"
}
},
"required": [
"userId",
"roleId"
]
},
"Category": {
"type": "object",
"properties": {
"id": {
"type": "number"
},
"name": {
"type": "string"
},
"products": {
"$ref": "#/components/schemas/Product"
},
"createdAt": {
"format": "date-time",
"type": "string"
},
"updatedAt": {
"format": "date-time",
"type": "string"
}
},
"required": [
"id",
"name",
"products",
"createdAt",
"updatedAt"
]
},
"Product": {
"type": "object",
"properties": {
"id": {
"type": "number"
},
"code": {
"type": "string"
},
"title": {
"type": "string"
},
"variationType": {
"type": "string"
},
"description": {
"type": "string",
"nullable": true
},
"about": {
"type": "array",
"items": {
"type": "string"
}
},
"details": {
"type": "object",
"nullable": true
},
"isActive": {
"type": "boolean"
},
"merchantId": {
"type": "number"
},
"merchant": {
"$ref": "#/components/schemas/User"
},
"category": {
"$ref": "#/components/schemas/Category"
},
"categoryId": {
"type": "number"
},
"createdAt": {
"format": "date-time",
"type": "string"
},
"updatedAt": {
"format": "date-time",
"type": "string"
}
},
"required": [
"id",
"code",
"title",
"variationType",
"details",
"isActive",
"merchantId",
"merchant",
"category",
"categoryId",
"createdAt",
"updatedAt"
]
},
"User": {
"type": "object",
"properties": {
"id": {
"type": "number"
},
"email": {
"type": "string"
},
"password": {
"type": "string"
},
"roles": {
"type": "array",
"items": {
"$ref": "#/components/schemas/Role"
}
},
"products": {
"$ref": "#/components/schemas/Product"
},
"createdAt": {
"format": "date-time",
"type": "string"
},
"updatedAt": {
"format": "date-time",
"type": "string"
}
},
"required": [
"id",
"email",
"password",
"roles",
"products",
"createdAt",
"updatedAt"
]
},
"Role": {
"type": "object",
"properties": {
"id": {
"type": "number"
},
"name": {
"type": "string"
},
"users": {
"type": "array",
"items": {
"$ref": "#/components/schemas/User"
}
},
"createdAt": {
"format": "date-time",
"type": "string"
},
"updatedAt": {
"format": "date-time",
"type": "string"
}
},
"required": [
"id",
"name",
"users",
"createdAt",
"updatedAt"
]
},
"CreateProductDto": {
"type": "object",
"properties": {
"categoryId": {
"type": "number",
"example": 1,
"description": "ID de la categoría"
}
},
"required": [
"categoryId"
]
},
"ProductDetailsDto": {
"type": "object",
"properties": {
"title": {
"type": "string",
"example": "Smartphone X"
},
"code": {
"type": "string",
"example": "SM-X123"
},
"variationType": {
"type": "string",
"enum": [
"NONE",
"OnlySize",
"OnlyColor",
"SizeAndColor"
],
"example": "NONE",
"description": "Tipo de variación del producto"
},
"details": {
"type": "object",
"description": "Detalles específicos según la categoría"
},
"about": {
"example": [
"Característica 1",
"Característica 2"
],
"type": "array",
"items": {
"type": "string"
}
},
"description": {
"type": "string",
"example": "Una descripción detallada del producto."
}
},
"required": [
"title",
"code",
"variationType",
"details",
"about",
"description"
]
},
"CategoryDto": {
"type": "object",
"properties": {
"id": {
"type": "number"
},
"name": {
"type": "string"
}
},
"required": [
"id",
"name"
]
}
}
}
}