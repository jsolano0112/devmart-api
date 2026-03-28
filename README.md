# 🛒 DEVMART API | by Wilson Estrada and Juana Solano

A modern **Node.js API** built with **TypeScript**, designed for a real-time e-commerce platform.  
This project follows a **Hexagonal Architecture**, emphasizing separation of concerns and scalability.

---

## 🛠️ Tech Stack

- Node.js + TypeScript
- Express.js (API framework)
- Mongoose (MongoDB ODM)
- Swagger (API documentation)
- Hexagonal Architecture
- ESLint + Prettier (code quality and formatting)

---

## 🚀 Features

- **Hexagonal structure**: Domain-driven folders (e.g., `users`, `orders`, `products`).
- **Swagger Documentation**: Available at [http://localhost:3000/swagger](http://localhost:3000/swagger).
- **MongoDB with Mongoose**: Flexible schema definitions and database access.
- **Real-time shipping updates**.
- **TypeScript**: Strong typing for reliability and maintainability.

---

## 🏗️ Project Structure

```bash
├── src/
│   ├── categories/              # Domain module (same structure as other domains)
│   │   ├── application/         # Application layer
│   │   │   ├── controller/      # HTTP controllers
│   │   │   ├── middlewares/     # Module-specific middlewares
│   │   │   ├── routes/          # Route definitions
│   │   │   └── use-cases/       # Business use cases
│   │   ├── dominio/             # Domain layer
│   │   │   ├── models/          # Schemas or entities (Mongoose)
│   │   │   └── repositories/    # Data access repositories (Mongoose)
│   │   └── infrastructure/      # Infrastructure layer
│   │   │   ├── seeders/         # Seed data specific to this module
│   │       └── categories-service-container.ts # Service container for dependency injection
│   │
│   ├── shared/                  # Shared resources across all modules
│   │   ├── helpers/             # Utility and helper functions
│   │   ├── infrastructure/      # Global infrastructure and configuration
│   │   │   ├── auth/            # Authentication and JWT handling
│   │   │   ├── db/              # Database configuration
│   │   │   │   └── mongodb.config.ts
│   │   │   ├── seeders/         # Central entry point for running all seeders
│   │   │   └── repository-container.ts  # Centralized repository registration
│   │   └── interfaces/          # Shared TypeScript interfaces and types
 └── ...
```

---

## ⚙️ Configuration

The MongoDB connection requires credentials.

Update the following file:

```bash
src\shared\infraestructure\db\mongodb.config.ts
```

```bash
import mongoose from 'mongoose';
const DB_PASSWORD = '';
const DB_USERNAME = '';
const MONGOATLAS_URL: string = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.bbdjdbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const DB_NAME: string = '';


export const dbConnection = async () => {
  try {
    await mongoose.connect(`${MONGOATLAS_URL}/${DB_NAME}`);
    console.log('[DB-STATUS] MongoDB is online');
  } catch (error) {
    console.error(error);
    throw new Error('[DB-ERROR] it is not possible to connect');
  }
};
```

---

## 📦 Installation

Clone the repository

```
https://github.com/jsolano0112/devmart-api.git
```

Navigate into the project and install dependencies

```
npm install
```

---

## ▶️ Running the Project

```
npm start
```

---

## 🧹 Linting & Formatting

```
npm run format
```

---

## 🌱 Seeds

```
npm run seed
```

---

## 👁‍🗨 Tests

```
npm run test
```

```
npm install --save-dev jest
```
```
npm install -D node-mocks-http

````
---

## ↔ Socket

```
npx ts-node src/server.ts
```

---
