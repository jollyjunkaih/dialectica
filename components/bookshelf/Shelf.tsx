"use client";

import { motion } from "framer-motion";
import Book from "./Book";
import type { TopicSummary } from "@/lib/types";

interface ShelfProps {
  categoryName: string;
  categoryIcon: string | null;
  topics: TopicSummary[];
  shelfIndex: number;
}

export default function Shelf({
  categoryName,
  categoryIcon,
  topics,
  shelfIndex,
}: ShelfProps) {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: shelfIndex * 0.15, duration: 0.5 }}
    >
      {/* Category label */}
      <div className="flex items-center gap-2 mb-3 px-4">
        {categoryIcon && <span className="text-2xl">{categoryIcon}</span>}
        <h2 className="font-display text-xl text-amber-300/90 tracking-wide">
          {categoryName}
        </h2>
      </div>

      {/* Shelf with books */}
      <div className="relative">
        {/* Books row */}
        <div className="flex items-end gap-2 px-6 pb-0 min-h-[190px]">
          {topics.map((topic, i) => (
            <Book
              key={topic.id}
              title={topic.title}
              slug={topic.slug}
              coverColor={topic.coverColor}
              index={i}
            />
          ))}
          {topics.length === 0 && (
            <p className="text-amber-700/50 italic font-serif text-sm py-8">
              No books on this shelf yet...
            </p>
          )}
        </div>

        {/* Wooden shelf plank */}
        <div
          className="wood-texture h-4 rounded-sm"
          style={{
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.4), inset 0 2px 3px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.2)",
          }}
        />
        {/* Shelf bracket shadows */}
        <div className="flex justify-between px-8">
          <div className="w-3 h-6 bg-amber-950/40 rounded-b" />
          <div className="w-3 h-6 bg-amber-950/40 rounded-b" />
        </div>
      </div>
    </motion.div>
  );
}
