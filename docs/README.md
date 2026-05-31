# Mini Proyecto Tienda - Arquitectura de Microservicios

## Descripción

Sistema de gestión de pedidos desarrollado siguiendo una arquitectura basada en microservicios.

El proyecto combina:

* Servicios REST (Node.js + Express)
* Servicios SOAP (Apache Axis2)
* Persistencia MySQL
* Docker Compose
* JWT Authentication
* Arquitectura orientada a servicios (MSOAM)

---

## Arquitectura

Microservicios implementados:

* auth-service
* catalog-service
* payment-service
* notification-service
* order-api-service
* order-orchestrator-service
* soap-services
* mysql-db

---

## Requisitos

Instalar previamente:

* Docker Desktop
* Docker Compose
* Git

Verificar instalación:

```bash
docker --version
docker compose version
```

## Clonar repositorio

```bash
git clone <url-del-repositorio>
cd mini-proyecto-tienda
```

## Configuración

Crear los archivos `.env` necesarios tomando como referencia los archivos `.env.example`.

## Levantar el proyecto

```bash
docker compose up --build
```

Servicios disponibles:

| Servicio      | Puerto |
|---------------|--------|
| Orchestrator  | 3000   |
| Order API     | 4000   |
| Catalog       | 5000   |
| Payment       | 6000   |
| Auth          | 7000   |
| Notification  | 8000   |
| SOAP Services | 8080   |
| MySQL         | 3307   |

---

## Flujo principal

1. Registrar usuario
2. Login
3. Obtener JWT
4. Consultar catálogo
5. Crear pedido
6. Procesar pago
7. Consultar pedidos
8. Consultar notificaciones

---

## Endpoints principales

### Auth

POST /api/auth/register

POST /api/auth/login

### Catálogo

GET /api/products

GET /api/products/:id

### Pedidos

GET /api/orders

POST /api/orders

### Notificaciones

GET /api/notifications/me

---

## Contratos

Los contratos RAML se encuentran en:

```text
/contracts
```

---

## Tecnologías utilizadas

* Node.js
* Express
* MySQL
* Docker
* JWT
* Apache Axis2
* SOAP
* RAML 1.0

---

## Autores

Proyecto académico desarrollado para la asignatura de Arquitectura de Sistemas Software.
