# MCP Hub

> A production-ready platform for building, managing, and orchestrating multiple **Model Context Protocol (MCP)** servers using **React**, **NestJS**, and the official **MCP SDK**.

---

# Overview

MCP Hub is designed to simplify communication between AI applications and external tools by implementing the **Model Context Protocol (MCP)**.

The project consists of three major components:

- **React Frontend** – User Interface
- **NestJS Backend** – REST API & MCP Client
- **Standalone MCP Servers** – Expose tools using the MCP protocol

The long-term goal is to support integrations such as:

- Gmail
- GitHub
- Jira
- AWS
- Slack
- Custom Enterprise APIs
- AI Orchestrators

---

# High-Level Architecture

```text
                    React Application
                           │
                           ▼
                     NestJS Backend
                    (REST + MCP Client)
                           │
            STDIO / Streamable HTTP Transport
                           │
                           ▼
                  Standalone MCP Server
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
    Health Tool      Calculator Tool      Echo Tool
                           │
                     Future Integrations
                           │
      Gmail • GitHub • Jira • AWS • Slack
```

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Zustand
- React Query

---

## Backend

- NestJS
- TypeScript
- Express
- Swagger

---

## MCP

- @modelcontextprotocol/sdk
- STDIO Transport
- Zod

---

## Development Tools

- Git
- GitHub
- Node.js
- npm
- VS Code
- ESLint
- Prettier

---

# Current Project Structure

```text
MCP-Hub/

│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   │
│   ├── src/
│   │   │
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   │
│   │   ├── mcp-client/
│   │   │   ├── mcp-client.module.ts
│   │   │   ├── mcp-client.service.ts
│   │   │   └── mcp-client.controller.ts
│   │   │
│   │   └── ...
│   │
│   ├── mcp-server/
│   │   │
│   │   ├── main.ts
│   │   ├── register-tools.ts
│   │   │
│   │   ├── tools/
│   │   │
│   │   ├── health/
│   │   ├── time/
│   │   ├── calculator/
│   │   └── echo/
│   │
│   └── package.json
│
├── docs/
├── README.md
└── .gitignore
```

---

# Prerequisites

Install the following software.

- Node.js (22 LTS Recommended)
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
git clone https://github.com/<your-username>/MCP-Hub.git

cd MCP-Hub
```

---

# Frontend Setup

Create React application.

```bash
npm create vite@latest client
```

Choose

```
Framework : React

Variant : TypeScript
```

Install packages

```bash
cd client

npm install
```

Additional packages

```bash
npm install react-router-dom axios zustand @tanstack/react-query
```

Run

```bash
npm run dev
```

Frontend URL

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

Swagger

```bash
npm install @nestjs/swagger swagger-ui-express
```

Common packages

```bash
npm install @nestjs/config class-validator class-transformer helmet compression cors dotenv reflect-metadata
```

Run backend

```bash
npm run start:dev
```

Backend URL

```
http://localhost:3001
```

Swagger

```
http://localhost:3001/api
```

---

# Environment Variables

Backend

```
server/.env
```

```env
PORT=3001

NODE_ENV=development
```

Frontend

```
client/.env
```

```env
VITE_API_URL=http://localhost:3001
```

---

# Enable CORS

```typescript
app.enableCors({
  origin: "http://localhost:5173",
  credentials: true,
});
```

---

# Phase 0 - Project Setup ✅

Phase 0 focused on creating a solid foundation for the project.

## Completed

- React + TypeScript + Vite
- NestJS Backend
- Swagger Integration
- Environment Configuration
- CORS Configuration
- ESLint & Prettier
- Git Repository
- Initial Folder Structure

---

# Phase 1 - Standalone MCP Server ✅

Phase 1 introduces the core of the project—a standalone **Model Context Protocol (MCP) Server**.

Instead of embedding MCP inside the NestJS application, the MCP Server runs as an independent process. This allows the same server to be consumed by multiple MCP clients such as:

- Claude Desktop
- Cursor
- VS Code
- NestJS Backend
- Future AI Agents

---

# Why a Standalone MCP Server?

Keeping the MCP Server independent provides several advantages.

- Separation of concerns
- Independent deployment
- Better scalability
- Easier debugging
- Reusable across multiple clients
- Production-ready architecture

---

# Phase 1 Architecture

```text
                 MCP Inspector
                        │
                 STDIO Transport
                        │
                        ▼
               Standalone MCP Server
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
    Health Tool     Time Tool     Calculator Tool
                                            │
                                            ▼
                                        Echo Tool
```

---

# MCP Server Structure

```text
server/

└── mcp-server/

    │
    ├── main.ts
    ├── register-tools.ts
    │
    ├── tools/
    │
    ├── health/
    │   ├── health.tool.ts
    │   ├── health.service.ts
    │   └── index.ts
    │
    ├── time/
    │   ├── time.tool.ts
    │   ├── time.service.ts
    │   └── index.ts
    │
    ├── calculator/
    │   ├── calculator.tool.ts
    │   ├── calculator.service.ts
    │   ├── calculator.schema.ts
    │   └── index.ts
    │
    └── echo/
        ├── echo.tool.ts
        ├── echo.service.ts
        ├── echo.schema.ts
        └── index.ts
```

---

# Tool Design Pattern

Every MCP Tool follows the same architecture.

```text
Tool

↓

Schema Validation

↓

Business Service

↓

Response
```

Each tool is divided into multiple files.

```text
tool-name/

tool.ts

service.ts

schema.ts

index.ts
```

## Responsibilities

### tool.ts

- Registers the MCP tool
- Defines metadata
- Handles requests
- Returns responses

---

### service.ts

Contains business logic only.

No MCP SDK code should exist inside the service.

---

### schema.ts

Defines Zod validation.

Example:

- numbers
- strings
- arrays
- objects

---

### index.ts

Provides barrel exports for cleaner imports.

---

# Registered MCP Tools

The server currently exposes four tools.

## Health Tool

Returns server health information.

Example Response

```json
{
  "status": "running",
  "timestamp": "2026-07-09T14:29:11.428Z"
}
```

---

## Current Time Tool

Returns the current server timestamp.

Example

```text
2026-07-09T14:35:42.123Z
```

---

## Calculator Tool

Accepts two numbers and performs addition.

Input

```json
{
  "a": 10,
  "b": 20
}
```

Output

```json
{
  "operation": "addition",
  "a": 10,
  "b": 20,
  "result": 30
}
```

---

## Echo Tool

Returns the provided message.

Input

```json
{
  "message": "Hello MCP"
}
```

Output

```text
Hello MCP
```

---

# Running the MCP Server

Navigate to the server directory.

```bash
cd server
```

Start the MCP Server.

```bash
npm run mcp
```

Expected Output

```text
🚀 MCP Server is running on STDIO
```

The server will remain running and wait for MCP clients to connect.

---

# MCP Inspector

The official MCP Inspector is used to test and debug MCP Servers.

It allows you to:

- Connect to an MCP Server
- Discover available tools
- Execute tools
- View tool inputs
- Inspect tool responses
- Debug MCP communication

Install Inspector

```bash
npm install -g @modelcontextprotocol/inspector
```

Launch Inspector

```bash
npx @modelcontextprotocol/inspector npm run mcp
```

The Inspector starts a local web application.

Open the URL displayed in the terminal and connect using the provided session token.

---

# Phase 1 Achievements

Successfully implemented:

- Standalone MCP Server
- STDIO Transport
- Tool Registration
- Modular Tool Structure
- Zod Validation
- Health Tool
- Time Tool
- Calculator Tool
- Echo Tool
- MCP Inspector Integration
- End-to-End Tool Testing

---

# MCP Client (Phase 2 - In Progress)

With the MCP Server completed, the next step is building the **MCP Client** inside the NestJS application.

The MCP Client acts as a bridge between the REST APIs exposed by NestJS and one or more standalone MCP Servers.

Unlike the MCP Inspector, which is only a development tool, the MCP Client becomes part of the production application.

---

# Why an MCP Client?

Instead of calling external APIs directly from the backend, the NestJS application communicates with MCP Servers.

Benefits include:

- Separation of business logic
- Reusable MCP Servers
- Easier integration with AI models
- Multiple MCP Servers can be connected simultaneously
- Better scalability

---

# Overall Architecture

```text
                    React Application
                           │
                           ▼
                    NestJS REST API
                           │
                           ▼
                     MCP Client Layer
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
   Local MCP Server    Gmail MCP        GitHub MCP
        │                  │                  │
        ▼                  ▼                  ▼
     Local Tools      Gmail APIs      GitHub APIs
```

---

# Request Flow

Current Development Flow

```text
MCP Inspector

↓

Standalone MCP Server

↓

Health Tool
Calculator Tool
Echo Tool
```

Production Flow

```text
User

↓

React

↓

REST API

↓

NestJS Controller

↓

MCP Client

↓

Standalone MCP Server

↓

Tool Execution

↓

JSON Response

↓

React UI
```

---

# Why Separate the Client and Server?

The project intentionally separates the MCP Client from the MCP Server.

## MCP Server

Responsibilities

- Register tools
- Validate inputs
- Execute business logic
- Return responses

Runs independently using:

```bash
npm run mcp
```

---

## MCP Client

Responsibilities

- Connect to MCP Servers
- Discover available tools
- Execute tools
- Handle transport
- Return responses to REST Controllers

Runs as part of the NestJS application.

```bash
npm run start:dev
```

---

# Folder Structure

```text
server/

├── src/
│   │
│   ├── mcp-client/
│   │   ├── mcp-client.module.ts
│   │   ├── mcp-client.service.ts
│   │   ├── mcp-client.controller.ts
│   │   └── dto/
│   │
│   └── ...
│
└── mcp-server/
```

---

# Current Development Workflow

## Start React

```bash
cd client

npm run dev
```

---

## Start NestJS

```bash
cd server

npm run start:dev
```

---

## Start MCP Server

Open another terminal.

```bash
cd server

npm run mcp
```

---

## Test using MCP Inspector

```bash
npx @modelcontextprotocol/inspector npm run mcp
```

---

# Available Applications

| Application   | URL                       |
| ------------- | ------------------------- |
| React         | http://localhost:5173     |
| NestJS        | http://localhost:3001     |
| Swagger       | http://localhost:3001/api |
| MCP Inspector | http://127.0.0.1:6274     |

---

# Development Commands

## React

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

---

## NestJS

Development

```bash
npm run start:dev
```

Build

```bash
npm run build
```

Production

```bash
npm run start:prod
```

---

## MCP Server

Run

```bash
npm run mcp
```

---

## MCP Inspector

Launch

```bash
npx @modelcontextprotocol/inspector npm run mcp
```

---

# Phase Progress

| Phase   | Description           | Status         |
| ------- | --------------------- | -------------- |
| Phase 0 | Project Setup         | ✅ Complete    |
| Phase 1 | Standalone MCP Server | ✅ Complete    |
| Phase 2 | MCP Client            | 🚧 In Progress |
| Phase 3 | React Integration     | ⏳ Planned     |
| Phase 4 | Multi-MCP Integration | ⏳ Planned     |
| Phase 5 | AI Orchestrator       | ⏳ Planned     |

---

# What's Coming Next?

## Phase 2

Build the NestJS MCP Client.

Features include:

- Connect to MCP Server
- List Available Tools
- Call Tools
- REST APIs
- DTO Validation
- Error Handling

---

## Phase 3

React Integration.

Features

- Dashboard
- Tool Discovery
- Dynamic Tool Execution
- Result Viewer

---

## Phase 4

Enterprise Integrations

- Gmail MCP
- GitHub MCP
- Jira MCP
- AWS MCP
- Slack MCP

---

## Phase 5

AI Orchestrator

Features

- LLM Integration
- Dynamic Tool Selection
- Multi-Step Workflows
- AI Agent Execution
- Multi-MCP Coordination

---

# Long-Term Vision

MCP Hub aims to become a centralized platform for discovering, managing, and orchestrating multiple Model Context Protocol (MCP) servers.

Rather than building one-off integrations directly into an application, MCP Hub provides a standardized way to expose and consume tools across different systems.

The long-term objective is to support enterprise integrations, AI agents, and workflow automation through a modular MCP ecosystem.

---

# Future Architecture

```text
                                   React Dashboard
                                          │
                                          ▼
                                  NestJS Backend
                             (REST API + MCP Client)
                                          │
         ┌────────────────────────────────┼────────────────────────────────┐
         ▼                                ▼                                ▼
   Local MCP Server                 Gmail MCP Server                 GitHub MCP Server
         │                                │                                │
         ▼                                ▼                                ▼
  Calculator Tool                  Gmail APIs                     GitHub REST APIs
  Echo Tool
  Health Tool
  Time Tool

         ┌────────────────────────────────┼────────────────────────────────┐
         ▼                                ▼                                ▼
     Jira MCP Server                 AWS MCP Server                  Slack MCP Server
         │                                │                                │
         ▼                                ▼                                ▼
      Jira APIs                   AWS SDK / APIs                    Slack APIs

                                          │
                                          ▼
                                AI Orchestrator Layer
                                          │
                                          ▼
                               OpenAI / Gemini / Claude
```

---

# Design Principles

The project follows a few core principles.

## Modular

Each MCP Server is an independent application.

## Scalable

New integrations can be added without changing existing servers.

## Reusable

The same MCP Server can be consumed by:

- React Applications
- NestJS Applications
- AI Agents
- Claude Desktop
- Cursor
- VS Code
- Other MCP-compatible clients

## Production Ready

The project is structured for maintainability and enterprise use.

---

# Coding Standards

## TypeScript

- Prefer TypeScript over JavaScript.
- Use strict typing wherever possible.
- Avoid using `any`.

---

## Folder Structure

Keep features modular.

Example:

```text
calculator/

calculator.tool.ts

calculator.service.ts

calculator.schema.ts

index.ts
```

---

## Business Logic

Business logic should live inside service classes.

Tool registration files should only:

- Register tools
- Validate input
- Call services
- Return responses

---

## Validation

All tool inputs should use **Zod** schemas.

---

## Formatting

Use:

- ESLint
- Prettier

before committing changes.

---

# Git Workflow

Create a feature branch.

```bash
git checkout -b feature/<feature-name>
```

Commit using meaningful messages.

Examples:

```text
feat: add calculator MCP tool

feat: implement MCP client

feat: integrate Gmail MCP

fix: handle calculator validation

refactor: modularize MCP tools

docs: update README
```

Push changes.

```bash
git push origin <branch-name>
```

---

# Contributing

Contributions are welcome.

Suggested workflow:

1. Fork the repository.
2. Create a feature branch.
3. Commit changes with clear messages.
4. Open a Pull Request.

Please ensure:

- Code builds successfully.
- Linting passes.
- Documentation is updated.
- New features include appropriate tests (when applicable).

---

# Learning Roadmap

This repository is being developed incrementally.

Completed

- ✅ React Setup
- ✅ NestJS Setup
- ✅ Swagger
- ✅ Standalone MCP Server
- ✅ MCP Inspector Integration
- ✅ Health Tool
- ✅ Time Tool
- ✅ Calculator Tool
- ✅ Echo Tool

In Progress

- 🚧 NestJS MCP Client

Upcoming

- ⏳ React Integration
- ⏳ Gmail MCP
- ⏳ GitHub MCP
- ⏳ Jira MCP
- ⏳ AWS MCP
- ⏳ AI Orchestrator
- ⏳ Multi-MCP Support
- ⏳ Authentication & Authorization
- ⏳ Docker & Deployment
- ⏳ Monitoring & Logging

---

# Useful Resources

- MCP Specification: https://modelcontextprotocol.io/
- MCP SDK: https://github.com/modelcontextprotocol/typescript-sdk
- NestJS: https://nestjs.com/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/

---

# License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project in accordance with the terms of the license.

---

# Acknowledgements

Special thanks to the Model Context Protocol community for creating an open standard that enables interoperable AI applications and tool integrations.

---

# Author

**Prashant Malakoti**

Senior Full Stack Developer

**Tech Stack**

- Node.js
- NestJS
- React
- TypeScript
- AWS
- Docker
- Kubernetes
- MCP
- AI Integrations

---

# Project Status

> **Current Version:** Phase 1 Complete ✅

### Completed

- Production-ready project structure
- Standalone MCP Server
- Official MCP SDK integration
- Modular tool architecture
- Health Tool
- Time Tool
- Calculator Tool
- Echo Tool
- MCP Inspector testing

### Current Focus

Building the **NestJS MCP Client** that will communicate with standalone MCP servers and expose their capabilities through REST APIs.

---

## ⭐ If you found this project helpful, consider giving it a star on GitHub!

# Phase 2 - MCP Client

## Overview

In Phase 1, we built an MCP Server and registered multiple tools. However, the server alone cannot execute tools unless a client communicates with it.

In this phase, we build an **MCP Client** using the official Model Context Protocol SDK. The client connects to the MCP Server over the **STDIO transport**, discovers available tools, executes a selected tool, and receives the response.

This phase helps you understand how AI applications communicate with MCP servers before integrating them into a web application.

---

## Learning Objectives

By the end of this phase, you will understand:

- What an MCP Client is
- Difference between MCP Client and MCP Server
- STDIO Transport
- MCP Handshake
- Tool Discovery
- Tool Execution
- Receiving Tool Responses
- End-to-End MCP Communication

---

## Project Structure

```text
server
│
├── src/
│   └── NestJS Application
│
├── mcp-server/
│   ├── main.ts
│   ├── register-tools.ts
│   └── tools/
│       ├── health/
│       ├── time/
│       ├── calculator/
│       └── echo/
│
├── mcp-client/
│   └── main.ts
│
└── package.json
```

---

## MCP Communication Flow

```text
                MCP CLIENT
                     │
                     ▼
           StdioClientTransport
                     │
                     ▼
                MCP SERVER
                     │
         ┌───────────┼────────────┐
         ▼           ▼            ▼
     Health Tool   Time Tool   Calculator Tool
                     │
                     ▼
               Tool Response
                     │
                     ▼
                MCP Client
```

---

## Step 1 - Create MCP Client

Create a new folder.

```text
server/
└── mcp-client/
      └── main.ts
```

The MCP Client is intentionally kept separate from the NestJS application. This allows you to learn the MCP protocol independently before integrating it into the backend.

---

## Step 2 - Create Client

Create a new client instance.

```ts
const client = new Client({
  name: "mcp-hub-client",
  version: "1.0.0",
});
```

The client identifies itself to the MCP Server during the connection handshake.

---

## Step 3 - Configure Transport

Use the STDIO transport to communicate with the server.

```ts
const transport = new StdioClientTransport({
  command: "npx",
  args: ["ts-node", "mcp-server/main.ts"],
});
```

The transport starts the MCP Server automatically as a child process.

---

## Step 4 - Connect to Server

Connect the client.

```ts
await client.connect(transport);
```

Connection Flow

```text
MCP Client
     │
     ▼
STDIO Transport
     │
     ▼
Launch MCP Server
     │
     ▼
Handshake
     │
     ▼
Connected
```

---

## Step 5 - Discover Available Tools

Request the list of tools from the server.

```ts
const tools = await client.listTools();
```

The server returns metadata for every registered tool.

Example

```text
health
time
calculator
echo
```

This process is called **Tool Discovery**.

---

## Step 6 - Execute a Tool

Execute the Health tool.

```ts
const result = await client.callTool({
  name: "health",
  arguments: {},
});
```

Communication Flow

```text
Client
   │
callTool()
   │
   ▼
MCP Server
   │
Health Tool
   │
Health Service
   │
Return Result
```

---

## Step 7 - Receive Tool Response

Example response

```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"status\":\"UP\",\"uptime\":12.3}"
    }
  ]
}
```

The MCP protocol always returns structured content.

---

## Step 8 - Parse the Response

Parse the JSON string returned by the tool.

```ts
const health = JSON.parse(result.content[0].text);

console.log(health);
```

Example

```text
{
    status: "UP",
    uptime: 12.3
}
```

---

## End-to-End Communication

```text
                MCP CLIENT
                     │
             connect()
                     │
                     ▼
               MCP SERVER
                     │
             listTools()
                     │
                     ▼
       health
       time
       calculator
       echo
                     │
             callTool("health")
                     │
                     ▼
             Health Service
                     │
             getHealth()
                     │
                     ▼
            JSON Response
                     │
                     ▼
               MCP Client
```

---

## What We Learned

✔ Created an MCP Client

✔ Connected to an MCP Server

✔ Performed the MCP Handshake

✔ Discovered available tools

✔ Executed MCP tools

✔ Received structured tool responses

✔ Parsed returned data

✔ Understood end-to-end MCP communication

---

## Current Project Progress

```text
✔ Phase 0
Project Setup

✔ Phase 1
MCP Server
    ✔ Register Tools
    ✔ Health Tool
    ✔ Time Tool
    ✔ Calculator Tool
    ✔ Echo Tool

✔ Phase 2
MCP Client
    ✔ Client Creation
    ✔ STDIO Transport
    ✔ Handshake
    ✔ Tool Discovery
    ✔ Tool Execution
    ✔ Response Handling

⬜ Phase 3
NestJS Integration

⬜ Phase 4
React Dashboard

⬜ Phase 5
LLM Integration

⬜ Phase 6
Production Architecture
```

---

## Next Phase

In Phase 3, the standalone MCP Client will be integrated into the NestJS application.

Architecture

```text
React UI
    │
HTTP
    │
NestJS API
    │
MCP Service
    │
MCP Client
    │
MCP Server
    │
Registered Tools
```

This architecture allows the backend to communicate with one or more MCP servers and expose their functionality through REST APIs.
