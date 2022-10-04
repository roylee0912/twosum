const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

export const CLOUD_NAME = process.env.CLOUD_NAME || 'cloud-name';
export const API_KEY = process.env.API_KEY || 'api-key';
export const API_SECRET = process.env.API_SECRET || 'secret-key';