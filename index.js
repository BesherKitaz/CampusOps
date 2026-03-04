import express from 'express';
import { type } from 'os';
import path from 'path';
import { title } from 'process';
import { fileURLToPath } from 'url';

const events = [
  {
    id: 1,
    title: "Arab Student League Iftar Night",
    date: "2026-03-20",
    description: "Community iftar gathering during Ramadan with Syrian and Levantine dishes.",
    budget: 350,
    drivers: ["Besher Kitaz", "Omar Khaled"]
  },
  {
    id: 2,
    title: "Shawarma Shuttle Trip",
    date: "2026-04-05",
    description: "Group trip to Louisville to eat shawarma and explore Middle Eastern markets.",
    budget: 200,
    drivers: ["Sara Haddad", "Ali Mansour"]
  },
  {
    id: 3,
    title: "FIRST Robotics Competition Regional",
    date: "2026-04-03",
    description: "Travel with Rat Fight Robotics Team to participate in the regional competition.",
    budget: 1200,
    drivers: ["John Miller", "Emily Carter"]
  },
  {
    id: 4,
    title: "International Food Festival",
    date: "2026-04-18",
    description: "Cultural event where students share dishes from their home countries.",
    budget: 500,
    drivers: ["Lina Darwish", "Michael Brown"]
  },
  {
    id: 5,
    title: "Study Trip to Lexington",
    date: "2026-05-02",
    description: "Day trip for students to visit tech companies and network with professionals.",
    budget: 300,
    drivers: ["Daniel Smith", "Fatima Noor"]
  }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));


app.get('/', (req, res) => {
  res.render('index', { events });
});


app.get('/event/:id', (req, res) => {
  const eventId = req.params.id;
  console.log(eventId, typeof eventId);
  console.log(parseInt(eventId), typeof parseInt(eventId));
  const event = events.find( e => e.id === parseInt(eventId) );
  if (event) {
    res.render('event', { event });
  } else {
    res.status(404).send('Event not found');
  }
})

// app.get('*', function...) did not work
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('CamOps server is running on port 3000');
  console.log('Server started on: http://127.0.0.1:3000/');
  console.log("Press Ctrl + C for shut down");
});

