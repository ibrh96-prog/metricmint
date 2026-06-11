import dotenv from 'dotenv';
import { createApp } from './app';

dotenv.config();

const app = createApp();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`MetricMint API listening on port ${port}`);
});
