import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    app: "RetargetOS",
    phase: "phase-1-foundation",
    liveConnectorsEnabled: false,
  });
}
