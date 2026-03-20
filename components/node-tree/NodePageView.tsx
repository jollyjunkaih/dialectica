"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NodeTree } from "@/components/node-tree";
import type { NodeWithChildren } from "@/lib/types";

const typeLabels: Record<string, { icon: string; label: string }> = {
  QUESTION: { icon: "❓", label: "Question" },
  VIEWPOINT: { icon: "🔭", label: "Viewpoint" },
  ANSWER: { icon: "✅", label: "Answer" },
  DEBATE: { icon: "⚔️", label: "Debate" },
  IDEA: { icon: "💡", label: "Idea" },
};

function ShareButton() {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button
      onClick={handleShare}
      className="text-amber-700/50 hover:text-amber-400 text-sm font-serif transition-colors inline-flex items-center gap-1"
      title="Copy link to clipboard"
    >
      📋 Share
    </button>
  );
}

export default function NodePageView({ node }: { node: NodeWithChildren }) {
  const typeInfo = typeLabels[node.type] || typeLabels.QUESTION;

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <motion.div
        className="flex items-center gap-2 text-sm mb-6 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link
          href="/"
          className="text-amber-600 hover:text-amber-400 transition-colors"
        >
          Library
        </Link>
        <span className="text-amber-800/40">›</span>
        <span className="text-amber-500/60 truncate max-w-xs">
          {node.title}
        </span>
      </motion.div>

      {/* Node header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{typeInfo.icon}</span>
          <span className="text-xs text-amber-700/50 uppercase tracking-wider">
            {typeInfo.label}
          </span>
          <div className="flex-1" />
          <ShareButton />
        </div>
        <h1 className="font-display text-3xl text-amber-100 mb-4">
          {node.title}
        </h1>
        {node.body && (
          <p className="text-amber-400/70 font-serif leading-relaxed">
            {node.body}
          </p>
        )}
      </motion.div>

      {/* Divider */}
      <div className="border-t border-amber-900/30 mb-6" />

      {/* Children tree */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-display text-lg text-amber-300/80 mb-4">
          Branches
        </h2>
        {node.children && node.children.length > 0 ? (
          <div className="space-y-3">
            {node.children.map((child) => (
              <NodeTree
                key={child.id}
                rootNode={child}
                initialChildren={[]}
              />
            ))}
          </div>
        ) : (
          <p className="text-amber-700/40 italic font-serif text-sm">
            No branches yet. This is a leaf node.
          </p>
        )}
      </motion.div>
    </div>
  );
}
