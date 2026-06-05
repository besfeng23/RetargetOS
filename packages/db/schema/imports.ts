import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';
import { relations } from 'drizzle-orm';

export const imports = pgTable('imports', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  
  // Import details
  fileName: varchar('file_name', { length: 255 }).notNull(),
  source: varchar('source', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  // Values: pending, processing, completed, failed
  
  // Row counts for progress tracking
  totalRows: text('total_rows').default('0'),
  processedRows: text('processed_rows').default('0'),
  failedRows: text('failed_rows').default('0'),
  
  // Error details
  errorDetails: jsonb('error_details').default({}),
  
  // Timing
  startedAt: timestamp('started_at', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  
  // Audit trail
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const importRelations = relations(imports, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [imports.workspaceId],
    references: [workspaces.id],
  }),
}));

export type Import = typeof imports.$inferSelect;
export type ImportInsert = typeof imports.$inferInsert;