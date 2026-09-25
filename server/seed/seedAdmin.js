import "dotenv/config";
import bcrypt from "bcrypt";
import { pool } from "../config/database.js";

async function seedAdmin() {
  const name = process.env.ADMIN_NAME?.trim() || "Administrator";
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before seeding.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const { rows } = await pool.query(
    `INSERT INTO users (name, role, email, password)
     VALUES ($1, 'admin', $2, $3)
     ON CONFLICT (email) DO NOTHING
     RETURNING id, email`,
    [name, email, passwordHash]
  );

  if (rows.length === 0) {
    throw new Error(`An account already exists for ${email}; no changes were made.`);
  }

  console.log(`Admin account created for ${rows[0].email}.`);
}

try {
  await seedAdmin();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
