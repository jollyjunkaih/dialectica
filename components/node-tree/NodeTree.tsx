"use client";

import { useEffect } from "react";
import NodeCard from "./NodeCard";
import { useNodeTreeStore } from "@/lib/store";
import type { NodeWithChildren } from "@/lib/types";

interface NodeTreeProps {
  rootNode: NodeWithChildren;
  initialChildren: NodeWithChildren[];
}

export default function NodeTree({ rootNode, initialChildren }: NodeTreeProps) {
  const setChildren = useNodeTreeStore((s) => s.setChildren);
  const childrenCache = useNodeTreeStore((s) => s.childrenCache);

  useEffect(() => {
    if (!childrenCache[rootNode.id] && initialChildren.length > 0) {
      setChildren(rootNode.id, initialChildren);
    }
  }, [rootNode.id, initialChildren, setChildren, childrenCache]);

  return (
    <div className="space-y-3">
      <NodeCard node={rootNode} depth={0} />
    </div>
  );
}
