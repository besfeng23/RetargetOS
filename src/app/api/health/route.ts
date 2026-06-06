import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    app: "RetargetOS",
    phase: "phase-2-data-sources-and-audit-logs",
    liveConnectorsEnabled: false,
  });
}
