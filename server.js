import express from 'express';
import cors from 'cors';
import connect from './db/connectDb.js';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

// web server
const app = express();
app.use(express.json());

app.use(cors());

// dotenv environment setup
dotenv.config();

// // To connected with routes
app.use('/api/posts', postRoutes);

let port = process.env.PORT || 4003;

app.listen(port, async () => {
  console.log(`The App is running on the port ${port}`);
  // connect to the database
  await connect();
});
