"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, Loader2Icon, TwitterIcon } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Post } from "@/lib/model/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/lib/ai/consts";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    }
  }, [debouncedQuery]);

  const handleSearch = async () => {
    if (!debouncedQuery.trim()) return;

    setIsLoading(true);
    try {
      const posts = await axios.get<Post[]>("/api/posts/search", {
        params: { query: debouncedQuery },
      });
      setResults(posts.data);
    } catch (error) {
      console.error("Error searching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/15 to-primary/10 ">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <TwitterIcon className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              X Post Search
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Search through millions of posts in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 bg-card rounded-2xl shadow-xl p-6 mb-8 z-50"
        >
          <div className="flex gap-2">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="flex-grow text-lg rounded-xl"
            />
            <Button
              disabled={isLoading || !query.trim()}
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl px-8"
            >
              {isLoading ? (
                <Loader2Icon className="h-5 w-5 animate-spin" />
              ) : (
                <SearchIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isLoading && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-12"
            >
              <div className="flex flex-col items-center space-y-4">
                <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Searching...</p>
              </div>
            </motion.div>
          )}

          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {results.map((post: Post, index: number) => (
                <motion.div
                  key={post.timestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage
                          src={getImageUrl(post.user) as string}
                          className="object-cover top-0 h-14 w-14"
                          alt={post.user}
                        />
                        <AvatarFallback>
                          {post.user.charAt(0).toUpperCase()}
                          {post.user.charAt(1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        {post.user}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {query && !isLoading && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500 dark:text-gray-400"
          >
            No results found for &quot;{query}&quot;
          </motion.div>
        )}
      </main>
    </div>
  );
}
