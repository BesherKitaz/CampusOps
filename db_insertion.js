import pool from "./db_config.js";

const events = [
  {
    id: 1,
    title: "Arab Student League Iftar Night",
    date: "2026-03-20",
    description: "Community iftar gathering during Ramadan with Syrian and Levantine dishes.",
    budget: 350
  },
  {
    id: 2,
    title: "Shawarma Shuttle Trip",
    date: "2026-04-05",
    description: "Group trip to Louisville to eat shawarma and explore Middle Eastern markets.",
    budget: 200
  },
  {
    id: 3,
    title: "FIRST Robotics Competition Regional",
    date: "2026-04-03",
    description: "Travel with Rat Fight Robotics Team to participate in the regional competition.",
    budget: 1200
  },
  {
    id: 4,
    title: "International Food Festival",
    date: "2026-04-18",
    description: "Cultural event where students share dishes from their home countries.",
    budget: 500
  },
  {
    id: 5,
    title: "Study Trip to Lexington",
    date: "2026-05-02",
    description: "Day trip for students to visit tech companies and network with professionals.",
    budget: 300
  }
];

async function insertEvents() {
  try {
    for (const event of events) {
      await pool.query(
        `
        INSERT INTO events (id, title, event_date, description, budget)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO NOTHING
        `,
        [
          event.id,
          event.title,
          event.date,
          event.description,
          event.budget
        ]
      );
    }

    console.log("✅ Events inserted successfully");

    const result = await pool.query(
      `SELECT * FROM events ORDER BY id;`
    );

    console.log("EVENTS:");
    console.table(result.rows);
  } catch (err) {
    console.error("❌ Error inserting events:", err);
  } finally {
    await pool.end();
  }
}

insertEvents();