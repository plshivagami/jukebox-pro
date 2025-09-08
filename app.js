import express from "express";
import morgan from "morgan";

import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";
import usersRouter from "#api/users";
import getUserFromToken from "#middleware/getUserFromToken";

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// Attach user from JWT token if provided
app.use(getUserFromToken); // <-- remove stray 'v' at the end in your code

// Routers
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);
app.use("/users", usersRouter);

// DB error handler
app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02": // Invalid type
      return res.status(400).send(err.message);
    case "23505": // Unique constraint violation
    case "23503": // Foreign key violation
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export default app;
