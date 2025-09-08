import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { getTracksByPlaylistId } from "#db/queries/tracks";

const router = express.Router();

// All routes require authentication
router.use(requireUser);

// GET all playlists (owned by user)
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

// POST a new playlist
router.post("/", requireBody(["name", "description"]), async (req, res) => {
  const { name, description } = req.body;
  const playlist = await createPlaylist(name, description, req.user.id);
  res.status(201).send(playlist);
});

// Load playlist by ID
router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");
  req.playlist = playlist;
  next();
});

// GET a single playlist
router.get("/:id", (req, res) => {
  res.send(req.playlist);
});

// GET and POST tracks for a playlist
router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

router.post("/:id/tracks", requireBody(["trackId"]), async (req, res) => {
  const { trackId } = req.body;

  // Ownership check
  if (req.playlist.user_id !== req.user.id) {
    return res.status(403).send("You do not own this playlist.");
  }

  const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
  res.status(201).send(playlistTrack);
});

export default router;
