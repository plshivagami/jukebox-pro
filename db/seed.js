// db/seed.js
import { faker } from "@faker-js/faker";
import db from "./client.js";
import { createUser } from "./queries/users.js";
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Step 1: Create 2 users
  //const user1 = await createUser("alice", "password123");
  //const user2 = await createUser("bob", "hunter2");

  // Step 2: Create a playlist for each user
  const playlist1 = await createPlaylist(
    "Alice's Favorites",
    "Best of Alice",
    13
  );
  const playlist2 = await createPlaylist("Bob's Mix", "Bob's top hits", 14);

  // Step 3: Add 5 tracks to each playlist
  for (let i = 1; i <= 5; i++) {
    // Tracks for Alice
    const track1 = await createTrack(
      faker.music.songName(),
      faker.number.int({ min: 10000, max: 300000 }) // duration in ms
    );
    await createPlaylistTrack(playlist1.id, track1.id);

    // Tracks for Bob
    const track2 = await createTrack(
      faker.music.songName(),
      faker.number.int({ min: 10000, max: 300000 }) // duration in ms
    );
    await createPlaylistTrack(playlist2.id, track2.id);
  }

  console.log("✅ Seeded 2 users, 2 playlists, and 10 tracks.");
}

/**
 * id | username |                           password
----+----------+--------------------------------------------------------------
  1 | alice    | $2b$10$9UX8yRYNVjyddwgFprrRkuf9mQYwC/X/3aSQNe8ICWq5X0qoF8Tqa
  2 | bob      | $2b$10$pi8uTupXi4tBszK7YAqEN.WsBuSZEQ//rHtd7tVWGr8Hpa7fuIhJu
(2 rows)

jukebox_pro=# select * from users;
 id | username |                           password
----+----------+--------------------------------------------------------------
  4 | alice    | $2b$10$F1jNg5F6nmvWbdEsLaismuYbF6MZIy58Ka5lit7fQQHHeX01UDzZi
  5 | bob      | $2b$10$4ExvFfxGZiWNgzAqC3/ZL.WPFr7pKsAy7QlkfHRbHaeTnnZ9enYLe
 */
