import { supabase } from "@/lib/supabase";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateEmbedding(text: string) {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: text,
  });

  return embedding;
}

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
