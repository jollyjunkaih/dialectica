"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { TopicWithNodes, NodeWithChildren } from "@/lib/types";

const typeConfig: Record<string, { icon: string; color: string }> = {
  QUESTION: { icon: "❓", color: "border-blue-500 bg-blue-500/5" },
  VIEWPOINT: { icon: "🔭", color: "border-purple-500 bg-purple-500/5" },
  ANSWER: { icon: "✅", color: "border-green-500 bg-green-500/5" },
  DEBATE: { icon: "⚔️", color: "border-red-500 bg-red-500/5" },
  IDEA: { icon: "💡", color: "border-amber-500 bg-amber-500/5" },
};

function NodeCard({
  node,
  topicSlug,
  index,
}: {
  node: NodeWithChildren;
  topicSlug: string;
  index: number;
}) {
  const config = typeConfig[node.type] || typeConfig.QUESTION;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link href={`/nodes/${node.id}`}>
        <div
          className={`p-5 rounded-lg border-l-4 ${config.color} backdrop-blur-sm hover:bg-amber-900/20 transition-colors cursor-pointer group`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0 mt-0.5">
              {config.icon}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg text-amber-100 group-hover:text-amber-200 transition-colors">
                {node.title}
              </h3>
              {node.body && (
                <p className="text-amber-600/70 text-sm mt-1 line-clamp-2 font-serif">
                  {node.body}
                </p>
              )}
              <span className="inline-block mt-2 text-xs text-amber-700/50 uppercase tracking-wider">
                {node.type}
              </span>
            </div>
            <span className="text-amber-700/40 group-hover:text-amber-500 transition-colors text-xl">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TopicView({ topic }: { topic: TopicWithNodes }) {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <Link
          href="/"
          className="text-amber-600 hover:text-amber-400 font-serif text-sm inline-flex items-center gap-2 transition-colors"
        >
          ← Back to the library
        </Link>
      </motion.div>

      {/* Topic header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="w-16 h-1 rounded-full mb-4"
          style={{ backgroundColor: topic.coverColor }}
        />
        <h1 className="font-display text-4xl text-amber-100 mb-3">
          {topic.title}
        </h1>
        {topic.description && (
          <p className="text-amber-500/70 font-serif text-lg leading-relaxed">
            {topic.description}
          </p>
        )}
      </motion.div>

      {/* Nodes list */}
      <div className="space-y-3">
        {topic.nodes.map((node, i) => (
          <NodeCard
            key={node.id}
            node={node}
            topicSlug={topic.slug}
            index={i}
          />
        ))}
      </div>

      {topic.nodes.length === 0 && (
        <p className="text-amber-700/50 italic font-serif text-center mt-12">
          No entries yet. This topic is waiting for its first question.
        </p>
      )}
    </div>
  );
}
