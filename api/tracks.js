import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { createTrack, getTracks, getTrackById } from "#db/queries/tracks";

const router = express.Router();

// All routes require authentication
router.use(requireUser);

// GET all tracks
router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

// POST a new track
router.post("/", requireBody(["name", "durationMs"]), async (req, res) => {
  const { name, durationMs } = req.body;
  const track = await createTrack(name, durationMs);
  res.status(201).send(track);
});

// GET a single track
router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

export default router;
