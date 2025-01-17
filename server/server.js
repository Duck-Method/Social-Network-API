import express from "express";
import mongoose from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',
);

app.listen(PORT, () => {
    console.log('Serveris litening on http://localhost:${PORT}');
});