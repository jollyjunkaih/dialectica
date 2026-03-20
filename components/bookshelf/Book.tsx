"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BookProps {
  title: string;
  slug: string;
  coverColor: string;
  index: number;
}

export default function Book({ title, slug, coverColor, index }: BookProps) {
  // Generate a slightly darker shade for the spine edge
  const spineWidth = Math.max(36, Math.min(56, title.length * 2.5));

  return (
    <Link href={`/topics/${slug}`}>
      <motion.div
        className="book-spine cursor-pointer flex-shrink-0"
        style={{
          width: `${spineWidth}px`,
          height: "180px",
          backgroundColor: coverColor,
          borderRadius: "3px 6px 6px 3px",
          perspective: "800px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        whileHover={{
          y: -12,
          rotateZ: -3,
          scale: 1.05,
          boxShadow:
            "4px 6px 16px rgba(0,0,0,0.4), inset -2px 0 4px rgba(0,0,0,0.15)",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className="h-full flex items-center justify-center px-1"
          style={{
            boxShadow:
              "2px 3px 8px rgba(0,0,0,0.3), inset -2px 0 4px rgba(0,0,0,0.15)",
            borderRadius: "3px 6px 6px 3px",
          }}
        >
          <span
            className="text-white font-display text-xs leading-tight text-center"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              maxHeight: "160px",
              overflow: "hidden",
            }}
          >
            {title}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
