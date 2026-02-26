import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.sqlite");
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "smart-class-secret-key-2026";

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    roll_no TEXT UNIQUE NOT NULL,
    year INTEGER NOT NULL,
    section TEXT NOT NULL,
    fee_status TEXT DEFAULT 'Pending',
    address TEXT,
    transport TEXT,
    parent_phone TEXT,
    dob TEXT,
    blood_group TEXT,
    attendance REAL DEFAULT 0,
    sgpa REAL DEFAULT 0,
    cgpa REAL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS faculty (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    faculty_id TEXT UNIQUE NOT NULL,
    subject TEXT,
    year_handling TEXT
  );

  CREATE TABLE IF NOT EXISTS hods (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    department TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sections (
    id TEXT PRIMARY KEY,
    dept_id TEXT REFERENCES departments(id),
    year INTEGER NOT NULL,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES students(id),
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    faculty_id TEXT REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS fees (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES students(id),
    amount REAL NOT NULL,
    status TEXT DEFAULT 'Pending',
    date TEXT,
    payment_id TEXT
  );

  CREATE TABLE IF NOT EXISTS library_books (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT,
    year INTEGER,
    copies INTEGER DEFAULT 0,
    issued_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS bus_routes (
    id TEXT PRIMARY KEY,
    bus_number TEXT NOT NULL,
    route TEXT NOT NULL,
    capacity INTEGER,
    driver_name TEXT,
    student_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS hostels (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    total_rooms INTEGER,
    room_capacity INTEGER,
    warden_name TEXT,
    student_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS complaints (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    date TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    questions_json TEXT,
    faculty_id TEXT REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS results (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES students(id),
    quiz_id TEXT REFERENCES quizzes(id),
    score REAL,
    total REAL
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    time TEXT DEFAULT CURRENT_TIMESTAMP,
    type TEXT,
    read BOOLEAN DEFAULT 0
  );
`);

// Seed Admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE role = 'Admin'").get();
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)").run(
    "admin-0", "Super Admin", "admin@pvkk.edu", hashedPassword, "Admin"
  );
}

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // --- API Routes ---

  // Auth
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, department: user.department } });
  });

  // Students
  app.get("/api/students", authenticate, (req, res) => {
    const students = db.prepare(`
      SELECT s.*, u.name, u.email 
      FROM students s 
      JOIN users u ON s.user_id = u.id
    `).all();
    res.json(students);
  });

  app.post("/api/students", authenticate, (req, res) => {
    const { name, email, password, roll_no, department, year, section, address, transport, parent_phone, dob, blood_group } = req.body;
    const userId = `u-${Date.now()}`;
    const studentId = `s-${Date.now()}`;
    const hashedPassword = bcrypt.hashSync(password || "student123", 10);

    const insertUser = db.prepare("INSERT INTO users (id, name, email, password, role, department) VALUES (?, ?, ?, ?, ?, ?)");
    const insertStudent = db.prepare(`
      INSERT INTO students (id, user_id, roll_no, year, section, address, transport, parent_phone, dob, blood_group)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const transaction = db.transaction(() => {
      insertUser.run(userId, name, email, hashedPassword, "Student", department);
      insertStudent.run(studentId, userId, roll_no, year, section, address, transport, parent_phone, dob, blood_group);
    });

    try {
      transaction();
      res.json({ success: true, id: studentId });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Library
  app.get("/api/library", authenticate, (req, res) => {
    const books = db.prepare("SELECT * FROM library_books").all();
    res.json(books);
  });

  app.post("/api/library", authenticate, (req, res) => {
    const { name, department, year, copies } = req.body;
    const id = `b-${Date.now()}`;
    db.prepare("INSERT INTO library_books (id, name, department, year, copies) VALUES (?, ?, ?, ?, ?)").run(
      id, name, department, year, copies
    );
    res.json({ success: true, id });
  });

  // Analytics
  app.get("/api/analytics/overview", authenticate, (req, res) => {
    const studentCount = db.prepare("SELECT COUNT(*) as count FROM students").get();
    const facultyCount = db.prepare("SELECT COUNT(*) as count FROM faculty").get();
    const deptCount = db.prepare("SELECT COUNT(*) as count FROM departments").get();
    const feeCollection = db.prepare("SELECT SUM(amount) as total FROM fees WHERE status = 'Paid'").get();

    res.json({
      students: studentCount,
      faculty: facultyCount,
      departments: deptCount,
      fees: feeCollection
    });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
