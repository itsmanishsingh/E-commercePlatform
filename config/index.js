import dotenv from 'dotenv';

dotenv.config();

const config = {
    JWT_SECRETKEY : process.env.JWT_SECRETKEY,
    JWT_EXPIRY : process.env.JWT_EXPIRY || '30d',
}

export default config;