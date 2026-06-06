import { pgTable, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull(),
  externalId: text('external_id'),
  email: text('email'),
  phone: text('phone'),
  isSuppressed: boolean('is_suppressed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const consent = pgTable('consent', {
  id: text('id').primaryKey(),
  profileId: text('profile_id').references(() => profiles.id),
  channel: text('channel').notNull(), // e.g., 'EMAIL', 'SMS', 'ADS'
  hasConsented: boolean('has_consented').default(false),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const audiences = pgTable('audiences', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull(),
  name: text('name').notNull(),
  rules: jsonb('rules'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const events = pgTable('events', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull(),
  name: text('name').notNull(), // e.g., 'purchase', 'lead'
  profileId: text('profile_id').references(() => profiles.id),
  properties: jsonb('properties'),
  createdAt: timestamp('created_at').defaultNow(),
});

export * from './data-sources';
export * from './audit-logs';
