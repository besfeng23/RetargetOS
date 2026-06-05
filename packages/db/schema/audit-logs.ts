import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  
  // Action details
  action: varchar('action', { length: 255 }).notNull(),
  targetType: varchar('target_type', { length: 100 }),
  targetId: varchar('target_id', { length: 255 }),
  
  // User who performed the action (can be system)
  actorType: varchar('actor_type', { length: 50 }).notNull().default('system'),
  actorId: varchar('actor_id', { length: 255 }),
  
  // Changes made
  changes: jsonb('changes').default({}),
  
  // Context
  context: jsonb('context').default({}),
  
  // Timestamp
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type AuditLogInsert = typeof auditLogs.$inferInsert;