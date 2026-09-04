# Prueba Técnica Full Stack

Solución de prueba técnica para el desarrollo de una aplicación web de gestión de tareas.

El proyecto está dividido en dos aplicaciones principales:

- Backend: API REST desarrollada con NestJS, TypeScript, PostgreSQL y TypeORM.
- Frontend: aplicación web desarrollada con Nuxt 3, Vue 3 y Pinia.
- Ejercicios lógico-matemáticos implementados en TypeScript.
- Ejercicio SQL basado en las tablas proporcionadas en la prueba.

---

## 📋 Contenido

- [Objetivo](#-objetivo)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del proyecto](#-arquitectura-del-proyecto)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos](#-requisitos)
- [Configuración del proyecto](#-configuración-del-proyecto)
- [Base de datos](#-base-de-datos)
- [Backend](#-backend)
- [Autenticación](#-autenticación)
- [Frontend](#-frontend)
- [Paginación](#-paginación)
- [Ejercicios lógico-matemáticos](#-ejercicios-lógico-matemáticos)
- [Ejercicio SQL](#-ejercicio-sql)
- [Pruebas](#-pruebas)
- [Endpoints](#-endpoints)
- [Decisiones técnicas](#-decisiones-técnicas)
- [Validaciones](#-validaciones)
- [Uso de Inteligencia Artificial](#-uso-de-inteligencia-artificial)
- [Limitaciones y funcionalidades opcionales](#-limitaciones-y-funcionalidades-opcionales)
- [Ejecución rápida](#-ejecución-rápida)

---

# 🎯 Objetivo

Desarrollar una solución Full Stack que permita administrar tareas mediante una API REST y una interfaz web.

La aplicación permite:

- Crear tareas.
- Consultar tareas.
- Actualizar tareas.
- Eliminar tareas.
- Marcar tareas como completadas.
- Autenticar las peticiones mediante JWT.
- Validar los datos recibidos por la API.
- Consultar las tareas mediante paginación.
- Gestionar el estado de la aplicación utilizando Pinia.

También se implementaron los ejercicios lógico-matemáticos y la consulta SQL solicitados en la prueba técnica.

---

# 🛠 Tecnologías utilizadas

## Backend

- Node.js
- TypeScript
- NestJS
- PostgreSQL
- TypeORM
- JWT
- Passport
- class-validator
- class-transformer
- Vitest

## Frontend

- Nuxt 3
- Vue 3
- TypeScript
- Pinia
- Bootstrap
- Bootstrap Icons

## Base de datos

- PostgreSQL 16
- Docker

---

# 🏗 Arquitectura del proyecto

Se utiliza una arquitectura modular en el backend.

NestJS permite separar responsabilidades mediante módulos, controladores y servicios.

La comunicación entre frontend y backend se realiza mediante una API REST.

Flujo general:

Frontend
│
│ HTTP / JSON
▼
NestJS API
│
├── Auth
│
└── Tasks
│
▼
TypeORM
│
▼
PostgreSQL

El frontend utiliza Pinia para administrar el estado global relacionado con autenticación y tareas.

---

# 📁 Estructura del proyecto

```text
prueba-tecnica-fullstack/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   ├── strategies/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   │
│   │   ├── tasks/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.module.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.service.spec.ts
│   │   │
│   │   ├── database/
│   │   │   └── migrations/
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── .env
│   ├── typeorm.config.ts
│   ├── vitest.config.ts
│   └── package.json
│
├── frontend/
│   ├── pages/
│   │   ├── index.vue
│   │   └── login.vue
│   │
│   ├── stores/
│   │   ├── auth.ts
│   │   └── tasks.ts
│   │
│   ├── composables/
│   │   └── useApi.ts
│   │
│   ├── types/
│   │   └── task.ts
│   │
│   ├── app.vue
│   ├── nuxt.config.ts
│   └── package.json
│
├── logical-exercises/
│   ├── exercise-1.ts
│   ├── exercise-2.ts
│   ├── exercise-3.ts
│   ├── exercise-4.ts
│   └── exercise-5.sql
│
├── docker-compose.yml
├── .gitignore
└── README.md