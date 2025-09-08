// users.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { register, login, getAboutMe } from "../db/queries/users.js";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "12345";

// JWT helpers
const createToken = (id) => jwt.sign({ id }, SECRET, { expiresIn: "7d" });

// Register route
router.post(
  "/register",
  requireBody(["username", "password"]), // ✅ validate body here
  async (req, res) => {
    try {
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await register(username, hashedPassword);
      const token = createToken(user.id);

      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  }
);

// Login route
router.post(
  "/login",
  requireBody(["username", "password"]), // ✅ validate body here
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await login(username);
      if (!user) return res.status(400).send("Invalid credentials");

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).send("Invalid credentials");

      const token = createToken(user.id);
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
);

// Protected route: about_me
router.get("/about_me", requireUser, async (req, res) => {
  res.json(req.user);
});

export default router;
