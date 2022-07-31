import express from 'express';
import cors from 'cors';
import connect from './db/connectDb.js';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

// web server
const app = express();
app.use(express.json({ limit: '50mb' }));

app.use(cors());

// dotenv environment setup
dotenv.config();

// // To connected with routes
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

let port = process.env.PORT || 4010;

app.listen(port, async () => {
  console.log(`The App is running on the port ${port}`);
  // connect to the database
  await connect();
});
