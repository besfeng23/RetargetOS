import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';
import { profiles } from './profiles';
import { relations } from 'drizzle-orm';

export const suppressionList = pgTable('suppression_list', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  profileId: uuid('profile_id').references(() => profiles.id, { onDelete: 'cascade' }),
  
  // Identity to suppress (hashed or tokenized)
  identityValue: varchar('identity_value', { length: 255 }).notNull(),
  identityType: varchar('identity_type', { length: 50 }).notNull(),
  // e.g., 'email_hash', 'phone_hash'
  
  // Reason for suppression
  reason: varchar('reason', { length: 255 }).notNull(),
  // Values: 'global_suppression', 'opt_out', 'deletion_request', 'fraud_detected', 'compliance_risk'
  
  // Scope of suppression (e.g., specific channel, entire workspace)
  scope: varchar('scope', { length: 100 }).notNull().default('workspace'),
  
  // Source of suppression signal
  source: varchar('source', { length: 100 }).notNull(),
  
  // Metadata for context
  metadata: jsonb('metadata').default({}),
  
  // Expiration of suppression (for temporary cases)
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  
  // Audit trail
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const suppressionListRelations = relations(suppressionList, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [suppressionList.workspaceId],
    references: [workspaces.id],
  }),
  profile: one(profiles, {
    fields: [suppressionList.profileId],
    references: [profiles.id],
  }),
}));

export type SuppressionEntry = typeof suppressionList.$inferSelect;
export type SuppressionEntryInsert = typeof suppressionList.$inferInsert;