const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const { readDb, writeDb } = require("./db");
const { requireAdmin, requireAuth } = require("./auth");

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);
const JWT_SECRET = process.env.JWT_SECRET;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "admin@example.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

if (!JWT_SECRET) {
  throw new Error('Missing env "JWT_SECRET" (see backend/.env.example).');
}

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser clients (no Origin header).
      if (!origin) return cb(null, true);

      // Allow any localhost dev server port by default.
      if (/^http:\/\/localhost:\d+$/.test(origin)) return cb(null, true);

      // Allow explicitly configured origin(s).
      const allow = String(CORS_ORIGIN)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (allow.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: false
  })
);
app.use(express.json());

app.get("/api", (_req, res) => {
  res.json({
    message: "Task Manager API is running",
    endpoints: {
      health: "GET /api/health",
      register: "POST /api/register",
      login: "POST /api/login",
      tasks: "GET/POST /api/tasks",
      taskById: "GET/PUT/DELETE /api/tasks/:id"
    }
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, password are required" });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const db = await readDb();

  const existing = db.users.find((u) => u.email === normalizedEmail);
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(String(password), 10);
  const role = ADMIN_EMAILS.includes(normalizedEmail) ? "admin" : "user";
  const user = {
    id: uuidv4(),
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash,
    role
  };

  db.users.push(user);
  db.tasksByUserId[user.id] = [];
  await writeDb(db);

  return res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const db = await readDb();

  const user = db.users.find((u) => u.email === normalizedEmail);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, name: user.name, role: user.role || "user" },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({ token });
});

app.get("/api/me", requireAuth, async (req, res) => {
  const db = await readDb();
  const user = db.users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "user"
  });
});

app.get("/api/tasks", requireAuth, async (req, res) => {
  const db = await readDb();
  const tasks = db.tasksByUserId[req.user.sub] || [];
  return res.json(tasks);
});

app.post("/api/tasks", requireAuth, async (req, res) => {
  const { title, description = "", status = "pending" } = req.body || {};

  if (!title || !String(title).trim()) {
    return res.status(400).json({ message: "title is required" });
  }

  const now = new Date().toISOString();
  const task = {
    id: uuidv4(),
    userId: req.user.sub,
    title: String(title).trim(),
    description: String(description ?? ""),
    status: status === "completed" ? "completed" : "pending",
    createdAt: now,
    updatedAt: now
  };

  const db = await readDb();
  const list = db.tasksByUserId[req.user.sub] || [];
  list.unshift(task);
  db.tasksByUserId[req.user.sub] = list;
  await writeDb(db);

  return res.status(201).json(task);
});

app.get("/api/tasks/:id", requireAuth, async (req, res) => {
  const db = await readDb();
  const list = db.tasksByUserId[req.user.sub] || [];
  const task = list.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.json(task);
});

app.put("/api/tasks/:id", requireAuth, async (req, res) => {
  const { title, description, status } = req.body || {};

  const db = await readDb();
  const list = db.tasksByUserId[req.user.sub] || [];
  const idx = list.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Task not found" });

  const existing = list[idx];
  const next = {
    ...existing,
    title: title !== undefined ? String(title).trim() : existing.title,
    description: description !== undefined ? String(description ?? "") : existing.description,
    status: status !== undefined ? (status === "completed" ? "completed" : "pending") : existing.status,
    updatedAt: new Date().toISOString()
  };

  if (!next.title) return res.status(400).json({ message: "title is required" });

  list[idx] = next;
  db.tasksByUserId[req.user.sub] = list;
  await writeDb(db);

  return res.json(next);
});

app.delete("/api/tasks/:id", requireAuth, async (req, res) => {
  const db = await readDb();
  const list = db.tasksByUserId[req.user.sub] || [];
  const next = list.filter((t) => t.id !== req.params.id);
  db.tasksByUserId[req.user.sub] = next;
  await writeDb(db);
  return res.status(204).send();
});

app.get("/api/admin/users", requireAuth, requireAdmin, async (_req, res) => {
  const db = await readDb();
  const users = db.users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role || "user"
  }));
  return res.json(users);
});

app.get("/api/admin/tasks", requireAuth, requireAdmin, async (_req, res) => {
  const db = await readDb();
  const usersById = new Map(db.users.map((u) => [u.id, u]));
  const all = [];

  for (const [userId, tasks] of Object.entries(db.tasksByUserId || {})) {
    for (const t of tasks || []) {
      const owner = usersById.get(userId);
      all.push({
        ...t,
        userId: t.userId || userId,
        owner: owner ? { id: owner.id, name: owner.name, email: owner.email, role: owner.role || "user" } : null
      });
    }
  }

  // Newest first
  all.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  return res.json(all);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}/api`);
});

