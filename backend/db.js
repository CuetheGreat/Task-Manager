import sqlite3 from 'sqlite3'

const DB = new sqlite3.Database("./scheduler.db", (err) => {
    console.log(err ? "Error opening database" : " Connested to SQLite Database")
})

DB.serialize(() => {
    // Create User Table
    DB.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      )`);

    // Create Task Table
    DB.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        priority INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`);
})

export default DB