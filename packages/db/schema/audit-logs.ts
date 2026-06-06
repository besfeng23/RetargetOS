import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull(),
  userId: text('user_id'),
  event: text('event').notNull(),
  details: jsonb('details'),
  createdAt: timestamp('created_at').defaultNow(),
});
