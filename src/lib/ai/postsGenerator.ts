import { generateEmbedding } from "@/lib/ai/utils";
import { Post } from "@/lib/model/post";
import { supabase } from "@/lib/supabase";

// List of the cast of Friends
const friendsCast = [
  "Rachel Green",
  "Monica Geller",
  "Phoebe Buffay",
  "Joey Tribbiani",
  "Chandler Bing",
  "Ross Geller",
];

// Sample Friends-related content to generate posts
const postTemplates = [
  "Remember the time Ross said, 'We were on a break!'? Classic!",
  "Could I BE any more excited about today?",
  "Smelly Cat, Smelly Cat, what are they feeding you?",
  "How you doin'?",
  "Pivot! Pivot! Pivot!",
  "Joey doesn’t share food!",
  "Monica’s apartment is the real MVP of the show.",
  "Rachel’s hairstyles throughout the seasons are iconic.",
  "Central Perk is my happy place.",
  "Could Monica and Chandler BE any cuter?",
  "I'm not a lesbian, I'm just attracted to women.",
  "We were on a break!", // Classic Ross line.
  "It's like all my life, everyone has always told me, ‘You’re a shoe!’",
  "Seven! Seven! Seven!", // Monica's hilarious enthusiasm.
  "I wish I could, but I don’t want to.", // Phoebe's blunt honesty.
  "If it’s a girl, Phoebe. If it’s a boy, Pheebo.", // Phoebe's baby name suggestion.
  "Oh. My. God!", // Janice’s iconic catchphrase.
  "I KNOW!", // Monica’s classic line.
  "He’s her lobster!", // Phoebe’s adorable metaphor.
  "That’s not even a word!", // Ross, frustrated at Scrabble.
  "This is brand-new information!", // Phoebe’s over-the-top fake surprise.
  "You can’t just give up! Is that what a dinosaur would do?", // Ross inspiring Joey.
  "I’m fine. Totally fine. I don’t know why it’s coming out all loud and squeaky!", // Ross pretending to be fine.
  "I’m Chandler. I make jokes when I’m uncomfortable.", // Chandler’s self-awareness.
  "Could I BE wearing any more clothes?", // Joey in Chandler's clothes.
  "No uterus, no opinion!", // Rachel shutting down Ross.
  "It’s a moo point. It’s like a cow’s opinion; it doesn’t matter.", // Joey’s philosophical take.
  "You’re over me? When were you… under me?", // Ross’s confusion.
  "Welcome to the real world. It sucks. You’re gonna love it.", // Monica to Rachel.
  "That is brand-new information!", // Phoebe doubling down on fake shock.
];

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
export const generateRandomTwitterPosts = (): Post[] => {
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

export async function insertPostsToSupabase(posts: Post[]) {
  let i = 0;
  for (const post of posts) {
    console.log(`Inserting post ${i++} of ${posts.length}`);
    try {
      // Generate embedding for the content
      const embedding = await generateEmbedding(
        `${post.user}: ${post.content}`
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
