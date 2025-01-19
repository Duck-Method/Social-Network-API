import express from "express";
import connectDB from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

connectDB();
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});