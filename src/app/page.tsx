/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const posts = await axios.get("/api/posts/search", {
        params: { query },
      });
      setResults(posts.data);
    } catch (error) {
      console.error("Error searching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">X Post Search</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
          className="flex-grow p-2 border rounded-l"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
      <div>
        {results.map((post: any) => (
          <div key={post.id} className="mb-4 p-4 border rounded">
            <p className="font-bold">{post.author}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
