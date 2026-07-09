# MCP Hub - Phase 0 (Project Setup)

## Overview

MCP Hub is a production-ready platform that manages and interacts with multiple Model Context Protocol (MCP) servers through a centralized web application.

Phase 0 focuses on setting up the development environment, project structure, React frontend, NestJS backend, and API documentation.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios

## Backend

- NestJS
- TypeScript
- Swagger
- Express

## Tools

- Git
- Node.js
- npm
- VS Code
- ESLint
- Prettier

---

# Project Structure

```
MCP-Hub/

├── client/                 # React Application
│
├── server/                 # NestJS API
│
├── mcp/                    # MCP Servers (Future)
│   ├── gmail-mcp/
│   ├── github-mcp/
│   └── common/
│
├── docs/
├── scripts/
├── README.md
└── .gitignore
```

---

# Prerequisites

Install the following software before starting:

- Node.js (22 LTS recommended)
- npm
- Git
- VS Code

Verify installation

```bash
node -v
npm -v
git --version
```

---

# Clone Repository

```bash
git clone <repository-url>

cd MCP-Hub
```

---

# Frontend Setup

Create the React project using Vite

```bash
npm create vite@latest client
```

Select

```
Framework: React

Variant: TypeScript
```

Install dependencies

```bash
cd client

npm install
```

Install additional packages

```bash
npm install react-router-dom axios zustand @tanstack/react-query
```

Run frontend

```bash
npm run dev
```

Application

```
http://localhost:5173
```

---

# Backend Setup

Install Nest CLI

```bash
npm install -g @nestjs/cli
```

Create backend

```bash
nest new server
```

Install dependencies

```bash
cd server

npm install
```

Install Swagger

```bash
npm install @nestjs/swagger swagger-ui-express
```

Install common packages

```bash
npm install @nestjs/config class-validator class-transformer helmet compression cors dotenv reflect-metadata
```

Run server

```bash
npm run start:dev
```

Backend

```
http://localhost:3001
```

---

# Swagger Configuration

Add the following configuration inside `src/main.ts`

```typescript
const config = new DocumentBuilder()
  .setTitle("MCP Hub API")
  .setDescription("API documentation for MCP Hub")
  .setVersion("1.0")
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup("api", app, document);
```

Swagger URL

```
http://localhost:3001/api
```

---

# Environment Variables

## Backend

Create

```
server/.env
```

```
PORT=3001

NODE_ENV=development
```

---

## Frontend

Create

```
client/.env
```

```
VITE_API_URL=http://localhost:3001
```

---

# Enable CORS

Inside `main.ts`

```typescript
app.enableCors({
  origin: "http://localhost:5173",
  credentials: true,
});
```

---

# Recommended Folder Structure

## React

```
src/

components/

pages/

layouts/

services/

hooks/

types/

contexts/

routes/

utils/

assets/

styles/
```

---

## NestJS

```
src/

controllers/

modules/

services/

config/

common/

dto/

entities/

guards/

middlewares/

interceptors/

filters/

utils/
```

---

# Useful Commands

## Frontend

```bash
npm run dev
```

Build

```bash
npm run build
```

---

## Backend

Development

```bash
npm run start:dev
```

Production

```bash
npm run build

npm run start:prod
```

---

# API Documentation

Swagger

```
http://localhost:3001/api
```

---

# Phase 0 Checklist

- [x] Git Repository Initialized
- [x] React + TypeScript Setup
- [x] NestJS Setup
- [x] Swagger Integration
- [x] Environment Variables
- [x] CORS Configuration
- [x] ESLint
- [x] Prettier
- [x] Initial Folder Structure
- [x] First Commit

---

# Upcoming Phases

## Phase 1

- Authentication (JWT)
- Google OAuth
- PostgreSQL
- TypeORM / Prisma
- User Management
- Docker
- Logging
- Error Handling

## Phase 2

- Gmail MCP Server
- OAuth Integration
- Gmail Tools

## Phase 3

- GitHub MCP Server
- Repository APIs
- Pull Requests
- Issues

## Phase 4

- MCP Orchestrator
- MCP Registry
- Dynamic Tool Loading

## Phase 5

- AI Agent Integration
- LLM Support
- Workflow Automation
- Multi-MCP Execution

---

# License

This project is intended for learning and production-ready MCP development.
