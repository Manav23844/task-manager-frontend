const fs = require("node:fs/promises");
const path = require("node:path");

const DB_PATH = path.join(__dirname, "..", "data", "db.json");

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initial = { users: [], tasksByUserId: {} };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
  }
}

async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

async function writeDb(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

module.exports = {
  readDb,
  writeDb
};

