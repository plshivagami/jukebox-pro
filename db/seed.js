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
  try {
    console.log("Seeding database...");

    // Step 1: Create 2 users
    const user1 = await createUser("alice", "password123");
    const user2 = await createUser("bob", "hunter2");

    console.log(
      `✅ Created users: ${user1.username} (id=${user1.id}), ${user2.username} (id=${user2.id})`
    );

    // Step 2: Create a playlist for each user
    const playlist1 = await createPlaylist(
      "Alice's Favorites",
      "Best of Alice",
      user1.id
    );
    const playlist2 = await createPlaylist(
      "Bob's Mix",
      "Bob's top hits",
      user2.id
    );

    console.log(
      `✅ Created playlists: "${playlist1.name}" and "${playlist2.name}"`
    );

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

    console.log("✅ Added 5 tracks to each playlist");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
}
