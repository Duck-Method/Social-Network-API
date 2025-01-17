import app from './app';
import { connectDB } from './config/database';

const PORT = ProcessingInstruction.env.PORT || 3000;

const startServer = async () => {
    try {
        //Connect to mongoDB
        await connectDB();

        //Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server: ', error);
    }
};

startServer();