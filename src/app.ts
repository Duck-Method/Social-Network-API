import express from 'express';
import routes from './routes';

const app = express();

//middleware
app.use(express.json());

//API routes
app.use('/api', routes);

export default app;