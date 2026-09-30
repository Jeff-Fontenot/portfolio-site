import { NextResponse } from "next/server";
import { getHomelabMetrics } from "@/lib/homelab-metrics";

export async function GET() {
  const data = await getHomelabMetrics();

  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, max-age=0, must-revalidate" },
  });
}
