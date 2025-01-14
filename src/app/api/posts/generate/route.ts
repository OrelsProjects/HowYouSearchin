import { NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/post/utils";
import { Post } from "@/lib/model/post";
import { supabase } from "@/lib/supabase";
import { friendsCast, postTemplates } from "@/lib/post/consts";

// Function to generate a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate a random timestamp
const getRandomTimestamp = (): string => {
  const start = new Date(2000, 0, 1).getTime(); // Start from Jan 1, 2000
  const end = new Date().getTime(); // Up to the current date
  const randomTime = new Date(getRandomInt(start, end));
  return randomTime.toISOString();
};

// Function to generate 1000 random Twitter posts
const generateRandomTwitterPosts = (): Post[] => {
  const posts: Post[] = [];

  for (let i = 0; i < 100; i++) {
    const randomUser = friendsCast[getRandomInt(0, friendsCast.length - 1)];
    const randomContent =
      postTemplates[getRandomInt(0, postTemplates.length - 1)];
    const randomTimestamp = getRandomTimestamp();

    posts.push({
      user: randomUser,
      content: randomContent,
      timestamp: randomTimestamp,
    });
  }

  return posts;
};

async function insertPostsToSupabase(posts: Post[]) {
  let i = 0;
  for (const post of posts) {
    console.log(`Inserting post ${i++} of ${posts.length}`);
    try {
      // Generate embedding for the content
      const embedding = await generateEmbedding(
        `${post.user.toUpperCase()}!!!: ${post.content}`
      );

      // Insert into Supabase
      const { error } = await supabase.from("twitter_posts").insert({
        content: post.content,
        embedding, // Store embedding as a vector
        user: post.user,
        timestamp: post.timestamp,
      });

      if (error) {
        console.error("Error inserting post:", error.message);
      } else {
        console.log("Successfully inserted post:", post.content);
      }
    } catch (err: any) {
      console.error(
        "Error generating embedding or inserting post:",
        err.message
      );
    }
  }
}

export async function POST() {
  const posts = generateRandomTwitterPosts();
  await insertPostsToSupabase(posts);
  return NextResponse.json({ message: "Posts inserted" });
}

export async function GET() {
  const posts = generateRandomTwitterPosts();
  await insertPostsToSupabase(posts);
  return NextResponse.json({ message: "Posts inserted" });
}
