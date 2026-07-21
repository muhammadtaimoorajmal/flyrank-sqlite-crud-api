const express = require('express');
const db = require('./database'); // Import SQLite database connection

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// --- STAGE 1: READ ENDPOINTS ---

// GET /tasks: Return all tasks from database
app.get('/tasks', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);
});

// GET /tasks/:id: Return a single task by ID
app.get('/tasks/:id', (req, res) => {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

// --- STAGE 2: CREATE ENDPOINT ---

// POST /tasks: Create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
    const info = insert.run(title, 0);

    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newTask);
});

// --- STAGE 3: UPDATE & DELETE ENDPOINTS ---

// PUT /tasks/:id: Update an existing task
app.put('/tasks/:id', (req, res) => {
    const { title, done } = req.body;
    if (!title || done === undefined) {
        return res.status(400).json({ error: "Title and done status are required" });
    }

    const update = db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?');
    const info = update.run(title, done ? 1 : 0, req.params.id);

    if (info.changes === 0) {
        return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    res.json(updatedTask);
});

// DELETE /tasks/:id: Delete a task
app.delete('/tasks/:id', (req, res) => {
    const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
    if (info.changes === 0) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});