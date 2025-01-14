import { NextRequest } from "next/server";

import { searchPosts } from "@/lib/post/utils/utils";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query") as string;
    const posts = await searchPosts(query);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
