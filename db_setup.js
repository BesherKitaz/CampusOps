import pool from "./db_config.js";

async function createTables() {
  try {
    await pool.query(`DROP TABLE IF EXISTS event_drivers;`);
    await pool.query(`DROP TABLE IF EXISTS drivers;`);
    await pool.query(`DROP TABLE IF EXISTS events;`);

    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        event_date DATE NOT NULL,
        budget NUMERIC(10,2) NOT NULL,
        description TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE drivers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await pool.query(`
      CREATE TABLE event_drivers (
        event_id INT NOT NULL,
        driver_id INT NOT NULL,
        PRIMARY KEY (event_id, driver_id),
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Tables created successfully");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    await pool.end();
  }
}

createTables();