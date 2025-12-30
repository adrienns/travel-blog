import { NextRequest } from "next/server";
import { getUnifiedStays } from "@/lib/stays/service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function parseUrls(req: NextRequest): string[] {
  const url = new URL(req.url);
  const list = url.searchParams.get("urls");
  if (!list) return [];
  return list.split(",").map(s => s.trim()).filter(Boolean);
}

export async function GET(req: NextRequest) {
  const urls = parseUrls(req);
  if (urls.length === 0) {
    return new Response(JSON.stringify({ error: "Provide ?urls=comma,separated,urls" }, null, 2),
      { status: 400, headers: { "content-type": "application/json" } });
  }

  const final = await getUnifiedStays(urls);
  return new Response(JSON.stringify(final, null, 2), {
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
