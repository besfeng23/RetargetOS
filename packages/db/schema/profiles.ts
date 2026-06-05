import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';
import { relations } from 'drizzle-orm';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  
  // Primary identity key (hashed or tokenized, never raw PII)
  canonicalIdentity: varchar('canonical_identity', { length: 255 }).notNull(),
  
  // Lifecycle state
  lifecycleStage: varchar('lifecycle_stage', { length: 50 }).notNull().default('lead'),
  // Values: lead, prospect, customer, inactive, deleted
  
  // Consent & suppression snapshot (denormalized for fast queries)
  consentStatus: varchar('consent_status', { length: 50 }).notNull().default('unknown'),
  // Values: granted, denied, revoked, expired, unknown
  
  suppressionStatus: varchar('suppression_status', { length: 50 }).notNull().default('none'),
  // Values: none, global_suppression, opt_out, deletion_requested, fraud_detected, compliance_risk
  
  // Revenue signals (denormalized for audience building)
  totalRevenue: text('total_revenue').default('0'), // Stored as currency string to avoid float precision
  lifetimeValue: text('lifetime_value').default('0'),
  lastPurchaseAt: timestamp('last_purchase_at', { withTimezone: true }),
  repeatPurchaseCount: text('repeat_purchase_count').default('0'),
  
  // Engagement signals
  lastEventAt: timestamp('last_event_at', { withTimezone: true }),
  eventCount: text('event_count').default('0'),
  
  // Metadata (schema-free storage for extensibility)
  metadata: jsonb('metadata').default({}),
  
  // Audit trail
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export const profileRelations = relations(profiles, ({ many, one }) => ({
  workspace: one(workspaces, {
    fields: [profiles.workspaceId],
    references: [workspaces.id],
  }),
  identityKeys: many(identityKeys),
  consentLedger: many(consentLedger),
  suppressionEntries: many(suppressionList),
  events: many(events),
}));

export type Profile = typeof profiles.$inferSelect;
export type ProfileInsert = typeof profiles.$inferInsert;