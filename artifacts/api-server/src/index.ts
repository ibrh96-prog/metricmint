import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import metricsRouter from './routes/metrics';
import settingsRouter from './routes/settings';
import summaryRouter from './routes/summary';
import healthRouter from './routes/health';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/healthz', healthRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/summary', summaryRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`MetricMint API listening on port ${port}`);
});
