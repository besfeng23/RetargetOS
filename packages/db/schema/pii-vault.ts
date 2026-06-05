import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';
import { profiles } from './profiles';
import { relations } from 'drizzle-orm';

export const piiVault = pgTable('pii_vault', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  profileId: uuid('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  
  // Encrypted PII payload
  encryptedData: text('encrypted_data').notNull(),
  
  // Data encryption key (DEK)
  encryptionKeyId: varchar('encryption_key_id', { length: 255 }).notNull(),
  
  // PII type to assist in decryption and usage
  piiType: varchar('pii_type', { length: 50 }).notNull(),
  // Examples: "email_address", "phone_number", "full_name", "shipping_address"
  
  // Access control metadata
  accessPermissions: jsonb('access_permissions').default({}),
  
  // Audit trail
  lastAccessedAt: timestamp('last_accessed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const piiVaultRelations = relations(piiVault, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [piiVault.workspaceId],
    references: [workspaces.id],
  }),
  profile: one(profiles, {
    fields: [piiVault.profileId],
    references: [profiles.id],
  }),
}));

export type PiiVaultEntry = typeof piiVault.$inferSelect;
export type PiiVaultEntryInsert = typeof piiVault.$inferInsert;