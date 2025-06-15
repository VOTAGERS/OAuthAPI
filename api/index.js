import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import AppRoutes from '../routes/AppRoutes.js'
import serverless from 'serverless-http';
config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', AppRoutes)

export const handler = serverless(app);