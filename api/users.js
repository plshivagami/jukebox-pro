import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
export default router;
import jwt from "jsonwebtoken";

import { register, login, getAboutMe } from "../db/queries/users.js";

const SECRET = process.env.JWT_SECRET || "12345";

// JWT helpers
const createToken = (id) => {
  try {
    return jwt.sign({ id: id }, SECRET, { expiresIn: "7d" });
  } catch (error) {
    console.error(error);
  }
};

const verifyToken = (token) => {
  console.log(token);
  try {
    console.log(jwt.verify(token, SECRET));
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error(error);
  }
};

const getToken = async (req, res, next) => {
  const authorization = req.get("authorization");
  console.log("Got Authz");
  if (!authorization || !authorization.startsWith("Bearer")) return next();
  const token = authorization.split(" ")[1];
  console.log(token);
  try {
    const { id } = verifyToken(token);
    console.log("id");
    console.log(id);
    console.log("id");
    const user = await getAboutMe(id);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
router.route("/register").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await register(username, hashedPassword);

    const token = createToken(user.id);

    return res.json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await login(username);
    console.log(response);
    if (response) {
      const compare = await bcrypt.compare(password, response.password);
      console.log("compare");
      console.log(compare);
      console.log("compare");
      if (compare) {
        const token = createToken(response.id);
        return res.send(token);
      }
      return res.status(400).send(error);
    }
    return res.status(400).send(error);
  } catch (error) {
    return res.status(400).send(error);
  }
});
router.route("/about_me").get(async (req, res) => {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, SECRET);
    const user = await getAboutMe(id);
    res.send(user);
  } catch (err) {
    res.status(401).send("Invalid token");
  }
});
