# TodoFusion

> A modern, full-featured task management application that fuses simplicity with power — built with Node.js.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**TodoFusion** is a task management application designed to help individuals and teams organize, prioritize, and track their work efficiently. It combines a clean user interface with a robust backend to deliver a seamless productivity experience.

Whether you need a personal to-do list or a collaborative project tracker, TodoFusion scales to meet your needs.

---

## Features

- **Task Management** — Create, read, update, and delete tasks with ease
- **Priority Levels** — Assign Low / Medium / High priority to any task
- **Due Dates** — Set deadlines and get reminders for upcoming tasks
- **Status Tracking** — Track tasks through Pending, In Progress, and Completed states
- **Labels & Tags** — Categorize tasks with custom labels for quick filtering
- **Search & Filter** — Instantly search tasks by title, tag, or status
- **User Authentication** — Secure login and registration with JWT
- **REST API** — Full API surface for integration with external tools
- **Responsive UI** — Works on desktop, tablet, and mobile

---

## Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Runtime     | Node.js (v18+)                   |
| Framework   | Express.js                       |
| Database    | MongoDB (via Mongoose)           |
| Auth        | JSON Web Tokens (JWT) + bcrypt   |
| Validation  | Joi / express-validator          |
| Testing     | Jest + Supertest                 |
| Linting     | ESLint + Prettier                |

---

## Project Structure

```
TodoFusion/
├── src/
│   ├── config/            # App configuration (DB, env)
│   ├── controllers/       # Route handler logic
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── middleware/        # Auth, error handling, validation
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/            # Mongoose schemas
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/            # Express routers
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── utils/             # Helper functions
│   └── app.js             # Express app setup
├── tests/                 # Unit and integration tests
├── .env.example           # Sample environment variables
├── .gitignore
├── package.json
├── README.md
└── server.js              # Entry point
```

---

## Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)

Verify your versions:

```bash
node --version
npm --version
```

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/girishlade111/TodoFusion.git
cd TodoFusion
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Open `.env` and fill in the required values (see [Environment Variables](#environment-variables)).

---

### Running the App

**Development mode** (with hot-reload via nodemon):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server starts on `http://localhost:5000` by default.

---

## Usage

Once running, you can interact with TodoFusion via:

- **Browser** — Visit `http://localhost:5000` for the web UI (if frontend is served)
- **REST API** — Use tools like [Postman](https://www.postman.com/) or `curl`
- **CLI** — Use the built-in CLI scripts (if applicable)

### Quick Example — Create a Task

```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build the MVP",
    "description": "Complete the core feature set",
    "priority": "high",
    "dueDate": "2025-12-31"
  }'
```

---

## API Reference

Base URL: `http://localhost:5000/api`

### Authentication

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | `/auth/register`   | Register a new user      |
| POST   | `/auth/login`      | Login and receive JWT    |
| POST   | `/auth/logout`     | Logout (invalidate token)|

### Todos

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/todos`           | Get all todos for the user      |
| POST   | `/todos`           | Create a new todo               |
| GET    | `/todos/:id`       | Get a single todo by ID         |
| PUT    | `/todos/:id`       | Update a todo                   |
| DELETE | `/todos/:id`       | Delete a todo                   |
| PATCH  | `/todos/:id/status`| Update todo status only         |

> All `/todos` routes require a valid `Authorization: Bearer <token>` header.

---

## Environment Variables

Create a `.env` file at the project root based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/todofusion

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# (Optional) Email notifications
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
```

> Never commit your `.env` file. It is listed in `.gitignore`.

---

## Scripts

| Script          | Command             | Description                        |
|-----------------|---------------------|------------------------------------|
| Start           | `npm start`         | Run in production mode             |
| Dev             | `npm run dev`       | Run with nodemon (hot reload)      |
| Test            | `npm test`          | Run test suite with Jest           |
| Lint            | `npm run lint`      | Lint code with ESLint              |
| Format          | `npm run format`    | Auto-format code with Prettier     |

---

## Contributing

Contributions are welcome! Here is how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for commit messages.

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with focus by <a href="https://github.com/girishlade111">girishlade111</a></p>
