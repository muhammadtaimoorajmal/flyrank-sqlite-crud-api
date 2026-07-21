const express = require('express');
const db = require('./database'); // Import our SQLite database connection

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// GET /tasks: Return all tasks from the database
app.get('/tasks', (req, res) => {
    // Execute a SQL query to get every task
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);
});

// GET /tasks/:id: Return a single task from the database
app.get('/tasks/:id', (req, res) => {
    // Fetch one row using a parameterized query placeholder (?)
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    
    // Unknown ids still return a 404 error exactly like Assignment 1
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});