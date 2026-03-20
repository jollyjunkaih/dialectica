"use client";

import { useState } from "react";
import Shelf from "./Shelf";
import SearchBar from "./SearchBar";
import type { CategoryWithTopics } from "@/lib/types";

interface BookshelfSceneProps {
  categories: CategoryWithTopics[];
}

export default function BookshelfScene({ categories }: BookshelfSceneProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      topics: cat.topics.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => searchQuery === "" || cat.topics.length > 0);

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-display text-5xl text-amber-200 mb-2 tracking-wider">
          Dialectica
        </h1>
        <p className="text-amber-600/70 font-serif text-lg italic">
          An infinite library of questions
        </p>
      </div>

      {/* Search */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Shelves */}
      <div className="mt-6">
        {filteredCategories.map((category, i) => (
          <Shelf
            key={category.id}
            categoryName={category.name}
            categoryIcon={category.icon}
            topics={category.topics}
            shelfIndex={i}
          />
        ))}
      </div>

      {filteredCategories.length === 0 && searchQuery && (
        <p className="text-center text-amber-700/50 italic font-serif mt-12">
          No books match your search...
        </p>
      )}
    </div>
  );
}
