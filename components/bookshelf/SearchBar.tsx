"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface SearchResult {
  nodes: Array<{
    id: string;
    title: string;
    type: string;
    topic: { title: string; slug: string };
  }>;
  topics: Array<{
    id: string;
    title: string;
    slug: string;
    category: { name: string; slug: string };
  }>;
}

const typeIcons: Record<string, string> = {
  QUESTION: "❓",
  VIEWPOINT: "🔭",
  ANSWER: "✅",
  DEBATE: "⚔️",
  IDEA: "💡",
};

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 2) {
      setResults(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        if (res.ok) {
          setResults(await res.json());
        }
      } catch {
        // Fall back to client-side filtering
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const showDropdown = focused && query.length >= 2 && results;
  const hasResults =
    results && (results.topics.length > 0 || results.nodes.length > 0);

  return (
    <motion.div
      className="w-full max-w-xl mx-auto mb-8 relative z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        animate={{
          boxShadow: focused
            ? "0 0 20px rgba(217, 119, 6, 0.3)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        style={{ borderRadius: "12px" }}
      >
        <input
          type="text"
          placeholder="Search the library..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          className="w-full px-5 py-3 rounded-xl bg-amber-950/40 border border-amber-800/30 text-amber-100 placeholder-amber-700/60 focus:outline-none focus:border-amber-600/50 font-serif text-lg transition-colors"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-700/60 text-xl">
          {searching ? "⏳" : "🔍"}
        </span>
      </motion.div>

      {/* Search results dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-amber-950/95 border border-amber-800/30 rounded-xl overflow-hidden backdrop-blur-md"
          >
            {!hasResults && (
              <p className="p-4 text-amber-700/50 italic font-serif text-sm text-center">
                No results found
              </p>
            )}

            {results.topics.length > 0 && (
              <div className="p-2">
                <p className="px-3 py-1 text-xs text-amber-600/50 uppercase tracking-wider">
                  Topics
                </p>
                {results.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/topics/${topic.slug}`}
                    className="block px-3 py-2 rounded-lg hover:bg-amber-800/20 transition-colors"
                  >
                    <span className="text-amber-200 font-serif text-sm">
                      📖 {topic.title}
                    </span>
                    <span className="text-amber-700/40 text-xs ml-2">
                      in {topic.category.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {results.nodes.length > 0 && (
              <div className="p-2 border-t border-amber-800/20">
                <p className="px-3 py-1 text-xs text-amber-600/50 uppercase tracking-wider">
                  Nodes
                </p>
                {results.nodes.slice(0, 5).map((node) => (
                  <Link
                    key={node.id}
                    href={`/nodes/${node.id}`}
                    className="block px-3 py-2 rounded-lg hover:bg-amber-800/20 transition-colors"
                  >
                    <span className="text-amber-200 font-serif text-sm">
                      {typeIcons[node.type] || "❓"} {node.title}
                    </span>
                    <span className="text-amber-700/40 text-xs ml-2">
                      in {node.topic.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
