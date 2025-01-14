import { generateRandomTwitterPosts } from "@/lib/ai/postsGenerator";
import { insertPostsToSupabase } from "@/lib/ai/postsGenerator";
import { NextResponse } from "next/server";

export async function POST() {
  const posts = generateRandomTwitterPosts();
  await insertPostsToSupabase(posts);
  return NextResponse.json({ message: "Posts inserted" });
}

