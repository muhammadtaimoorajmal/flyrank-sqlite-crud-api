# FlyRank AI: SQLite CRUD API 🗄️

A Node.js and Express REST API integrating a SQLite database using `better-sqlite3` for local data persistence.

## 📌 Overview
This project transitions an in-memory CRUD API to a persistent storage layer using SQLite. It demonstrates the critical separation of concerns between the API routing layer and the database storage layer. The API endpoints remain exactly the same, but the data now survives server restarts.

## 💡 Why SQLite?
SQLite was chosen for this foundation because it requires zero configuration, operates serverlessly, and stores the entire database in a single file (`tasks.db`). It perfectly demonstrates data persistence without the overhead of spinning up a large database cluster.

## 📂 Database Details
* **File Location:** The database lives entirely inside `tasks.db` at the root of the project.
* **Initialization:** The database and `tasks` table are created automatically when the application runs for the first time. It also automatically seeds three example tasks if the table is empty, ensuring a smooth setup for any developer cloning the repository.

## 🚀 How to Run Locally

1. **Clone the repository:**
```bash
git clone [https://github.com/muhammadtaimoorajmal/flyrank-sqlite-crud-api.git](https://github.com/muhammadtaimoorajmal/flyrank-sqlite-crud-api.git)
cd flyrank-sqlite-crud-api