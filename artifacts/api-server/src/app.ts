import express from 'express';
import bodyParser from 'body-parser';
import metricsRouter from './routes/metrics';
import settingsRouter from './routes/settings';
import summaryRouter from './routes/summary';
import healthRouter from './routes/health';

export function createApp() {
  const app = express();
  app.use(bodyParser.json());

  app.use('/api/healthz', healthRouter);
  app.use('/api/metrics', metricsRouter);
  app.use('/api/settings', settingsRouter);
  app.use('/api/summary', summaryRouter);

  return app;
}
