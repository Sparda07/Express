import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';

dotenv.config({
    path: path.join(process.cwd(), '.env')
});


const config = {
    port: process.env.PORT,
    connectionString: process.env.DATABASE_URL as string,
    jwt_Secret: process.env.JWT_SECRET as string,
    Refresh_Secret: process.env.REFRESH_TOKEN_SECRET as string
}

export default config;