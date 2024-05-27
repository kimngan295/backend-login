import express from 'express';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';
import cors from 'cors';

import connectDB from './src/configs/connectionDB.js';
import { initAPIRoute } from './src/routes/routes.js';
import { bodyParserMiddleware, bodyParserMiddlewareUrlencoded } from './src/middlewares/bodyParser.js';


dotenv.config();
const app = express();

connectDB();
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
})

app.use(cookieparser())
app.use(bodyParserMiddleware)
app.use(bodyParserMiddlewareUrlencoded)

initAPIRoute(app)

// Server setup
const PORT = process.env.PORT || 5000;
const HOST_NAME = process.env.HOST_NAME || 'localhost'

app.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}/`)
})