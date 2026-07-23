import dotenv from 'dotenv';

dotenv.config();

export const BASE_URL =
  process.env.BASE_URL || 'https://dummyjson.com';

export const API_TOKEN =
  process.env.API_TOKEN || '';
