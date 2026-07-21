const Database = require('better-sqlite3');
const db = new Database('tasks.db');

// Create the tasks table if it doesn't already exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  )
`);

// Seed three example tasks only if the table is empty
const rowCount = db.prepare('SELECT COUNT(*) AS count FROM tasks').get();
if (rowCount.count === 0) {
  const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  insert.run('First example task', 0);
  insert.run('Second example task', 1);
  insert.run('Third example task', 0);
}

module.exports = db;