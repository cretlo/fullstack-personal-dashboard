# Fullstack Planner App

## Description

`fullstack-planner-app` is a planner application that allows you persist all your scheduled events, to-dos, and notes with a personal account.

### Why?

I was tired of managing multiple phone apps and wanted an application that:

- Had a calendar, note editor, color categorized to-do list, and an upcoming events section synced to my calendar all in one place
- Was able to use on my desktop and mobile devices
- Was not bounded to the local storage of a particular device
- Had a minimal interface

## Tech Stack

- [Vite](https://vitejs.dev/) - Frontend Framework
- [React](https://react.dev/) - UI Library
- [Bootstrap](https://getbootstrap.com/) - CSS Component Library
- [Typescript](https://www.typescriptlang.org/) - Language
- [ExpressJs](https://expressjs.com/) - Backend Web Framework
- [Drizzle](https://orm.drizzle.team) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Relational Database
- [Redis](https://redis.io/) - In-Memory Data Store

## Installation

### Prerequisites

- Nodejs
- Docker and Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/cretlo/fullstack-planner-app.git
cd fullstack-planner-app
```

### 2. Install npm dependencies

```bash
npm install
```

### 3. Start development environment with docker compose

```bash
docker compose -f docker-compose.dev.yaml up -d
```

### 4. Open the app in your browser

http://localhost:3000

## TO-DO

- Remove server/dist directory throughout git history

## Links

[Website](https://planner.ianreimers.com)
