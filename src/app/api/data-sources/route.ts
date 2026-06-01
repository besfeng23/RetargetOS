import { NextResponse } from "next/server";
import { createDataSource, listDataSources } from "@/lib/data-sources/service";
import { createDataSourceSchema, dataSourceFilterSchema } from "@/lib/data-sources/validation";

export const dynamic = "force-dynamic";

const SYSTEM_ACTOR = "system";

function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = dataSourceFilterSchema.safeParse({
    status: searchParams.get("status") ?? undefined,
    riskLevel: searchParams.get("riskLevel") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    search: searchParams.get("search") ?? undefined,
  });

  if (!parsed.success) {
    return errorResponse("Invalid data source filters.", 400);
  }

  try {
    const dataSources = await listDataSources(parsed.data);
    return NextResponse.json({ data: dataSources });
  } catch (error) {
    console.error("Failed to list data sources", error);
    return errorResponse("Unable to load data sources.");
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON payload.", 400);
  }

  const parsed = createDataSourceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data source payload.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const dataSource = await createDataSource(parsed.data, SYSTEM_ACTOR);
    return NextResponse.json({ data: dataSource }, { status: 201 });
  } catch (error) {
    console.error("Failed to create data source", error);
    return errorResponse("Unable to create data source.");
  }
}
