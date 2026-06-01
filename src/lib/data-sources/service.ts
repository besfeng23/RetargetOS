import { createAuditLog } from "@/lib/audit";
import { getPrisma } from "@/lib/prisma";
import { TEMP_WORKSPACE_ID } from "./types";
import type { CreateDataSourceInput, DataSourceFilters, UpdateDataSourceInput } from "./validation";

type DataSourceDelegate = {
  findMany: (args: unknown) => Promise<unknown[]>;
  findFirst: (args: unknown) => Promise<unknown | null>;
  create: (args: unknown) => Promise<{ id: string; name: string; type: string }>;
  update: (args: unknown) => Promise<{ id: string; status?: string | null }>;
};

type PrismaWithDataSources = {
  dataSource: DataSourceDelegate;
};

function getSearchFilter(search?: string) {
  if (!search) return undefined;
  return [
    { name: { contains: search, mode: "insensitive" } },
    { description: { contains: search, mode: "insensitive" } },
    { sourceOwner: { contains: search, mode: "insensitive" } },
  ];
}

function buildWhere(filters: DataSourceFilters) {
  const where: Record<string, unknown> = {
    workspaceId: TEMP_WORKSPACE_ID,
    status: { not: "deleted" },
  };

  if (filters.status) where.status = filters.status;
  if (filters.riskLevel) where.riskLevel = filters.riskLevel;
  if (filters.type) where.type = filters.type;

  const searchFilter = getSearchFilter(filters.search);
  if (searchFilter) where.OR = searchFilter;

  return where;
}

export async function listDataSources(filters: DataSourceFilters) {
  const prisma = (await getPrisma()) as PrismaWithDataSources;
  return prisma.dataSource.findMany({
    where: buildWhere(filters),
    orderBy: { updatedAt: "desc" },
  });
}

export async function createDataSource(input: CreateDataSourceInput, actorUserId?: string | null) {
  const prisma = (await getPrisma()) as PrismaWithDataSources;
  const dataSource = await prisma.dataSource.create({
    data: {
      workspaceId: TEMP_WORKSPACE_ID,
      name: input.name,
      type: input.type,
      description: input.description,
      sourceOwner: input.sourceOwner,
      riskLevel: input.riskLevel,
      allowedUse: input.allowedUse,
      status: input.status,
    },
  });

  await createAuditLog({
    workspaceId: TEMP_WORKSPACE_ID,
    actorUserId,
    action: "data_source_created",
    entityType: "DataSource",
    entityId: dataSource.id,
    metadataJson: { name: dataSource.name, type: dataSource.type },
  });

  return dataSource;
}

export async function getDataSource(id: string) {
  const prisma = (await getPrisma()) as PrismaWithDataSources;
  return prisma.dataSource.findFirst({
    where: {
      id,
      workspaceId: TEMP_WORKSPACE_ID,
      status: { not: "deleted" },
    },
  });
}

export async function updateDataSource(id: string, input: UpdateDataSourceInput, actorUserId?: string | null) {
  const existing = await getDataSource(id);
  if (!existing) return null;

  const prisma = (await getPrisma()) as PrismaWithDataSources;
  const updated = await prisma.dataSource.update({
    where: { id },
    data: input,
  });

  await createAuditLog({
    workspaceId: TEMP_WORKSPACE_ID,
    actorUserId,
    action: input.status ? "data_source_status_changed" : "data_source_updated",
    entityType: "DataSource",
    entityId: id,
    metadataJson: {
      changedFields: Object.keys(input),
      status: input.status,
    },
  });

  return updated;
}

export async function softDeleteDataSource(id: string, actorUserId?: string | null) {
  const existing = await getDataSource(id);
  if (!existing) return null;

  const prisma = (await getPrisma()) as PrismaWithDataSources;
  const deleted = await prisma.dataSource.update({
    where: { id },
    data: { status: "deleted" },
  });

  await createAuditLog({
    workspaceId: TEMP_WORKSPACE_ID,
    actorUserId,
    action: "data_source_deleted",
    entityType: "DataSource",
    entityId: id,
    metadataJson: { softDeleted: true },
  });

  return deleted;
}
