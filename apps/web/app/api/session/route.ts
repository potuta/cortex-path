import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  return NextResponse.json(session);
}