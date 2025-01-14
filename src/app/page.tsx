"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, SearchIcon } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Post } from "@/lib/model/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getImageUrl,
  giphysNotFound,
  giphysSearching,
  giphysNoSearch,
} from "@/lib/post/consts";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [didSearch, setDidSearch] = useState(false);
  const [randomGif, setRandomGif] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoading && !didSearch) fetchRandomGif("noSearch");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isLoading, didSearch]);

  useEffect(() => {
    // iterate over all giphys and load them to memory
    Object.keys(giphysNotFound).forEach((key) => {
      const image = new Image();
      image.src = giphysNotFound[key];
      image.onload = () => {};
    });
    Object.keys(giphysSearching).forEach((key) => {
      const image = new Image();
      image.src = giphysSearching[key];
      image.onload = () => {};
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    } else {
      setDidSearch(false);
      setResults([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (isLoading) {
      fetchRandomGif("searching");
    } else if (!isLoading && didSearch && results.length === 0) {
      fetchRandomGif("notFound");
    } else {
      setRandomGif("");
      setExplanation("");
    }
  }, [isLoading, didSearch]);

  const fetchRandomGif = (type: "searching" | "notFound" | "noSearch") => {
    try {
      const giphysPool =
        type === "notFound"
          ? giphysNotFound
          : type === "searching"
          ? giphysSearching
          : giphysNoSearch;
      const poolLength = Object.keys(giphysPool).length;
      let randomIndex = Math.floor(Math.random() * poolLength);
      randomIndex = randomIndex % poolLength;
      const key = Object.keys(giphysPool)[randomIndex];
      setRandomGif(giphysPool[key]);
      setExplanation(key);
    } catch (error) {
      console.error("Error fetching random GIF:", error);
      setRandomGif("");
    }
  };

  const handleSearch = async () => {
    if (!debouncedQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get("/api/posts/search", {
        params: { query: debouncedQuery },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error searching posts:", error);
    } finally {
      setIsLoading(false);
      setDidSearch(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/15 to-primary/10">
      <main className="container mx-auto px-4 py-12 max-w-4xl flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center mb-12"
        >
          <div className="flex flex-col items-center justify-center mb-4 gap-2">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              How You Searchin&apos;
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Search through the best quotes from the <strong>friends</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 w-full bg-card rounded-2xl shadow-xl mb-8 z-50"
        >
          <div className="flex gap-2 p-6">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Could this BE any easier to search?"
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
          {(isLoading && results.length === 0) ||
            (!isLoading && !didSearch && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center py-12 w-full"
              >
                {randomGif && (
                  <img
                    src={randomGif}
                    alt="Searching"
                    className="rounded-lg mb-4"
                  />
                )}
                <p className="text-muted-foreground text-lg">{explanation}</p>
              </motion.div>
            ))}

          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 w-full"
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
                      <p className="font-semibold text-foreground mb-1">
                        {post.user}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          {didSearch && query && !isLoading && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-12 text-gray-500 dark:text-gray-400"
            >
              {randomGif && (
                <img
                  src={randomGif}
                  alt="Not Found"
                  className="rounded-lg mb-4"
                />
              )}
              <p className="text-lg text-center">
                <span>{explanation}</span>
                <br />
                <strong>No results found for &quot;{query}&quot;</strong>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
