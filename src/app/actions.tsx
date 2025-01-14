"use server";

import { generateEmbedding } from "@/lib/ai/utils";
import { supabase } from "../lib/supabase";

export async function searchPosts(query: string) {
  const embedding = await generateEmbedding(query);

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.3,
    match_count: 10,
  });

  if (error) throw error;

  return data;
}
