import { NextResponse } from "next/server";
import { CATEGORIES, PLATFORMS, SORTS } from "@/lib/categories";

// GET /api/categories
export async function GET() {
  return NextResponse.json({ categories: CATEGORIES, platforms: PLATFORMS, sorts: SORTS });
}
