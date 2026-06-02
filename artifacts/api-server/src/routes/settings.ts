import { Router } from 'express';
import { db } from '../../../../lib/db/index';
import { settings } from '../../../../lib/db/schema';
import { z } from 'zod';

const router = Router();

const settingsSchema = z.object({ mrr_goal: z.string() });

router.get('/', async (_req, res) => {
  const row = await db.select().from(settings).limit(1);
  res.json(row[0] || { mrr_goal: '10000.00' });
});

router.put('/', async (req, res) => {
  const parsed = settingsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const { mrr_goal } = parsed.data;
  const existing = await db.select().from(settings).limit(1);
  if (existing[0]) {
    await db.update(settings).set({ mrr_goal }).where(settings.id.eq(existing[0].id));
  } else {
    await db.insert(settings).values({ mrr_goal }).returning();
  }
  const row = await db.select().from(settings).limit(1);
  res.json(row[0]);
});

export default router;
