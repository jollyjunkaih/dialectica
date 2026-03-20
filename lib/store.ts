import { create } from "zustand";
import type { NodeWithChildren } from "./types";

interface NodeTreeState {
  expandedNodes: Set<string>;
  childrenCache: Record<string, NodeWithChildren[]>;
  loadingNodes: Set<string>;
  toggleNode: (id: string) => void;
  setChildren: (parentId: string, children: NodeWithChildren[]) => void;
  setLoading: (id: string, loading: boolean) => void;
  isExpanded: (id: string) => boolean;
  isLoading: (id: string) => boolean;
}

export const useNodeTreeStore = create<NodeTreeState>((set, get) => ({
  expandedNodes: new Set(),
  childrenCache: {},
  loadingNodes: new Set(),

  toggleNode: (id: string) =>
    set((state) => {
      const next = new Set(state.expandedNodes);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { expandedNodes: next };
    }),

  setChildren: (parentId: string, children: NodeWithChildren[]) =>
    set((state) => ({
      childrenCache: { ...state.childrenCache, [parentId]: children },
    })),

  setLoading: (id: string, loading: boolean) =>
    set((state) => {
      const next = new Set(state.loadingNodes);
      if (loading) next.add(id);
      else next.delete(id);
      return { loadingNodes: next };
    }),

  isExpanded: (id: string) => get().expandedNodes.has(id),
  isLoading: (id: string) => get().loadingNodes.has(id),
}));
