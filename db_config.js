import PG from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBDATABASE,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  ssl:  {rejectUnauthorized: false} // For Render's managed PostgreSQL, SSL is required but we can skip certificate verification

}


const pool = new PG.Pool(config)

pool.connect()
  .then(client => {
    console.log("✅ Database connected successfully");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
  });



export default pool;
