import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load .env.local file
config({ path: '.env' });

export default defineConfig({
  schema: './src/configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL, // Ensure this is defined in .env.local
  },
});
