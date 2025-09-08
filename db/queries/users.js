import db from "#db/client";

// Create a new user (password should already be hashed before calling this)
export async function register(username, password) {
  const SQL = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  const { rows } = await db.query(SQL, [username, password]);
  return rows[0];
}

// Find a user by username
export async function getUserByUsername(username) {
  const SQL = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
  const { rows } = await db.query(SQL, [username]);
  return rows[0];
}

// Get a user by ID (optional, useful for "about me" or auth middleware)
export async function getUserById(id) {
  const SQL = `
    SELECT id, username
    FROM users
    WHERE id = $1
  `;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}

export async function login(username) {
  const SQL = `
        SELECT * FROM users where username = $1;
    `;
  const { rows } = await db.query(SQL, [username]);
  return rows[0];
}

export async function getAboutMe(id) {
  const {
    rows: [row],
  } = await db.query(`SELECT id, username FROM users WHERE id = $1`, [id]);
  return row;
}
