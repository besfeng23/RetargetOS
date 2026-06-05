import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';
import { profiles } from './profiles';
import { relations } from 'drizzle-orm';

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  profileId: uuid('profile_id').references(() => profiles.id, { onDelete: 'set null' }), // Can have anonymous events
  
  // Event details
  name: varchar('name', { length: 255 }).notNull(),
  source: varchar('source', { length: 100 }).notNull(),
  
  // Identity used for ingestion (hashed or tokenized)
  ingestionIdentity: varchar('ingestion_identity', { length: 255 }).notNull(),
  ingestionIdentityType: varchar('ingestion_identity_type', { length: 50 }).notNull(),
  
  // Event properties (schema-free)
  properties: jsonb('properties').default({}),
  
  // Semantic meaning (optional)
  semantics: jsonb('semantics').default({}),
  // Examples: { "action": "purchase", "object": "product", "value": "99.99", "currency": "USD" }
  
  // Contextual information
  context: jsonb('context').default({}),
  // Examples: { "ip_address": "xxx.xxx.xxx.xxx", "user_agent": "...", "page_url": "..." }
  
  // Audit trail
  processedAt: timestamp('processed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const eventRelations = relations(events, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [events.workspaceId],
    references: [workspaces.id],
  }),
  profile: one(profiles, {
    fields: [events.profileId],
    references: [profiles.id],
  }),
}));

export type Event = typeof events.$inferSelect;
export type EventInsert = typeof events.$inferInsert;