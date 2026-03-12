import pool from "./db_config.js";

async function checkDB() {
  try {
    const events = await pool.query("SELECT * FROM events;");
    const drivers = await pool.query("SELECT * FROM drivers;");
    const eventDrivers = await pool.query("SELECT * FROM event_drivers;");

    console.log("EVENTS:");
    console.table(events.rows);

    console.log("DRIVERS:");
    console.table(drivers.rows);

    console.log("EVENT_DRIVERS:");
    console.table(eventDrivers.rows);

  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}


checkDB();

