"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNodeTreeStore } from "@/lib/store";
import type { NodeWithChildren } from "@/lib/types";

const typeStyles: Record<
  string,
  { icon: string; borderClass: string; label: string }
> = {
  QUESTION: {
    icon: "❓",
    borderClass: "node-question",
    label: "Question",
  },
  VIEWPOINT: {
    icon: "🔭",
    borderClass: "node-viewpoint",
    label: "Viewpoint",
  },
  ANSWER: {
    icon: "✅",
    borderClass: "node-answer",
    label: "Answer",
  },
  DEBATE: {
    icon: "⚔️",
    borderClass: "node-debate",
    label: "Debate",
  },
  IDEA: {
    icon: "💡",
    borderClass: "node-idea",
    label: "Idea",
  },
};

interface NodeCardProps {
  node: NodeWithChildren;
  depth: number;
}

export default function NodeCard({ node, depth }: NodeCardProps) {
  const {
    toggleNode,
    isExpanded,
    isLoading,
    childrenCache,
    setChildren,
    setLoading,
  } = useNodeTreeStore();

  const expanded = isExpanded(node.id);
  const loading = isLoading(node.id);
  const children = childrenCache[node.id] || [];
  const style = typeStyles[node.type] || typeStyles.QUESTION;

  const handleToggle = async () => {
    // If we haven't loaded children yet, fetch them
    if (!childrenCache[node.id] && !expanded) {
      setLoading(node.id, true);
      try {
        const res = await fetch(`/api/nodes/${node.id}/children`);
        if (res.ok) {
          const data = await res.json();
          setChildren(node.id, data);
        }
      } finally {
        setLoading(node.id, false);
      }
    }
    toggleNode(node.id);
  };

  return (
    <motion.div
      className={`border-l-4 ${style.borderClass} rounded-r-lg overflow-hidden`}
      style={{ marginLeft: depth > 0 ? "24px" : "0" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Card header - clickable */}
      <button
        onClick={handleToggle}
        className="w-full text-left p-4 hover:bg-amber-900/15 transition-colors group"
      >
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">{style.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-amber-100 group-hover:text-amber-200 transition-colors">
              {node.title}
            </h3>
            <span className="text-xs text-amber-700/50 uppercase tracking-wider">
              {style.label}
            </span>
          </div>
          <motion.span
            className="text-amber-600/50 text-lg flex-shrink-0 mt-1"
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▸
          </motion.span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Body text */}
            {node.body && (
              <div className="px-4 pb-3 pl-12">
                <p className="text-amber-400/70 font-serif text-sm leading-relaxed">
                  {node.body}
                </p>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="px-4 pb-3 pl-12">
                <p className="text-amber-700/40 italic text-sm">
                  Loading deeper...
                </p>
              </div>
            )}

            {/* Children */}
            {children.length > 0 && (
              <div className="pb-3 space-y-2">
                {children.map((child) => (
                  <NodeCard key={child.id} node={child} depth={depth + 1} />
                ))}
              </div>
            )}

            {!loading && children.length === 0 && (
              <div className="px-4 pb-3 pl-12">
                <p className="text-amber-700/30 italic text-xs">
                  No further branches
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
