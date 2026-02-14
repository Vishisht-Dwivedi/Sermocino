# Auth Service — Architecture & Flow

This document describes the **internal architecture and request/response lifecycle** of the Sermocino Auth Service.

It is an infrastructure service that issues and verifies identity tokens for the rest of the platform.

---

## Responsibilities

* Register users
* Authenticate credentials
* Issue access tokens
* Issue refresh tokens
* Verify identity
* Manage sessions

---

## Architectural Layers

The service follows a strict layered architecture:

```
HTTP Transport Layer
        ↓
Controller Layer
        ↓
Service (Business Logic)
        ↓
Repository (Persistence)
        ↓
Database
```

Each layer has a single responsibility.

---

### 1. Routes (Transport Layer)

Defines HTTP endpoints and validates request shape.

* No business logic
* No database access
* No token generation

Purpose:

> Convert HTTP into structured input for the controller

---

### 2. Controller

Bridges HTTP and business logic.

Responsibilities:

* Read validated input
* Call service methods
* Format HTTP responses

Controllers must not contain authentication logic or database queries.

---

### 3. Service (Core Logic)

This is the heart of the auth system.

Responsibilities:

* Credential validation
* Password hashing comparison
* Token creation
* Session lifecycle rules
* Security checks

This layer must be framework-independent and reusable by any transport (HTTP, gRPC, message queue).

---

### 4. Repository (Persistence)

Handles database interaction only.

Responsibilities:

* Create user
* Find user
* Store session
* Revoke session

No hashing, validation, or token logic allowed here.

---

### 5. Plugins (Infrastructure)

Provides shared infrastructure:

* Database connection
* Token signer/verifier

No business logic.

---

## Request Flow

### Registration Flow

```
Client
  → POST /auth/register
      → Route validation
      → Controller
      → Auth Service
      → Repository (create user)
      → Service hashes password
      → Success response
```

Response:

```
201 Created
{
  "userId": "...",
  "message": "registered"
}
```

---

### Login Flow

```
Client
  → POST /auth/login
      → Route validation
      → Controller
      → Auth Service
          → fetch user
          → verify password
          → create session
          → generate tokens
      → Response
```

Response:

```
200 OK
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

### Access Token Verification Flow

```
Client → Protected Service
        → sends access token
        → Auth verifies signature
        → returns user identity
```

Response:

```
{
  "userId": "...",
  "sessionId": "..."
}
```

---

### Refresh Flow

```
Client
  → POST /auth/refresh
      → validate refresh token
      → verify session exists
      → rotate tokens
      → respond with new access token
```

Response:

```
200 OK
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

## Internal Rule

Every request must follow:

> Transport → Controller → Service → Repository

Never skip layers.

This guarantees:

* Testability
* Replaceable transports (HTTP → gRPC)
* Stable contracts for other services

---

## Service Role in System

Other services never store credentials.

They trust auth by verifying tokens:

```
Chat Service → verify identity
Media Service → verify identity
Gateway → verify identity
Analytics → attribute events
```

Auth is the identity root of trust.

---
