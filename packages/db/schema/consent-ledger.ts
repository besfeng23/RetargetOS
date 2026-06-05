import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';
import { profiles } from './profiles';
import { relations } from 'drizzle-orm';

export const consentLedger = pgTable('consent_ledger', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  profileId: uuid('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  
  // Consent type (e.g., marketing_email, analytics_cookies)
  consentType: varchar('consent_type', { length: 100 }).notNull(),
  
  // Status of consent
  status: varchar('status', { length: 50 }).notNull(),
  // Values: granted, denied, revoked, expired, pending
  
  // Source of consent signal (e.g., website_banner, checkout_form, preference_center)
  source: varchar('source', { length: 100 }).notNull(),
  
  // Description of how and when consent was obtained
  description: text('description'),
  
  // Proof (link to document, screenshot, or audit log entry)
  proof: jsonb('proof').default({}),
  
  // Timing
  grantedAt: timestamp('granted_at', { withTimezone: true }),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  
  // Audit trail
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const consentLedgerRelations = relations(consentLedger, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [consentLedger.workspaceId],
    references: [workspaces.id],
  }),
  profile: one(profiles, {
    fields: [consentLedger.profileId],
    references: [profiles.id],
  }),
}));

export type ConsentEntry = typeof consentLedger.$inferSelect;
export type ConsentEntryInsert = typeof consentLedger.$inferInsert;