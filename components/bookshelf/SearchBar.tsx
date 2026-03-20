"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="w-full max-w-xl mx-auto mb-8"
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
          onBlur={() => setFocused(false)}
          className="w-full px-5 py-3 rounded-xl bg-amber-950/40 border border-amber-800/30 text-amber-100 placeholder-amber-700/60 focus:outline-none focus:border-amber-600/50 font-serif text-lg transition-colors"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-700/60 text-xl">
          🔍
        </span>
      </motion.div>
    </motion.div>
  );
}
