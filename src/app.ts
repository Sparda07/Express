import express from 'express';
import { Pool } from 'pg';
import { initDB } from './db/index.js';
import { pool } from './db/index.js';
import { userRoute } from './modules/users/user.route.js';
import { profileRoute } from './modules/profile/profile.route.js';
import fs from 'fs';
import logger from './middleare/logger.js';

// middleware
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custome middleware for logging

app.use(logger);



// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);


export default app;