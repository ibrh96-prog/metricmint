-- Seed data for MetricMint
CREATE TABLE IF NOT EXISTS metrics (
  id serial PRIMARY KEY,
  month text UNIQUE,
  new_mrr numeric(10,2),
  churned_mrr numeric(10,2),
  new_customers integer,
  churned_customers integer,
  refunds numeric(10,2),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  id serial PRIMARY KEY,
  mrr_goal numeric(10,2)
);

INSERT INTO settings (mrr_goal) VALUES (15000) ON CONFLICT DO NOTHING;

-- 12 months of sample data: gradual growth from ~2000 to ~12000
INSERT INTO metrics (month, new_mrr, churned_mrr, new_customers, churned_customers, refunds)
VALUES
('2025-06', 2000.00, 100.00, 10, 1, 0.00),
('2025-07', 2200.00, 150.00, 12, 2, 0.00),
('2025-08', 2600.00, 200.00, 14, 2, 0.00),
('2025-09', 3200.00, 250.00, 18, 3, 10.00),
('2025-10', 3800.00, 300.00, 20, 3, 20.00),
('2025-11', 4200.00, 350.00, 22, 4, 0.00),
('2025-12', 4800.00, 400.00, 25, 4, 0.00),
('2026-01', 5200.00, 450.00, 26, 5, 0.00),
('2026-02', 6000.00, 500.00, 30, 6, 0.00),
('2026-03', 7200.00, 600.00, 35, 7, 0.00),
('2026-04', 9200.00, 800.00, 45, 9, 0.00),
('2026-05', 12000.00, 1000.00, 60, 12, 0.00)
ON CONFLICT (month) DO NOTHING;