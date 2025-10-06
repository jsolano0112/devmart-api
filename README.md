# 🛒 DEVMART API

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
src/
 ├── app.ts              # Application entrypoint
 ├── routes/             # API routes
 ├── db/
 │   └── config/
 │       └── mongodb.ts  # Database configuration
 ├── domains/            # Hexagonal structure by domain
 │   ├── users/          # User domain
 │   ├── orders/         # Orders domain
 │   └── products/       # Products domain
 └── ...
```

---

## ⚙️ Configuration

The MongoDB connection requires credentials.

Update the following file:

```bash
src/db/config/mongodb.ts
```

```bash
const DB_PASSWORD = '';
const DB_USERNAME = '';
const MONGOATLAS_URL: string = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.bbdjdbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const DB_NAME: string = '';
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
