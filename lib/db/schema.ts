import { pgTable, serial, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';

export const metrics = pgTable('metrics', {
  id: serial('id').primaryKey(),
  month: text('month').notNull(),
  new_mrr: numeric('new_mrr', { precision: 10, scale: 2 }).notNull(),
  churned_mrr: numeric('churned_mrr', { precision: 10, scale: 2 }).notNull(),
  new_customers: integer('new_customers').notNull(),
  churned_customers: integer('churned_customers').notNull(),
  refunds: numeric('refunds', { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  mrr_goal: numeric('mrr_goal', { precision: 10, scale: 2 }).notNull(),
});
