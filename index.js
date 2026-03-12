import express from 'express';
import { type } from 'os';
import path from 'path';
import { title } from 'process';
import { fileURLToPath } from 'url';
import pool from './db_config.js';

const EVENTS_WITH_DRIVERS_QUERY = `
  SELECT
    e.id,
    e.title,
    e.event_date::text AS date,
    e.description,
    e.budget,
    COALESCE(
      ARRAY_AGG(d.name ORDER BY d.name) FILTER (WHERE d.name IS NOT NULL),
      '{}'
    ) AS drivers
  FROM events e
  LEFT JOIN event_drivers ed ON ed.event_id = e.id
  LEFT JOIN drivers d ON d.id = ed.driver_id
`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));


app.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `${EVENTS_WITH_DRIVERS_QUERY}
       GROUP BY e.id
       ORDER BY e.event_date, e.id;`
    );

    res.render('index', { events: result.rows });
  } catch (err) {
    console.error('Failed to load events:', err);
    res.status(500).send('Failed to load events');
  }
});


app.get('/event/:id', async (req, res) => {
  const eventId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(eventId)) {
    return res.status(404).send('Event not found');
  }

  try {
    const result = await pool.query(
      `${EVENTS_WITH_DRIVERS_QUERY}
       WHERE e.id = $1
       GROUP BY e.id;`,
      [eventId]
    );

    const event = result.rows[0];

    if (event) {
      return res.render('event', { event });
    }

    return res.status(404).send('Event not found');
  } catch (err) {
    console.error('Failed to load event:', err);
    return res.status(500).send('Failed to load event');
  }
});

// app.get('*', function...) did not work
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('CamOps server is running on port 3000');
  console.log('Server started on: http://127.0.0.1:3000/');
  console.log("Press Ctrl + C for shut down");
});

