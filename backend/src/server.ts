import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import { connectDatabase } from './configs/db.js';
import authRoutes from './routes/authRoutes.js'
import resetRoutes from './routes/resetRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
const PORT = process.env.PORT || 3000;



const app = express();


app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,

}));

app.use(cookieParser());

app.use(authRoutes)
app.use(resetRoutes)
app.use(taskRoutes)

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`server listening on ${PORT}`);
    })

}).catch(error => {
    console.error('Error connecting to database:', error);
    process.exit(1);
});