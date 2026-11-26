import express from 'express';
import { Pool } from 'pg';
import { initDB } from './db/index.js';
import { pool } from './db/index.js';
import { userRoute } from './modules/users/user.route.js';
import { profileRoute } from './modules/profile/profile.route.js';
import { authRoute } from './modules/auth/auth.route.js';
import fs from 'fs';
import logger from './middleare/logger.js';
import globalErrorHandler from './middleare/globalHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// middleware



const app = express()

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200 // For legacy browser support
}



app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custome middleware for logging

app.use(logger);



// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandler);

export default app;