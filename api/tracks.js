import express from "express";
import requireUser from "#middleware/requireUser";
//import requireBody from "#middleware/requireBody";
import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistById } from "#db/queries/playlists";

const router = express.Router();
router.use(requireUser);
export default router;

router.route("/tracks").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
  //res.status(200).send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
  //res.status(200).send(track);
});
router.route("/:id/playlists").get(async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");

  const playlists = await getPlaylistById(track.id);
  res.status(200).send(playlists);
});
