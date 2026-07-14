import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Dynamic import AFTER dotenv runs — this is the key
const { createApp } = await import('./app.js');

const app = createApp();
const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});

