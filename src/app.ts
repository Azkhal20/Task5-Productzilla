import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/database';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Database connection
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;