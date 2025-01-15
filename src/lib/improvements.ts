export interface Improvement {
  id: number;
  title: string;
  description: string;
  category: 'Performance' | 'Feature' | 'Infrastructure' | 'Search' | 'UX';
  priority: 'high' | 'medium' | 'low';
}

export const improvements: Improvement[] = [
  {
    id: 1,
    title: "Supabase Region Optimization",
    description: "Change Supabase instance to be in Paris - Where the target audience is",
    category: "Infrastructure",
    priority: "medium",
  },
  {
    id: 2,
    title: "OpenAI Batch Processing",
    description: "Run the OpenAI requests in a batch to save 50% of the cost",
    category: "Performance",
    priority: "high",
  },
  {
    id: 3,
    title: "Debounce Optimization",
    description: "Stop the run on debounce to avoid running OpenAI requests for slow writers",
    category: "Performance",
    priority: "high",
  },
  {
    id: 4,
    title: "Search Caching",
    description: "Cache results of repeated Search queries",
    category: "Performance",
    priority: "medium",
  },
  {
    id: 5,
    title: "Giphy Backend Integration",
    description: "Move Giphy Search to the backend",
    category: "Infrastructure",
    priority: "low",
  },
  {
    id: 6,
    title: "Enhanced Search Points",
    description: "Add more Search points like retweets, replies, hashtags, likes, and comments",
    category: "Search",
    priority: "medium",
  },
  {
    id: 7,
    title: "Pagination Implementation",
    description: "Add pagination to the Search results",
    category: "UX",
    priority: "high",
  },
  {
    id: 8,
    title: "Search Filters",
    description: "Add filters and sorting options",
    category: "UX",
    priority: "medium",
  },
  {
    id: 9,
    title: "Code Robustness",
    description: "Make the code more robust with better error handling and logging",
    category: "Infrastructure",
    priority: "high",
  },
  {
    id: 10,
    title: "Duplicate Removal",
    description: "Remove duplicates from the Search results",
    category: "Search",
    priority: "medium",
  },
  {
    id: 11,
    title: "Vector Search Optimization",
    description: "Learn more about vectorizing and vector Search to improve Search quality",
    category: "Search",
    priority: "high",
  },
]; 