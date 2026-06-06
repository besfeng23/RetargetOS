import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const dataSources = pgTable('data_sources', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(), // e.g., 'website', 'mobile', 'crm'
  createdAt: timestamp('created_at').defaultNow(),
});
