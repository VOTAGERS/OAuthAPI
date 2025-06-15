import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import AppRoutes from './routes/AppRoutes.js'
config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', AppRoutes)

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
})