import { Router } from 'express';
import { db } from '../../../../lib/db/index';
import { metrics } from '../../../../lib/db/schema';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await db.select().from(metrics).orderBy(metrics.month);
  // convert numeric strings to numbers
  const items = rows.map(r => ({
    ...r,
    new_mrr: Number(r.new_mrr),
    churned_mrr: Number(r.churned_mrr),
    new_customers: Number(r.new_customers),
    churned_customers: Number(r.churned_customers),
  }));

  let netMrr = 0;
  const netByMonth: number[] = [];
  let customers = 0;
  const customersByMonth: number[] = [];

  for (const it of items) {
    netMrr += it.new_mrr - it.churned_mrr;
    netByMonth.push(netMrr);
    customers += it.new_customers - it.churned_customers;
    customersByMonth.push(customers);
  }

  const len = items.length;
  const net_mrr = netByMonth[len - 1] || 0;
  const net_prev = netByMonth[len - 2] || 0;
  const growth_pct = net_prev === 0 ? null : ((net_mrr - net_prev) / Math.abs(net_prev)) * 100;

  const last = items[len - 1];
  const churn_rate = (() => {
    if (!last) return null;
    const start_customers = customersByMonth[len - 2] || 0;
    if (start_customers === 0) return null;
    return (last.churned_customers / start_customers) * 100;
  })();

  const active_customers = customersByMonth[len - 1] || 0;
  const arpu = active_customers === 0 ? null : net_mrr / active_customers;

  res.json({
    net_mrr: net_mrr.toFixed(2),
    growth_pct: growth_pct === null ? null : Number(growth_pct.toFixed(2)),
    churn_rate: churn_rate === null ? null : Number(churn_rate.toFixed(2)),
    arpu: arpu === null ? null : Number(arpu.toFixed(2)),
  });
});

export default router;
