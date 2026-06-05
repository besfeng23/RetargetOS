import { pgTable, uuid, varchar, text, timestamp, decimal } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';
import { profiles } from './profiles';
import { relations } from 'drizzle-orm';

export const identityKeys = pgTable('identity_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  profileId: uuid('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  
  // Identity type
  type: varchar('type', { length: 50 }).notNull(),
  // Values: email_hash, phone_hash, external_id, payment_id, marketplace_id
  
  // Hashed or tokenized value (never raw)
  value: varchar('value', { length: 255 }).notNull(),
  
  // Confidence score for probabilistic matching
  confidenceScore: decimal('confidence_score', { precision: 3, scale: 2 }).default('1.00'),
  
  // Source of identity signal
  source: varchar('source', { length: 100 }).notNull(),
  // Examples: "csv_import", "payment_webhook", "marketplace_api", "form_submission"
  
  // Verification status
  verified: text('verified').default('false'),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
  
  // Merge reason (if this identity was created via merge)
  mergeReason: varchar('merge_reason', { length: 255 }),
  
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const identityKeyRelations = relations(identityKeys, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [identityKeys.workspaceId],
    references: [workspaces.id],
  }),
  profile: one(profiles, {
    fields: [identityKeys.profileId],
    references: [profiles.id],
  }),
}));

export type IdentityKey = typeof identityKeys.$inferSelect;
export type IdentityKeyInsert = typeof identityKeys.$inferInsert;