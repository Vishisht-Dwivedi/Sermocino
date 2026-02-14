# Sermocino

> Real-time communication platform with live semantic analysis and influence modeling.

Sermocino is a distributed communication system that combines video meetings, chat, and file sharing with real-time conversational intelligence.
Instead of only storing *what people said*, Sermocino models **how ideas spread inside a conversation**.

The project is being built as a scalable microservice architecture intended to support thousands of concurrent participants and real-time analytics.

---

## Core Vision

Traditional meeting platforms provide communication.
Sermocino provides **communication understanding**.

During a meeting the system will:

* Transcribe speech in real time
* Detect topics and intent
* Measure engagement
* Build a temporal interaction graph
* Estimate influence between participants

This enables research-grade insights into discussions, collaboration, and persuasion dynamics.

---

## Current Development Phase

We are currently building foundational infrastructure:

**Phase 1 — Platform Backbone**

* Auth microservice
* Room & membership model
* Realtime chat service
* Presence tracking

**Phase 2 — Collaboration**

* File sharing
* Attachments
* Message events

**Phase 3 — Media**

* WebRTC meetings
* Broadcast sessions
* Recording pipeline

**Phase 4 — Intelligence**

* Speech-to-text streaming
* NLP processing
* Influence graph engine
* Live analytics dashboard

---

## Architecture Overview

Sermocino is designed as an event-driven distributed system.

Client → Edge → Realtime Services → Event Stream → Analysis Pipeline → Graph Engine → Analytics

Key ideas:

* Communication path is low latency
* Analysis path is asynchronous
* Services are stateless and horizontally scalable

---

## Tech Stack

### Backend

* Node.js (Fastify)
* WebSocket realtime transport
* gRPC (internal service communication — planned)
* PostgreSQL (persistent data)
* Redis (presence & pub/sub)
* Kafka (event streaming — planned)

### Media & Processing (future)

* WebRTC SFU (LiveKit/mediasoup)
* GPU speech-to-text workers
* NLP stream processors
* Graph database (Neo4j)

---

## Repository Structure

```
sermocino/
  services/
    auth-service/
    chat-service/
    room-service/
    file-service/
  infra/
    postgres/
    redis/
  proto/
  docs/
```

---

## Running Locally (Auth Service)

Start database:

```
cd infra/postgres
docker compose up -d
```

Run service:

```
cd services/auth-service
npm install
npx prisma migrate dev
node src/server.js
```

Server runs at:

```
http://localhost:4000
```

---

## Long Term Goal

Sermocino aims to become:

> A real-time human interaction analysis platform

Not just a meeting tool — but infrastructure for understanding communication itself.

---

## Status

Active development 🚧
Architecture evolving as features are added incrementally.

---

## License

MIT (for now)
