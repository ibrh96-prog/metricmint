import { Router } from 'express';
import { db } from '../../../../lib/db/index';
import { metrics } from '../../../../lib/db/schema';
import { z } from 'zod';

const router = Router();

const metricSchema = z.object({
  month: z.string(),
  new_mrr: z.string(),
  churned_mrr: z.string(),
  new_customers: z.number().int(),
  churned_customers: z.number().int(),
  refunds: z.string(),
});

router.get('/', async (_req, res) => {
  const rows = await db.select().from(metrics).orderBy(metrics.month);
  res.json(rows);
});

router.post('/', async (req, res) => {
  const parsed = metricSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const values = parsed.data;
  const result = await db.insert(metrics).values({
    month: values.month,
    new_mrr: values.new_mrr,
    churned_mrr: values.churned_mrr,
    new_customers: values.new_customers,
    churned_customers: values.churned_customers,
    refunds: values.refunds,
  }).returning();
  res.status(201).json(result);
});

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });
  const parsed = metricSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const update = parsed.data;
  await db.update(metrics).set(update).where(metrics.id.eq(id));
  const row = await db.select().from(metrics).where(metrics.id.eq(id));
  res.json(row[0] || null);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });
  await db.delete(metrics).where(metrics.id.eq(id));
  res.status(204).send();
});

export default router;
